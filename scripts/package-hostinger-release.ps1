$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$distDir = Join-Path $repoRoot 'dist'
$releaseDir = Join-Path $repoRoot 'release'
$zipPath = Join-Path $releaseDir 'riq-hostinger-web.zip'

if (-not (Test-Path -LiteralPath $distDir)) {
  throw "Missing dist directory at $distDir. Run npm run build first."
}

New-Item -ItemType Directory -Force -Path $releaseDir | Out-Null

if (Test-Path -LiteralPath $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

$items = Get-ChildItem -Force -LiteralPath $distDir
if ($items.Count -eq 0) {
  throw "The dist directory is empty. Build the web app before packaging it."
}

Compress-Archive -LiteralPath $items.FullName -DestinationPath $zipPath -Force

Write-Host "Created Hostinger upload package at $zipPath" -ForegroundColor Green
