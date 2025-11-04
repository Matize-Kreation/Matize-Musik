@echo off
REM ============================================
REM   Matize-Musik – GitHub Sync (final)
REM   Lädt nur geänderte Dateien hoch
REM ============================================

cd /d "D:\Matize\Matize-Kreation\Matize-Musik"

echo ============================================
echo   GitHub Sync wird gestartet ...
echo   Projekt: Matize-Musik
echo ============================================

REM 1) Alten Git-Lock entfernen
if exist ".git\index.lock" (
    echo [Info] index.lock gefunden, wird entfernt ...
    del /f /q ".git\index.lock"
)

REM 2) Sicherstellen, dass origin korrekt gesetzt ist
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo [Info] origin nicht vorhanden – setze origin ...
    git remote add origin https://github.com/Matize-Kreation/Matize-Musik.git
) else (
    git remote set-url origin https://github.com/Matize-Kreation/Matize-Musik.git
)

REM 3) Änderungen erfassen
git add -A

REM 4) Prüfen, ob etwas Neues da ist
git diff --cached --quiet
if %errorlevel%==0 (
    echo [Info] Keine neuen Änderungen gefunden. Nichts zu tun.
    echo --------------------------------------------
    pause
    goto :eof
)

REM 5) Commit mit Datum/Zeit
git commit -m "Auto-Commit am %date% %time%"

REM 6) Lokalen Stand mit Remote abgleichen
echo [Info] Aktualisiere lokalen Stand (pull --rebase) ...
git pull origin main --rebase

REM 7) Pushen
echo [Info] Lade Änderungen nach GitHub hoch ...
git push origin main

echo --------------------------------------------
echo   Upload abgeschlossen!
echo --------------------------------------------
pause
