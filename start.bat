@echo off
title Matize-Musik – Dev Server
color 0B

echo ================================================
echo      🚀 Starte Matize-Musik Development Server
echo ================================================
echo.

REM Pfad zum Projekt
cd /d "D:\Matize\Matize-Kreation\Matize-Musik"

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

REM Warte kurz, bis Server startet
timeout /t 5 /nobreak >nul

REM Browser öffnen (Edge oder Standardbrowser)
echo 🌐 Öffne Browser auf http://localhost:3000
start "" "http://localhost:3000"

echo.
echo ✅ Matize-Musik laeuft jetzt unter: http://localhost:3000
echo Zum Beenden bitte im Dev-Fenster STRG + C druecken.
echo.
pause
exit
