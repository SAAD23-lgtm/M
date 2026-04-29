$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$mobileRoot = Join-Path $repoRoot 'mobile'
$envExamplePath = Join-Path $mobileRoot '.env.example'
$envPath = Join-Path $mobileRoot '.env'
$exportDir = Join-Path $mobileRoot '.expo-export-check'

function Write-Step {
  param([string] $Message)

  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Read-EnvFile {
  param([string] $Path)

  $values = @{}

  if (-not (Test-Path -LiteralPath $Path)) {
    return $values
  }

  foreach ($line in Get-Content -LiteralPath $Path) {
    $trimmed = $line.Trim()
    if (-not $trimmed -or $trimmed.StartsWith('#')) {
      continue
    }

    $parts = $trimmed -split '=', 2
    if ($parts.Count -ne 2) {
      continue
    }

    $values[$parts[0].Trim()] = $parts[1].Trim()
  }

  return $values
}

function Test-PlaceholderValue {
  param([string] $Value)

  if ([string]::IsNullOrWhiteSpace($Value)) {
    return $true
  }

  return $Value -match 'your-|example\.com|your_'
}

function Invoke-CheckedCommand {
  param(
    [string] $Label,
    [scriptblock] $Command
  )

  Write-Step $Label
  & $Command
  if ($LASTEXITCODE -ne 0) {
    throw "Command failed: $Label"
  }
}

if (-not (Test-Path -LiteralPath $envPath)) {
  if (-not (Test-Path -LiteralPath $envExamplePath)) {
    throw "Missing env template at $envExamplePath"
  }

  Copy-Item -LiteralPath $envExamplePath -Destination $envPath
  Write-Host "Created mobile/.env from .env.example." -ForegroundColor Yellow
}

$envValues = Read-EnvFile -Path $envPath
$blockers = New-Object System.Collections.Generic.List[string]

if (Test-PlaceholderValue $envValues['EXPO_PUBLIC_WEB_BASE_URL']) {
  $blockers.Add('Set EXPO_PUBLIC_WEB_BASE_URL in mobile/.env to the production web origin.')
}

if ((-not $envValues['EAS_PROJECT_ID']) -and (Test-PlaceholderValue $envValues['EXPO_OWNER'])) {
  $blockers.Add('Set EXPO_OWNER in mobile/.env to the Expo account owner.')
}

if (Test-PlaceholderValue $envValues['EAS_PROJECT_ID']) {
  $blockers.Add('Set EAS_PROJECT_ID in mobile/.env after running `npx eas-cli project:init`.')
}

Write-Step 'Checking Expo login'
& npx eas-cli whoami
if ($LASTEXITCODE -ne 0) {
  $blockers.Add('Run `cd mobile && npx eas-cli login` on this machine before building or submitting.')
}

Push-Location $repoRoot
try {
  Invoke-CheckedCommand -Label 'Refresh mobile brand assets' -Command { npm run mobile:assets }
  Invoke-CheckedCommand -Label 'Run shared package tests' -Command { npm run shared:test }
  Invoke-CheckedCommand -Label 'Run mobile tests' -Command { npm run mobile:test }
  Invoke-CheckedCommand -Label 'Run mobile typecheck' -Command { npm run mobile:typecheck }
  Invoke-CheckedCommand -Label 'Build web app' -Command { npm run build }
  Invoke-CheckedCommand -Label 'Export Android bundle check' -Command {
    npm --workspace mobile exec -- expo export --platform android --output-dir .expo-export-check
  }
}
finally {
  Pop-Location
  if (Test-Path -LiteralPath $exportDir) {
    Remove-Item -LiteralPath $exportDir -Recurse -Force
  }
}

if ($blockers.Count -gt 0) {
  Write-Host ""
  Write-Host 'Release blockers still remaining:' -ForegroundColor Yellow
  foreach ($blocker in $blockers) {
    Write-Host "- $blocker" -ForegroundColor Yellow
  }
  exit 1
}

Write-Host ""
Write-Host 'Mobile release preflight passed. Ready for EAS build and store submission.' -ForegroundColor Green
