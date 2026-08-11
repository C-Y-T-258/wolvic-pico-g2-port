# Wolvic Pico G2 port (Gecko 128)

[English](README.md) | [简体中文](README.zh-CN.md)

Source-only patch set for running Wolvic 1.6.2 with its native legacy
PicoVR backend on Pico G2. This is not the current Wolvic `picoxr`/OpenXR
backend.

## Verified scope

- Base: Igalia/Wolvic `v1.6.2` (`14f4e485d45238908c2c5528fd8eb3a3698b82e7`)
- GeckoView: `128.0.20240609205151`, ExternalVR ABI 18
- Device: Pico G2, Android 8.1/API 27, arm64-v8a
- Native PicoVR display, TimeWarp, 3DoF head tracking, controller input and
  immersive WebXR work on the tested device.
- Runtime compatibility code fixes missing SVG intrinsic dimensions used by
  the target site's Three.js canvas controls.
- A fullscreen Surface resize race is fixed. A short aspect-ratio transition
  can still be visible while entering or leaving fullscreen.

Building successfully is not proof that every WebXR site or video works.
Device testing is still required.

## Files

- `patches/0001-...source-only.patch`: cumulative Pico G2 port patch against `v1.6.2`
- `patches/0002-...surface-resize.patch`: waits for the resized Surface before
  creating the VR video projection
- `build.ps1`: checks prerequisites, stages a locally obtained Pico SDK AAR,
  applies the patch and builds one variant
- `docs/PICO_SDK.md`: SDK checksum and redistribution boundary
- `docs/VERIFICATION.md`: verified build/device results and remaining limits
- `docs/PICO_ALPHA.md`: internal-test metadata and Pico G2 distribution limit

## Build

Obtain the PicoVR Android Native SDK v1.3.3 AAR yourself and accept Pico's
license. The SDK is deliberately absent from this repository.

```powershell
git clone --branch v1.6.2 --recurse-submodules https://github.com/Igalia/wolvic.git D:\work\wolvic-v1.6.2

.\build.ps1 `
  -RepoPath D:\work\wolvic-v1.6.2 `
  -WorkspaceRoot D:\work\wolvic-build `
  -PicoSdkAar D:\private\PvrSDK-Native-release.aar `
  -JavaHome D:\tools\jdk-17 `
  -GradleBat D:\tools\gradle-8.2\bin\gradle.bat `
  -AndroidSdk C:\Android\Sdk `
  -NdkPath D:\tools\android-ndk-r25b `
  -Variant Release
```

The release variant is unsigned unless the upstream project is supplied with
a signing configuration. Never install an unsigned APK. The debug variant uses
the normal Android debug signing behavior.

## Publishing

Do not commit or attach any of these files without separate permission from
Pico:

- `PvrSDK-Native-release.aar`
- `libPvr_NativeSDK.so`
- unpacked SDK classes or headers
- APKs that embed the SDK when the intended distribution terms have not been
  reviewed

The patch and Wolvic-derived source files are provided under MPL-2.0. Third
party components keep their own licenses.

## Current release state

A separately signed `1.6.2` build has passed PICO's APK signature check and is
registered in a private Alpha channel for `PICO G2 4k`. The device-tested
`0038` APK is available as an explicitly unofficial GitHub prerelease. It
contains the legacy Pico runtime; downloading the APK does not grant permission
to extract or redistribute that SDK separately. PICO's current test channel
documentation limits Library-based delivery to Pico Neo3 or newer, so the
tested G2 still requires an authorized local sideload.
