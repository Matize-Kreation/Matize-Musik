# Matize-Musik Deploy Script

$projectPath = "D:\Matize\Matize-Kreation\Matize-Musik"

Set-Location $projectPath

# 1. Git-Lock entfernen
if (Test-Path ".git\index.lock") {
    Remove-Item ".git\index.lock" -Force
}

# 2. Repo sicherstellen
$repoNew = $false
if (-not (Test-Path ".git")) {
    git init
    $repoNew = $true
}

if ($repoNew) {
    git branch -M main
}

# 3. Remote setzen/aktualisieren
$remoteUrl = "https://github.com/Matize-Kreation/Matize-Musik.git"
$remotes = git remote
if (-not $remotes) {
    git remote add origin $remoteUrl
}
else {
    git remote set-url origin $remoteUrl
}

# 4. Build (deine next.config.cjs reagiert auf EXPORT=true)
$env:EXPORT = "true"
Write-Host "[Build] next build ..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build fehlgeschlagen."
    exit 1
}

# 5. docs/ neu befüllen
Write-Host "[Deploy] docs vorbereiten ..."
if (Test-Path ".\docs") {
    Remove-Item .\docs\* -Recurse -Force
}
else {
    New-Item -ItemType Directory -Path .\docs | Out-Null
}

# 6. out -> docs (Next legt out/ beim Build an, weil output:'export')
if (Test-Path ".\out") {
    Copy-Item .\out\* .\docs -Recurse -Force
}
else {
    Write-Host "Achtung: Ordner 'out' wurde nicht gefunden. Prüfe build-Ausgabe oder next.config.cjs."
}

# 7. public -> docs (Assets mitnehmen)
if (Test-Path ".\public") {
    Copy-Item .\public\* .\docs -Recurse -Force
}

# 8. .nojekyll für GitHub Pages
New-Item -Path ".\docs\.nojekyll" -ItemType File -Force | Out-Null

# 9. git add/commit/push
git add -u
git add .\docs

if (-not (git diff --cached --quiet)) {
    $ts = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    git commit -m "deploy: export to docs ($ts)"
}

try {
    git pull --rebase origin main
}
catch {
    Write-Host "pull nicht möglich, fahre fort ..."
}

git push origin main

Write-Host "Deployment abgeschlossen."

# 10. .next aufräumen (optional)
if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force
}
