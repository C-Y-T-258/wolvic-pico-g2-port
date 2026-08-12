[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$RepoPath,

    [Parameter(Mandatory = $true)]
    [string]$WorkspaceRoot,

    [Parameter(Mandatory = $true)]
    [string]$PicoSdkAar,

    [Parameter(Mandatory = $true)]
    [string]$JavaHome,

    [Parameter(Mandatory = $true)]
    [string]$GradleBat,

    [Parameter(Mandatory = $true)]
    [string]$AndroidSdk,

    [Parameter(Mandatory = $true)]
    [string]$NdkPath,

    [ValidateSet('Debug', 'Release')]
    [string]$Variant = 'Release'
)

$ErrorActionPreference = 'Stop'
$expectedBase = '14f4e485d45238908c2c5528fd8eb3a3698b82e7'
$expectedSdk = 'D3CF54F0A3A20033DACB49B91F14376DB32E8B2B9F5CCA5E8EA72E37892BD53C'
$patchPaths = @(
    (Join-Path $PSScriptRoot 'patches\0001-wolvic-1.6.2-picog2-gecko128-final-source-only.patch'),
    (Join-Path $PSScriptRoot 'patches\0002-restore-early-vr-video-resize-order.patch'),
    (Join-Path $PSScriptRoot 'patches\0003-add-pornhub-projection-compatibility-menu.patch')
)

foreach ($path in @($RepoPath, $WorkspaceRoot, $PicoSdkAar, $JavaHome, $GradleBat, $AndroidSdk, $NdkPath) + $patchPaths) {
    if (-not (Test-Path -LiteralPath $path)) {
        throw "Required path does not exist: $path"
    }
}

$actualBase = (& git -C $RepoPath rev-parse HEAD).Trim()
if ($LASTEXITCODE -ne 0 -or $actualBase -ne $expectedBase) {
    throw "Repo HEAD must be Wolvic v1.6.2 ($expectedBase); found $actualBase"
}

# The verified extension assets intentionally retain their original byte-level
# line endings. Keep Git from rewriting the patch inputs on Windows.
& git -C $RepoPath config core.autocrlf false
if ($LASTEXITCODE -ne 0) {
    throw 'Failed to configure repository line-ending behavior'
}

$actualSdk = (Get-FileHash -LiteralPath $PicoSdkAar -Algorithm SHA256).Hash
if ($actualSdk -ne $expectedSdk) {
    throw "Unexpected Pico SDK AAR SHA256: $actualSdk"
}

& git -C $RepoPath submodule update --init --recursive
if ($LASTEXITCODE -ne 0) {
    throw 'Submodule initialization failed'
}

foreach ($patchPath in $patchPaths) {
    & git -C $RepoPath apply --reverse --check $patchPath 2>$null
    if ($LASTEXITCODE -eq 0) {
        continue
    }
    & git -C $RepoPath apply --check $patchPath
    if ($LASTEXITCODE -ne 0) {
        throw "Patch preflight failed: $patchPath"
    }
    & git -C $RepoPath apply $patchPath
    if ($LASTEXITCODE -ne 0) {
        throw "Patch application failed: $patchPath"
    }
}

$sdkDir = Join-Path $RepoPath 'third_party\picovr'
New-Item -ItemType Directory -Force $sdkDir | Out-Null
Copy-Item -LiteralPath $PicoSdkAar -Destination (Join-Path $sdkDir 'PvrSDK-Native-release.aar') -Force

$buildRoot = Join-Path $WorkspaceRoot 'build'
$outputDir = Join-Path $buildRoot 'outputs'
$projectCache = Join-Path $buildRoot 'gradle-project-cache'
$gradleUserHome = Join-Path $buildRoot 'gradle-user-home'
New-Item -ItemType Directory -Force $outputDir, $projectCache, $gradleUserHome | Out-Null

$env:JAVA_HOME = (Resolve-Path -LiteralPath $JavaHome).Path
$env:GRADLE_USER_HOME = (Resolve-Path -LiteralPath $gradleUserHome).Path
$env:ANDROID_HOME = (Resolve-Path -LiteralPath $AndroidSdk).Path
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME

$task = ":app:assemblePicovrArm64GeckoGeneric$Variant"
& $GradleBat $task `
    "-PworkspaceOutputDir=$outputDir" `
    "-PworkspaceNdkPath=$NdkPath" `
    --project-cache-dir $projectCache `
    --no-daemon `
    --console=plain

if ($LASTEXITCODE -ne 0) {
    throw "Gradle failed with exit code $LASTEXITCODE"
}

Write-Host "Build completed: $task"
Write-Host "Outputs: $outputDir"
