$lines = Get-Content ".\quran-data\quran-uthmani.txt" -Encoding UTF8

$surahs = @()
$current = $null

foreach ($line in $lines) {

    if ([string]::IsNullOrWhiteSpace($line)) {
        continue
    }

    $parts = $line -split '\|', 3

    if ($parts.Count -ne 3) {
        continue
    }

    $surahNumber = [int]$parts[0]
    $ayahNumber  = [int]$parts[1]
    $text        = $parts[2]

    if ($null -eq $current -or $current.number -ne $surahNumber) {

        if ($null -ne $current) {
            $surahs += $current
        }

        $current = [ordered]@{
            number = $surahNumber
            ayahs = @()
        }
    }

    $current.ayahs += [ordered]@{
        number = $ayahNumber
        text = $text
    }
}

if ($null -ne $current) {
    $surahs += $current
}

$json = $surahs | ConvertTo-Json -Depth 10

[System.IO.File]::WriteAllText(
    ".\quran-data\quran.json",
    $json,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host "تم إصلاح quran.json بنجاح" -ForegroundColor Green
