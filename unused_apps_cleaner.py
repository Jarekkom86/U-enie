#!/usr/bin/env python3
"""Nástroj na nájdenie a voliteľné odinštalovanie dlho nepoužívaných aplikácií.

Podporované primárne na Windows (čítanie zo systému "Uninstall" registrov).
Program nič neodstraňuje automaticky: najprv vypíše kandidátov a pri odinštalovaní
vyžaduje potvrdenie pre každú aplikáciu.
"""

from __future__ import annotations

import argparse
import datetime as dt
import os
import subprocess
import sys
from dataclasses import dataclass
from typing import Iterable, Optional

try:
    import winreg
except ImportError:  # mimo Windows
    winreg = None


REG_PATHS = (
    ("HKLM", r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall"),
    ("HKLM", r"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall"),
    ("HKCU", r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall"),
)


@dataclass
class AppInfo:
    name: str
    publisher: str
    version: str
    install_location: str
    uninstall_cmd: str
    last_activity: Optional[dt.datetime]


def _open_hive(name: str):
    if name == "HKLM":
        return winreg.HKEY_LOCAL_MACHINE
    if name == "HKCU":
        return winreg.HKEY_CURRENT_USER
    raise ValueError(f"Neznámy register hive: {name}")


def _get_reg_value(key, value_name: str) -> str:
    try:
        value, _ = winreg.QueryValueEx(key, value_name)
        return str(value).strip()
    except OSError:
        return ""


def _dir_last_modified(path: str) -> Optional[dt.datetime]:
    if not path or not os.path.isdir(path):
        return None

    newest = 0.0
    try:
        for root, _, files in os.walk(path):
            for fname in files:
                fpath = os.path.join(root, fname)
                try:
                    mtime = os.path.getmtime(fpath)
                except OSError:
                    continue
                newest = max(newest, mtime)
    except OSError:
        return None

    if newest == 0.0:
        return None
    return dt.datetime.fromtimestamp(newest)


def _iter_installed_apps() -> Iterable[AppInfo]:
    if winreg is None:
        return

    seen: set[tuple[str, str]] = set()

    for hive_name, subkey in REG_PATHS:
        hive = _open_hive(hive_name)
        try:
            reg_key = winreg.OpenKey(hive, subkey)
        except OSError:
            continue

        try:
            count = winreg.QueryInfoKey(reg_key)[0]
            for idx in range(count):
                try:
                    sk_name = winreg.EnumKey(reg_key, idx)
                    app_key = winreg.OpenKey(reg_key, sk_name)
                except OSError:
                    continue

                name = _get_reg_value(app_key, "DisplayName")
                if not name:
                    continue

                publisher = _get_reg_value(app_key, "Publisher")
                version = _get_reg_value(app_key, "DisplayVersion")
                install_location = _get_reg_value(app_key, "InstallLocation")
                uninstall_cmd = _get_reg_value(app_key, "UninstallString")

                unique_key = (name.lower(), uninstall_cmd.lower())
                if unique_key in seen:
                    continue
                seen.add(unique_key)

                yield AppInfo(
                    name=name,
                    publisher=publisher,
                    version=version,
                    install_location=install_location,
                    uninstall_cmd=uninstall_cmd,
                    last_activity=_dir_last_modified(install_location),
                )
        finally:
            winreg.CloseKey(reg_key)


def _format_date(value: Optional[dt.datetime]) -> str:
    return value.strftime("%Y-%m-%d") if value else "neznáme"


def _is_old(app: AppInfo, cutoff: dt.datetime) -> bool:
    return app.last_activity is None or app.last_activity < cutoff


def _confirm(prompt: str) -> bool:
    answer = input(f"{prompt} [a/N]: ").strip().lower()
    return answer in {"a", "ano", "y", "yes"}


def _run_uninstall(cmd: str, dry_run: bool) -> bool:
    if not cmd:
        return False

    if dry_run:
        print(f"  (dry-run) odinštalačný príkaz: {cmd}")
        return True

    try:
        subprocess.run(cmd, shell=True, check=True)
        return True
    except subprocess.CalledProcessError as exc:
        print(f"  Chyba pri odinštalácii: {exc}")
        return False


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Nájde aplikácie, ktoré zrejme neboli použité dlhšie ako zadaný počet dní, "
            "a voliteľne ich odinštaluje s potvrdením."
        )
    )
    parser.add_argument("--days", type=int, default=180, help="Limit neaktivity v dňoch (default: 180)")
    parser.add_argument(
        "--delete",
        action="store_true",
        help="Ponúkne odinštalovanie každej nájdenej aplikácie (s potvrdením)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Pri --delete iba vypíše odinštalačný príkaz, nič nespustí",
    )
    args = parser.parse_args()

    if winreg is None:
        print("Tento skript je určený pre Windows (modul winreg nie je dostupný).")
        return 1

    cutoff = dt.datetime.now() - dt.timedelta(days=args.days)

    apps = sorted(_iter_installed_apps(), key=lambda app: app.name.lower())
    candidates = [app for app in apps if _is_old(app, cutoff)]

    print(f"Nájdených aplikácií: {len(apps)}")
    print(f"Kandidáti na neaktivitu > {args.days} dní: {len(candidates)}")

    if not candidates:
        return 0

    for idx, app in enumerate(candidates, start=1):
        print(f"\n{idx}. {app.name}")
        print(f"   Vydavateľ: {app.publisher or 'neznámy'}")
        print(f"   Verzia: {app.version or 'neznáma'}")
        print(f"   Posledná aktivita (odhad): {_format_date(app.last_activity)}")
        if app.install_location:
            print(f"   Cesta: {app.install_location}")
        if not app.uninstall_cmd:
            print("   Odinštalovanie: nie je dostupný príkaz")

        if args.delete and app.uninstall_cmd:
            if _confirm(f"   Odinštalovať '{app.name}'?"):
                ok = _run_uninstall(app.uninstall_cmd, args.dry_run)
                print("   Hotovo." if ok else "   Nepodarilo sa.")
            else:
                print("   Preskočené.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
