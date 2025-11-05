@echo off
title Matize-Musik – Dev Server
color 0B

echo ================================================
echo      🚀 Starte Matize-Musik Development Server
echo ================================================
echo.

REM -----------------------------------------------
REM 1) PROJEKT-PFAD ANPASSEN
REM -----------------------------------------------
cd /d "D:\Matize\Matize-Kreation\Matize-Musik"

REM -----------------------------------------------
REM 2) URL FESTLEGEN
REM Wenn du in next.config.js im DEV KEIN basePath hast (empfohlen):
set "APP_URL=http://localhost:3000/"

REM Wenn du doch im DEV mit basePath arbeitest,
REM dann kommentiere die Zeile oben aus und nimm diese:
REM set "APP_URL=http://localhost:3000/Matize-Musik"
REM -----------------------------------------------

REM Prüfen, ob Node vorhanden ist
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js wurde nicht gefunden!
    echo Bitte installiere Node.js von https://nodejs.org
    pause
    exit /b
)

REM Server starten
echo 🔧 Server wird gestartet...
start "" cmd /k "npm run dev"

REM kurz warten, bis der Dev-Server hochkommt
timeout /t 5 /nobreak >nul

REM Browser oeffnen
echo 🌐 Öffne Browser auf %APP_URL%
start "" "%APP_URL%"

echo.
echo ✅ Matize-Musik laeuft jetzt unter: %APP_URL%
echo Zum Beenden bitte im Dev-Fenster STRG + C druecken.
echo.
pause
exit
