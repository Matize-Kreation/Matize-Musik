# Matize-Musik – simpler GitHub Sync

Set-Location "D:\Matize\Matize-Kreation\Matize-Musik"

Write-Host "== Matize-Musik Sync =="

# git lock weg
if (Test-Path ".git\index.lock") {
    Remove-Item ".git\index.lock" -Force
}

# repo sicherstellen
if (-not (Test-Path ".git")) {
    git init
}

# remote sicherstellen
git remote get-url origin > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    git remote add origin "https://github.com/Matize-Kreation/Matize-Musik.git"
}
else {
    git remote set-url origin "https://github.com/Matize-Kreation/Matize-Musik.git"
}

# build
Write-Host "[Build] npm run build"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build fehlgeschlagen."
    exit 1
}

# docs leeren
Write-Host "[Deploy] docs leeren"
if (Test-Path ".\docs") {
    Remove-Item .\docs\* -Recurse -Force -ErrorAction SilentlyContinue
}
else {
    New-Item -ItemType Directory -Path .\docs | Out-Null
}

# out nach docs
Write-Host "[Deploy] out -> docs"
Copy-Item .\out\* .\docs -Recurse -Force

# .nojekyll anlegen (immer)
New-Item -Path ".\docs\.nojekyll" -ItemType File -Force | Out-Null

# git add
Write-Host "[Git] add"
git add -u
git add .\docs

# commit nur falls nötig
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
    $ts = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    git commit -m "deploy: export to docs ($ts)"
}
else {
    Write-Host "nix zu committen"
}

# pull --rebase
Write-Host "[Git] pull --rebase"
git pull --rebase origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "pull --rebase fehlgeschlagen. Abbruch."
    exit 1
}

# push
Write-Host "[Git] push"
git push origin main

Write-Host "== fertig =="
