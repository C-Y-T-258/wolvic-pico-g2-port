param([string]$ReportPath)

$ErrorActionPreference = 'Stop'
$payloadPath = Join-Path $PSScriptRoot 'indexnow.json'
$payload = Get-Content -LiteralPath $payloadPath -Raw | ConvertFrom-Json
$sitePrefix = 'https://c-y-t-258.github.io/wolvic-pico-g2-port/'
$endpoint = 'https://api.indexnow.org/indexnow'
$expectedUrls = @($sitePrefix, ($sitePrefix + 'en/'))
if ($payload.host -ne ([uri]$sitePrefix).Host -or
    $payload.key -cnotmatch '^[a-zA-Z0-9-]{8,128}$' -or
    $payload.keyLocation -cne ($sitePrefix + $payload.key + '.txt') -or
    @($payload.urlList).Count -ne 2 -or
    (Compare-Object -ReferenceObject $expectedUrls -DifferenceObject @($payload.urlList) -CaseSensitive)) {
    throw 'IndexNow payload must contain only the two approved showcase URLs and their scoped public key.'
}

# A successful deployment must expose the ownership file before notification.
$keyResponse = Invoke-WebRequest -Uri $payload.keyLocation -TimeoutSec 30 -SkipHttpErrorCheck
$keyText = if ($keyResponse.Content -is [byte[]]) {
    [Text.Encoding]::UTF8.GetString($keyResponse.Content)
} else { [string]$keyResponse.Content }
if ($keyResponse.StatusCode -ne 200 -or $keyText.Trim() -cne $payload.key) {
    throw 'Live ownership file is unavailable or does not match; no URLs were submitted.'
}

$response = Invoke-WebRequest -Uri $endpoint -Method Post `
    -ContentType 'application/json; charset=utf-8' `
    -Body ($payload | ConvertTo-Json -Depth 4) -TimeoutSec 30 -SkipHttpErrorCheck
$status = [int]$response.StatusCode
$result = [pscustomobject]@{
    CheckedAt = [DateTimeOffset]::Now.ToString('o')
    Endpoint = $endpoint
    KeyLocation = $payload.keyLocation
    KeyFileVerified = $true
    Urls = @($payload.urlList)
    StatusCode = $status
    Result = switch ($status) {
        200 { 'URLs received; indexing is not confirmed.' }
        202 { 'URLs received; key validation pending. Indexing is not confirmed.' }
        default { 'Submission was not accepted; inspect the response.' }
    }
    Response = [string]$response.Content
}
$json = $result | ConvertTo-Json -Depth 5
if ($ReportPath) {
    $json | Set-Content -LiteralPath $ReportPath -Encoding utf8
}
$json
if ($status -notin @(200, 202)) {
    throw "IndexNow returned HTTP $status."
}
