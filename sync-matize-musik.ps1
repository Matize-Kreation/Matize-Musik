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

# 2. Git-Lock entfernen
if (Test-Path ".git\index.lock") {
    Write-Host "[Info] index.lock gefunden – wird entfernt ..." -ForegroundColor Yellow
    Remove-Item ".git\index.lock" -Force
}

# 3. Git-Repo sicherstellen
if (-not (Test-Path ".git")) {
    Write-Host "[Info] .git nicht gefunden – initialisiere Git-Repository ..." -ForegroundColor Yellow
    git init
}

# 4. Remote setzen/prüfen
git remote get-url origin > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[Info] Remote 'origin' nicht vorhanden – wird gesetzt ..." -ForegroundColor Yellow
    git remote add origin "https://github.com/Matize-Kreation/Matize-Musik.git"
}
else {
    Write-Host "[Info] Remote 'origin' existiert – URL wird synchronisiert ..." -ForegroundColor DarkGray
    git remote set-url origin "https://github.com/Matize-Kreation/Matize-Musik.git"
}

# 5. Build ausführen
Write-Host "[Build] Starte npm run build ..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[Fehler] npm run build ist fehlgeschlagen. Sync wird abgebrochen." -ForegroundColor Red
    exit 1
}

# 6. docs leeren & out rüberkopieren
Write-Host "[Deploy] Lösche bestehenden docs/-Inhalt ..." -ForegroundColor Cyan
if (Test-Path ".\docs") {
    Remove-Item -Path .\docs\* -Recurse -Force -ErrorAction SilentlyContinue
}
else {
    New-Item -ItemType Directory -Path .\docs | Out-Null
}

Write-Host "[Deploy] Kopiere Export aus .\out\ nach .\docs ..." -ForegroundColor Cyan
Copy-Item -Path .\out\* -Destination .\docs -Recurse -Force

# 6.1 .nojekyll nachziehen (wichtig für GitHub Pages + _next)
if (-not (Test-Path ".\docs\.nojekyll")) {
    New-Item -Path ".\docs\.nojekyll" -ItemType File | Out-Null
}

# 7. Änderungen stagen
Write-Host "[Git] Füge geänderte Dateien hinzu (git add -u und docs) ..." -ForegroundColor Cyan
git add -u
git add .\docs

# 8. Commit nur wenn nötig
git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "[Info] Keine neuen Änderungen gefunden – kein Commit nötig." -ForegroundColor DarkGray
}
else {
    $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    $message = "deploy: export to docs ($timestamp)"
    Write-Host "[Git] Erstelle Commit: $message" -ForegroundColor Green
    git commit -m "$message"
}

# 9. Rebase-Pull
Write-Host "[Git] Hole aktuellen Stand von GitHub (git pull --rebase origin main) ..." -ForegroundColor Cyan
git pull --rebase origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "[Warnung] git pull --rebase fehlgeschlagen – Konflikte prüfen (oft docs/)." -ForegroundColor Yellow
    exit 1
}

# 10. Push
Write-Host "[Git] Push zu GitHub (git push origin main) ..." -ForegroundColor Cyan
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "[Fehler] git push ist fehlgeschlagen." -ForegroundColor Red
    exit 1
}

Write-Host "--------------------------------------------"
Write-Host "  Sync abgeschlossen."
Write-Host "--------------------------------------------"
