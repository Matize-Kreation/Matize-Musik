@echo off
REM ============================================
REM  Matize-Musik – GitHub Sync Starter (BAT)
REM ============================================

cd /d "D:\Matize\Matize-Kreation\Matize-Musik"

echo ============================================
echo  Starte PowerShell-Sync ...
echo ============================================

powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File ".\sync-matize-musik.ps1"

echo.
echo --------------------------------------------
echo  Fertig. Mit beliebiger Taste schließen.
echo --------------------------------------------
pause
