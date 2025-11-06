# ============================================
#  Matize-Musik – GitHub Sync (PowerShell)
#  Datei: sync-matize-musik.ps1
# ============================================

# 1. In Projektordner wechseln
Set-Location -Path "D:\Matize\Matize-Kreation\Matize-Musik"

Write-Host "============================================"
Write-Host "  GitHub Sync wird gestartet..."
Write-Host "  Projekt: Matize-Musik"
Write-Host "  Pfad: $((Get-Location).Path)"
Write-Host "============================================"

# 2. Git-Lock entfernen (falls vorheriger Git-Befehl abgebrochen wurde)
if (Test-Path ".git\index.lock") {
    Write-Host "[Info] index.lock gefunden – wird entfernt ..." -ForegroundColor Yellow
    Remove-Item ".git\index.lock" -Force
}

# 3. Sicherstellen, dass ein Git-Repo existiert
if (-not (Test-Path ".git")) {
    Write-Host "[Info] .git nicht gefunden – initialisiere Git-Repository ..." -ForegroundColor Yellow
    git init
}

# 4. Remote 'origin' prüfen / setzen
git remote get-url origin > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[Info] Remote 'origin' nicht vorhanden – wird gesetzt ..." -ForegroundColor Yellow
    git remote add origin "https://github.com/Matize-Kreation/Matize-Musik.git"
}
else {
    # immer sicherstellen, dass die URL korrekt ist
    Write-Host "[Info] Remote 'origin' existiert – überprüfe URL ..." -ForegroundColor DarkGray
    git remote set-url origin "https://github.com/Matize-Kreation/Matize-Musik.git"
}

# 5. Änderungen stagen
Write-Host "[Info] Füge geänderte Dateien hinzu (git add -A) ..." -ForegroundColor Cyan
git add -A

# 6. Prüfen, ob etwas zum Committen da ist
git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "[Info] Keine neuen Änderungen gefunden – kein Commit nötig." -ForegroundColor DarkGray
}
else {
    $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    $message = "Auto-Commit am $timestamp"
    Write-Host "[Info] Erstelle Commit: $message" -ForegroundColor Green
    git commit -m "$message"
}

# 7. Lokalen Stand mit remote abgleichen
Write-Host "[Info] Hole aktuellen Stand von GitHub (git pull origin main --rebase) ..." -ForegroundColor Cyan
git pull origin main --rebase

# 8. Pushen
Write-Host "[Info] Push zu GitHub (git push origin main) ..." -ForegroundColor Cyan
git push origin main

Write-Host "--------------------------------------------"
Write-Host "  Sync abgeschlossen."
Write-Host "--------------------------------------------"
