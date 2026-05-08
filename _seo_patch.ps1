# SEO Patch Script - ASCII-safe approach
$filePath = "z:\PROJECTS\PRICELIST_SCRIPT\index.html"
$seoBlockPath = "z:\PROJECTS\PRICELIST_SCRIPT\_seo_block.html"

# Read as bytes, decode as UTF-8
$bytes = [System.IO.File]::ReadAllBytes($filePath)
$content = [System.Text.Encoding]::UTF8.GetString($bytes)
if ($content[0] -eq [char]0xFEFF) { $content = $content.Substring(1) }

Write-Host "Original size: $($content.Length) chars"

# 1. Replace title using regex with char codes to avoid encoding issues
$oldTitlePattern = '<title>[^<]+</title>'
$newTitle = '<title>' + ([char]0x0418) + ([char]0x0418) + '-' + ([char]0x043F) + ([char]0x043E) + ([char]0x043C) + ([char]0x043E) + ([char]0x0449) + ([char]0x043D) + ([char]0x0438) + ([char]0x043A) + ([char]0x0438) + ' ' + ([char]0x0434) + ([char]0x043B) + ([char]0x044F) + ' ' + ([char]0x0431) + ([char]0x0438) + ([char]0x0437) + ([char]0x043D) + ([char]0x0435) + ([char]0x0441) + ([char]0x0430)

# Actually, let's just use a simpler approach - read the replacement strings from files

# Create title replacement file
$titleFile = "z:\PROJECTS\PRICELIST_SCRIPT\_title_new.txt"
[System.IO.File]::WriteAllText($titleFile, "  <title>ИИ-помощники для бизнеса — 13 решений с окупаемостью от 2 мес. | Денис Полоцк</title>", [System.Text.Encoding]::UTF8)

# Read it back
$newTitleLine = [System.IO.File]::ReadAllText($titleFile, [System.Text.Encoding]::UTF8)

# Find and replace title line
$oldTitleStr = "ИИ-помощники для бизнеса | Прейскурант 2026"
$newTitleStr = "ИИ-помощники для бизнеса — 13 решений с окупаемостью от 2 мес. | Денис Полоцк"

# Read these from the file to ensure correct encoding
$oldTitleBytes = [System.Text.Encoding]::UTF8.GetBytes($oldTitleStr)
$newTitleBytes = [System.Text.Encoding]::UTF8.GetBytes($newTitleStr)
$oldTitleDecoded = [System.Text.Encoding]::UTF8.GetString($oldTitleBytes)
$newTitleDecoded = [System.Text.Encoding]::UTF8.GetString($newTitleBytes)

Write-Host "Looking for old title..."
$hasOldTitle = $content.Contains($oldTitleDecoded)
Write-Host "Found old title: $hasOldTitle"

if ($hasOldTitle) {
    $content = $content.Replace($oldTitleDecoded, $newTitleDecoded)
    Write-Host "Title replaced"
}

# Save intermediate result
$utf8NoBOM = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($filePath, $content, $utf8NoBOM)
Write-Host "Step 1 done, file saved"

# Clean up temp files
Remove-Item $titleFile -ErrorAction SilentlyContinue
