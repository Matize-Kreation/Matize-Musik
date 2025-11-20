# matize-code-backup.ps1
# sammelt relevante Code-Dateien in einer grossen Textdatei

$RootPath = "D:\Matize\Matize-Kreation\Matize-Musik"
$OutDir = "D:\Matize\Matize-Kreation\Matize-Musik\Prüf-Skripts"

if (!(Test-Path $OutDir)) {
    New-Item -ItemType Directory -Path $OutDir -Force | Out-Null
}

$ts = Get-Date -Format "yyyyMMdd-HHmmss"
$backupFile = Join-Path $OutDir "matize-code-backup-$ts.txt"
$manifestFile = Join-Path $OutDir "matize-code-backup-manifest-$ts.txt"

# welche Endungen wir sichern
$IncludeExt = @(
    ".ts", ".tsx", ".js", ".jsx",
    ".json", ".css", ".html", ".htm",
    ".md", ".py", ".ps1", ".bat", ".cmd",
    ".env", ".yml", ".yaml",
    ".txt", ".xml", ".svg",
    ".ini", ".cfg", ".toml", ".lock"
)

# welche ordner wir auslassen
$ExcludeDirPatterns = @(
    "\\node_modules\\",
    "\\.next\\",
    "\\out\\",
    "\\dist\\",
    "\\.git\\",
    "\\.cache\\"
)

# kleine Hilfsfunktion
function Is-ExcludedDir([string]$fullPath) {
    foreach ($p in $ExcludeDirPatterns) {
        if ($fullPath -match $p) { return $true }
    }
    return $false
}

"MATIZE CODE BACKUP" | Out-File -FilePath $backupFile -Encoding utf8
"FILES INCLUDED ($ts)" | Out-File -FilePath $manifestFile -Encoding utf8

$files = Get-ChildItem -Path $RootPath -Recurse -File -ErrorAction SilentlyContinue

foreach ($f in $files) {
    if (Is-ExcludedDir($f.FullName)) { continue }

    $ext = [IO.Path]::GetExtension($f.Name).ToLower()
    if ($IncludeExt -notcontains $ext) { continue }

    $rel = $f.FullName.Replace($RootPath.TrimEnd('\') + '\', '')

    "### FILE: $rel" | Out-File -FilePath $backupFile -Append -Encoding utf8
    "Path: $($f.FullName)" | Out-File -FilePath $backupFile -Append -Encoding utf8
    ("-" * 60) | Out-File -FilePath $backupFile -Append -Encoding utf8

    try {
        $content = Get-Content -LiteralPath $f.FullName -Raw -ErrorAction Stop
        $content | Out-File -FilePath $backupFile -Append -Encoding utf8
    }
    catch {
        "[UNREADABLE]" | Out-File -FilePath $backupFile -Append -Encoding utf8
    }

    "" | Out-File -FilePath $backupFile -Append -Encoding utf8
    ("=" * 100) | Out-File -FilePath $backupFile -Append -Encoding utf8
    "" | Out-File -FilePath $backupFile -Append -Encoding utf8

    "$rel`t$($f.Length) bytes`t$($f.LastWriteTime.ToString('yyyy-MM-dd HH:mm:ss'))" | Out-File -FilePath $manifestFile -Append -Encoding utf8
}

"Backup finished: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" | Out-File -FilePath $backupFile -Append -Encoding utf8
"Backup file: $backupFile" | Out-File -FilePath $backupFile -Append -Encoding utf8
"Manifest: $manifestFile" | Out-File -FilePath $backupFile -Append -Encoding utf8
