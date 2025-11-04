@echo off
REM ===== Matize-Musik Git Sync =====

cd /d "D:\Matize\Matize-Kreation\Matize-Musik"

echo ============================================
echo   GitHub Sync wird gestartet ...
echo   Projekt: Matize-Musik
echo ============================================

REM Lock entfernen falls vorhanden
if exist ".git\index.lock" (
    echo [Info] index.lock gefunden, entferne ...
    del /f /q ".git\index.lock"
)

REM Init falls nötig
if not exist ".git" (
    echo [Info] Initialisiere Git ...
    git init
)

REM auf main gehen
git branch -M main

REM origin setzen/fixen (ohne Slash am Ende!)
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo [Info] origin wird gesetzt ...
    git remote add origin https://github.com/Matize-Kreation/Matize-Musik.git
) else (
    echo [Info] origin vorhanden, URL wird sichergestellt ...
    git remote set-url origin https://github.com/Matize-Kreation/Matize-Musik.git
)

REM Änderungen sammeln
git add .

REM commit nur wenn was da ist
git diff --cached --quiet
if errorlevel 1 (
    git commit -m "Auto-Commit am %date% %time%"
) else (
    echo [Info] keine neuen Änderungen.
)

echo [Info] versuche: git pull origin main --rebase
git pull origin main --rebase

echo [Info] versuche: git push origin main
git push origin main

echo --------------------------------------------
echo   Fertig.
echo   Wenn immer noch 'repository not found' kommt,
echo   dann ist das Repo auf GitHub NICHT angelegt
echo   oder der Name passt nicht exakt.
echo --------------------------------------------
pause
