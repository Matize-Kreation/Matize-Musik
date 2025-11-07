# sync-matize-musik.ps1
Write-Host "==============================================="
Write-Host "🚀 Starte Matize-Musik Deployment"
Write-Host "==============================================="

# Projektpfad
Set-Location "D:\Matize\Matize-Kreation\Matize-Musik"

# Git vorbereiten
if (Test-Path ".git\index.lock") { Remove-Item ".git\index.lock" -Force }

if (-not (Test-Path ".git")) {
    git init
}

if (-not (git remote)) {
    git remote add origin "https://github.com/Matize-Kreation/Matize-Musik.git"
}
else {
    git remote set-url origin "https://github.com/Matize-Kreation/Matize-Musik.git"
}

# Build mit EXPORT=true
$env:EXPORT = "true"
Write-Host "[Build] Starte Export-Build..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build fehlgeschlagen."
    exit 1
}

# docs vorbereiten
Write-Host "[Deploy] Bereinige docs/"
if (Test-Path ".\docs") {
    Remove-Item .\docs\* -Recurse -Force -ErrorAction SilentlyContinue
}
else {
    New-Item -ItemType Directory -Path .\docs | Out-Null
}

# out → docs
Copy-Item .\out\* .\docs -Recurse -Force

# public → docs (für Bilder, Audio etc.)
Copy-Item .\public\* .\docs -Recurse -Force -ErrorAction SilentlyContinue

# .nojekyll
New-Item -Path ".\docs\.nojekyll" -ItemType File -Force | Out-Null

# Git commit
git add -u
git add .\docs

if (-not (git diff --cached --quiet)) {
    $ts = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    git commit -m "deploy: export to docs ($ts)"
}
else {
    Write-Host "🔍 Keine Änderungen zum Commit."
}

# Git push
git pull --rebase origin main
git push origin main

Write-Host "✅ Deployment abgeschlossen."
# .next löschen, falls vorhanden
if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue
}
