# PowerShell-Skript: Matize-Musik GitHub Sync

# 1. Wechsel in das Projektverzeichnis
Set-Location -Path "D:\Matize\Matize-Kreation\Matize-Musik"

Write-Host "============================================"
Write-Host "  GitHub Sync wird gestartet..."
Write-Host "  Projekt: Matize-Musik"
Write-Host "============================================"

# 2. Sicherstellen, dass der Lock-File entfernt wird
if (Test-Path ".git\index.lock") {
    Write-Host "[Info] Entferne index.lock..."
    Remove-Item ".git\index.lock" -Force
}

# 3. Sicherstellen, dass das Git-Repo initialisiert ist
if (-Not (Test-Path ".git")) {
    Write-Host "[Info] Initialisiere Git-Repo..."
    git init
}

# 4. Sicherstellen, dass der Remote-URL korrekt gesetzt ist
git remote get-url origin > $null 2>&1
if ($?) {
    Write-Host "[Info] Remote origin existiert, setze URL..."
    git remote set-url origin https://github.com/Matize-Kreation/Matize-Musik.git
}
else {
    Write-Host "[Info] Remote origin nicht vorhanden, setze origin..."
    git remote add origin https://github.com/Matize-Kreation/Matize-Musik.git
}

# 5. Änderungen an Git vorbereiten
git add -A

# 6. Commit erstellen, falls Änderungen vorhanden sind
$changes = git diff --cached --quiet
if ($changes -eq 0) {
    Write-Host "[Info] Keine neuen Änderungen gefunden."
}
else {
    Write-Host "[Info] Commit wird erstellt..."
    git commit -m "Auto-Commit am $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
}

# 7. Lokalen Branch mit GitHub abgleichen (Pull)
Write-Host "[Info] Aktualisiere lokalen Stand (pull --rebase)..."
git pull origin main --rebase

# 8. Pushen der Änderungen zu GitHub
Write-Host "[Info] Lade Änderungen nach GitHub hoch..."
git push origin main

# 9. Abschlussnachricht
Write-Host "--------------------------------------------"
Write-Host "   Upload abgeschlossen!"
Write-Host "--------------------------------------------"
