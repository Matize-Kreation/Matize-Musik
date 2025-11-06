@echo off
REM ============================================
REM  Matize-Musik – GitHub Sync Starter (BAT)
REM  Startet das PowerShell-Skript und hält das
REM  Fenster offen, damit du den Status siehst.
REM ============================================

REM In Projektordner wechseln
cd /d "D:\Matize\Matize-Kreation\Matize-Musik"

echo ============================================
echo  Starte PowerShell-Sync ...
echo ============================================

REM PowerShell-Skript ausführen, ExecutionPolicy nur für diesen Aufruf umgehen
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File ".\sync-matize-musik.ps1"

echo.
echo --------------------------------------------
echo  Fertig. Mit beliebiger Taste schließen.
echo --------------------------------------------
pause
