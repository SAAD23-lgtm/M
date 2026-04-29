param(
  [string]$SourceImage = (Join-Path $PSScriptRoot '..\public\images\96e4912f-19c6-4e22-aa20-512a75f63282.jpg'),
  [string]$OutputDir = (Join-Path $PSScriptRoot '..\mobile\assets')
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

function New-RoundedRectanglePath {
  param(
    [System.Drawing.RectangleF]$Rect,
    [float]$Radius
  )

  $diameter = $Radius * 2
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc($Rect.X, $Rect.Y, $diameter, $diameter, 180, 90)
  $path.AddArc($Rect.Right - $diameter, $Rect.Y, $diameter, $diameter, 270, 90)
  $path.AddArc($Rect.Right - $diameter, $Rect.Bottom - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($Rect.X, $Rect.Bottom - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  return $path
}

function Set-HighQuality {
  param([System.Drawing.Graphics]$Graphics)

  $Graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $Graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $Graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $Graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $Graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
}

function Get-FitRectangle {
  param(
    [int]$SourceWidth,
    [int]$SourceHeight,
    [float]$TargetWidth,
    [float]$TargetHeight
  )

  $ratio = [Math]::Min($TargetWidth / $SourceWidth, $TargetHeight / $SourceHeight)
  $width = $SourceWidth * $ratio
  $height = $SourceHeight * $ratio
  $x = ($TargetWidth - $width) / 2
  $y = ($TargetHeight - $height) / 2

  return [System.Drawing.RectangleF]::new($x, $y, $width, $height)
}

function Save-Png {
  param(
    [System.Drawing.Bitmap]$Bitmap,
    [string]$Path
  )

  $directory = Split-Path -Parent $Path
  if (-not (Test-Path $directory)) {
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
  }

  $Bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
}

function New-Canvas {
  param([int]$Width, [int]$Height)

  return New-Object System.Drawing.Bitmap($Width, $Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
}

if (-not (Test-Path $SourceImage)) {
  throw "Source image not found: $SourceImage"
}

if (-not (Test-Path $OutputDir)) {
  New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

$accent = [System.Drawing.ColorTranslator]::FromHtml('#153b66')
$accentSoft = [System.Drawing.ColorTranslator]::FromHtml('#2d6f95')
$sand = [System.Drawing.ColorTranslator]::FromHtml('#edf4fa')
$white = [System.Drawing.Color]::White
$source = [System.Drawing.Image]::FromFile($SourceImage)

try {
  $icon = New-Canvas 1024 1024
  $g = [System.Drawing.Graphics]::FromImage($icon)
  try {
    Set-HighQuality $g
    $gradient = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
      [System.Drawing.Rectangle]::new(0, 0, 1024, 1024),
      $accent,
      $accentSoft,
      45
    )
    try {
      $g.FillRectangle($gradient, 0, 0, 1024, 1024)
    } finally {
      $gradient.Dispose()
    }

    $panelRect = [System.Drawing.RectangleF]::new(112, 112, 800, 800)
    $panelPath = New-RoundedRectanglePath -Rect $panelRect -Radius 220
    try {
      $panelBrush = New-Object System.Drawing.SolidBrush($white)
      $panelPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(36, 12, 35, 64), 6)
      try {
        $g.FillPath($panelBrush, $panelPath)
        $g.DrawPath($panelPen, $panelPath)
      } finally {
        $panelBrush.Dispose()
        $panelPen.Dispose()
      }
    } finally {
      $panelPath.Dispose()
    }

    $dest = Get-FitRectangle -SourceWidth $source.Width -SourceHeight $source.Height -TargetWidth 620 -TargetHeight 620
    $dest.X += 202
    $dest.Y += 202
    $g.DrawImage($source, $dest)
  } finally {
    $g.Dispose()
  }
  Save-Png -Bitmap $icon -Path (Join-Path $OutputDir 'icon.png')
  Save-Png -Bitmap $icon -Path (Join-Path $OutputDir 'store-icon-1024.png')
  $icon.Dispose()

  $foreground = New-Canvas 432 432
  $g = [System.Drawing.Graphics]::FromImage($foreground)
  try {
    Set-HighQuality $g
    $g.Clear([System.Drawing.Color]::Transparent)
    $dest = Get-FitRectangle -SourceWidth $source.Width -SourceHeight $source.Height -TargetWidth 324 -TargetHeight 324
    $dest.X += 54
    $dest.Y += 54
    $g.DrawImage($source, $dest)
  } finally {
    $g.Dispose()
  }
  Save-Png -Bitmap $foreground -Path (Join-Path $OutputDir 'adaptive-icon-foreground.png')
  $foreground.Dispose()

  $background = New-Canvas 432 432
  $g = [System.Drawing.Graphics]::FromImage($background)
  try {
    Set-HighQuality $g
    $gradient = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
      [System.Drawing.Rectangle]::new(0, 0, 432, 432),
      $accent,
      $accentSoft,
      45
    )
    try {
      $g.FillRectangle($gradient, 0, 0, 432, 432)
    } finally {
      $gradient.Dispose()
    }
  } finally {
    $g.Dispose()
  }
  Save-Png -Bitmap $background -Path (Join-Path $OutputDir 'adaptive-icon-background.png')
  $background.Dispose()

  $splash = New-Canvas 1024 1024
  $g = [System.Drawing.Graphics]::FromImage($splash)
  try {
    Set-HighQuality $g
    $g.Clear([System.Drawing.Color]::Transparent)
    $dest = Get-FitRectangle -SourceWidth $source.Width -SourceHeight $source.Height -TargetWidth 700 -TargetHeight 700
    $dest.X += 162
    $dest.Y += 162
    $g.DrawImage($source, $dest)
  } finally {
    $g.Dispose()
  }
  Save-Png -Bitmap $splash -Path (Join-Path $OutputDir 'splash-icon.png')
  $splash.Dispose()

  $favicon = New-Canvas 64 64
  $g = [System.Drawing.Graphics]::FromImage($favicon)
  try {
    Set-HighQuality $g
    $g.Clear($accent)
    $dest = Get-FitRectangle -SourceWidth $source.Width -SourceHeight $source.Height -TargetWidth 50 -TargetHeight 50
    $dest.X += 7
    $dest.Y += 7
    $g.DrawImage($source, $dest)
  } finally {
    $g.Dispose()
  }
  Save-Png -Bitmap $favicon -Path (Join-Path $OutputDir 'favicon.png')
  $favicon.Dispose()

  $feature = New-Canvas 1024 500
  $g = [System.Drawing.Graphics]::FromImage($feature)
  try {
    Set-HighQuality $g
    $gradient = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
      [System.Drawing.Rectangle]::new(0, 0, 1024, 500),
      $accent,
      $accentSoft,
      15
    )
    try {
      $g.FillRectangle($gradient, 0, 0, 1024, 500)
    } finally {
      $gradient.Dispose()
    }

    $bubbleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(28, 255, 255, 255))
    try {
      $g.FillEllipse($bubbleBrush, 690, 36, 240, 240)
      $g.FillEllipse($bubbleBrush, 780, 220, 180, 180)
      $g.FillEllipse($bubbleBrush, 610, 300, 120, 120)
    } finally {
      $bubbleBrush.Dispose()
    }

    $cardRect = [System.Drawing.RectangleF]::new(62, 58, 360, 360)
    $cardPath = New-RoundedRectanglePath -Rect $cardRect -Radius 84
    try {
      $cardBrush = New-Object System.Drawing.SolidBrush($sand)
      try {
        $g.FillPath($cardBrush, $cardPath)
      } finally {
        $cardBrush.Dispose()
      }
    } finally {
      $cardPath.Dispose()
    }

    $dest = Get-FitRectangle -SourceWidth $source.Width -SourceHeight $source.Height -TargetWidth 248 -TargetHeight 248
    $dest.X += 118
    $dest.Y += 114
    $g.DrawImage($source, $dest)

    $titleFont = New-Object System.Drawing.Font('Segoe UI', 34, [System.Drawing.FontStyle]::Bold)
    $subtitleFont = New-Object System.Drawing.Font('Segoe UI', 16, [System.Drawing.FontStyle]::Regular)
    $textBrush = New-Object System.Drawing.SolidBrush($white)
    $mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 232, 243, 251))
    try {
      $g.DrawString('Riq Store', $titleFont, $textBrush, [System.Drawing.PointF]::new(464, 164))
      $g.DrawString('Water delivery app', $subtitleFont, $mutedBrush, [System.Drawing.PointF]::new(468, 222))
      $g.DrawString('Browse products, cart, and fast checkout', $subtitleFont, $mutedBrush, [System.Drawing.PointF]::new(468, 252))
    } finally {
      $titleFont.Dispose()
      $subtitleFont.Dispose()
      $textBrush.Dispose()
      $mutedBrush.Dispose()
    }
  } finally {
    $g.Dispose()
  }
  Save-Png -Bitmap $feature -Path (Join-Path $OutputDir 'feature-graphic.png')
  $feature.Dispose()
}
finally {
  $source.Dispose()
}

Write-Output "Generated mobile assets in $OutputDir"
