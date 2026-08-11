# Wolvic for Pico G2 (Gecko 128)

[English](README.md) | [简体中文](README.zh-CN.md)

An unofficial Wolvic VR browser port for **Pico G2 / Pico G2 4K**. It combines
Wolvic 1.6.2, GeckoView 128 and the legacy native PicoVR backend to provide an
updated WebXR browser for this 3DoF Android headset. It is useful as a
Firefox Reality alternative on Pico G2, especially for modern WebGL/WebXR video
sites that fail on Firefox Reality 12.2 / Gecko 81.

This is a community test build, not an Igalia or PICO product. It uses the old
PicoVR native runtime, not the current `picoxr` OpenXR backend.

## Download

The device-tested build is available from the GitHub prerelease:

**[Download Wolvic Pico G2 0038 APK](https://github.com/C-Y-T-258/wolvic-pico-g2-port/releases/tag/picog2-1.6.2-0038-test)**

```text
File:        Wolvic-1.6.2-gecko128-picog2-arm64-release-0038-signed.apk
Package:     io.github.cyt258.wolvic.picog2
Version:     1.6.2 (versionCode 202231824)
Architecture: arm64-v8a
SHA256:      1C5847CF21E65BE5CBCE780A06B36B119B588A0E887CEA1690B20575E220BAF1
```

The APK coexists with Firefox Reality because it uses a different package ID.
Installing a newer build of this port with `adb install -r` preserves this
port's browser data when the signing certificate matches.

## Device compatibility

| Item | Tested/supported scope |
| --- | --- |
| Headset | Pico G2 / Pico G2 4K family |
| OS | Android 8.1 / API 27 on the tested G2 |
| CPU | arm64-v8a only |
| Tracking | 3DoF head tracking |
| Input | Pico controller ray and click |
| Browser engine | GeckoView 128 |
| XR backend | Legacy native PicoVR |
| OpenXR | Not used and not required by this build |

It has not been validated on Pico Neo, Pico 4, G3, Quest, phone-style Android
devices or current OpenXR runtimes. Use the official Wolvic builds for current
headsets.

## Install with ADB

1. Enable developer/USB debugging on a Pico G2 that you are authorized to
   manage.
2. Install Android Platform Tools and connect the headset by USB.
3. Confirm that ADB sees the device:

   ```powershell
   adb devices
   ```

4. Verify the downloaded file before installing:

   ```powershell
   Get-FileHash .\Wolvic-1.6.2-gecko128-picog2-arm64-release-0038-signed.apk -Algorithm SHA256
   ```

5. Install or update the app:

   ```powershell
   adb install -r .\Wolvic-1.6.2-gecko128-picog2-arm64-release-0038-signed.apk
   ```

6. Launch **Wolvic Pico G2 Test Build** from the headset and grant the Android
   permissions needed for browsing, media and controller use.

For a specific device among multiple ADB targets, add `-s SERIAL` after `adb`.

## Using WebXR video

1. Open the website in Wolvic and start the video from the normal page first
   if the site requires a user gesture.
2. Use the website's fullscreen or immersive-VR control.
3. Move your head to verify 3DoF tracking. Use the Pico controller ray to
   reveal and operate the player's controls.
4. Treat these as separate checks: page video playback, fullscreen layout,
   immersive WebXR entry, head tracking, video texture rendering and control
   icon visibility.

The build was tested with XVideos normal/fullscreen playback and Pornhub VR
immersive playback. This statement documents compatibility testing; it is not
an endorsement of either service and does not guarantee that future site
updates will remain compatible.

## Verified behavior

- Native PicoVR display, TimeWarp and a roughly 74-75 Hz compositor
- Pico G2 3DoF head tracking and controller input
- Standard immersive WebXR session creation
- GeckoView 128 video/WebGL texture rendering
- Pornhub VR immersive video playback
- Visible Three.js/canvas player control icons
- XVideos normal and fullscreen playback
- No persistent right/bottom crop when entering fullscreen before playback
- Correct exit and re-entry to fullscreen while video is playing

Successful compilation or immersive entry alone is not proof that a WebXR
video site works. Final validation requires playback, tracking, controls and
textures to work together on the headset.

## Known limitations

- A short aspect-ratio transition can appear while entering or leaving
  fullscreen; the final image settles correctly in the tested build.
- Long media experiments once exhausted a Pico G2 codec/Surface resource. A
  full headset reboot restored playback. This is a recovery method, not a
  confirmed permanent application fix.
- The current PICO testing-channel delivery requirements start at Pico Neo3,
  so a G2 cannot rely on PICO Library Alpha delivery. Authorized ADB sideloading
  is still required.
- The build only declares controller support. It does not claim hand, body,
  eye or face tracking, Avatar support or mixed reality.
- Website behavior can change independently of this project.

## Troubleshooting

### `VR not found` or immersive mode does not start

- Confirm that you installed this Pico G2 build, not a generic Android or
  current OpenXR APK.
- Fully close and reopen Wolvic. If media and XR state remain broken, reboot
  the headset and test normal video before immersive mode.
- Verify the site is loaded over HTTPS and that its WebXR entry control is
  enabled after a user gesture.

### Page loads but video does not play

- Test an ordinary non-immersive video first.
- Check DNS/VPN/proxy connectivity separately from decoding.
- Reboot the G2 if multiple sites stop after repeated media experiments. The
  tested device recovered its codec/Surface state after a full reboot.

### Black player icons or persistent fullscreen crop

- Check that Android reports versionCode `202231824` or newer for
  `io.github.cyt258.wolvic.picog2`.
- Build 0038 contains both the SVG intrinsic-size compatibility fix and the
  Surface resize synchronization fix.

### `INSTALL_FAILED_UPDATE_INCOMPATIBLE`

The installed package was signed with a different certificate. Back up data
before uninstalling it. Removing the package deletes that app's local data:

```powershell
adb uninstall io.github.cyt258.wolvic.picog2
adb install .\Wolvic-1.6.2-gecko128-picog2-arm64-release-0038-signed.apk
```

## Rollback

Try installing an older build signed by the same key with downgrade enabled:

```powershell
adb install -r -d .\older-wolvic-picog2.apk
```

If Android rejects the downgrade, uninstalling and reinstalling will work but
will erase this package's browser data. Firefox Reality is a separate package
and is not removed by these commands.

## What the port changes

- Restores the legacy `picovr` product flavor and native Pico G2 device
  delegate on Wolvic 1.6.2.
- Uses GeckoView 128 instead of Firefox Reality's Gecko 81.
- Adds a narrowly scoped site compatibility layer for SVG images whose missing
  intrinsic dimensions produced transparent Three.js canvas controls.
- Waits for the Android Surface to reach the requested size before creating
  the VR video projection, preventing stale-geometry fullscreen cropping.

The project does not replace Pornhub's player, package website resources into
the browser, or use a generic OpenXR backend as a substitute for Pico G2
support.

## Build from source

Building is intended for developers who already have the legacy PicoVR Android
Native SDK v1.3.3 and have accepted its license. The SDK is deliberately absent
from this repository.

Required toolchain:

- JDK 17
- Gradle 8.2 / Android Gradle Plugin 8.2.1
- Android SDK 34
- Android NDK 25.1.8937393 (r25b)
- CMake 3.22.1
- PicoVR Android Native SDK v1.3.3 AAR

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

The release variant is unsigned unless a signing configuration is supplied.
Never install an unsigned APK. See [Pico SDK dependency](docs/PICO_SDK.md) and
[verification record](docs/VERIFICATION.md) for checksums and build evidence.

## Repository layout

- `patches/0001-...source-only.patch`: cumulative Pico G2 port patch against
  Wolvic `v1.6.2`
- `patches/0002-...surface-resize.patch`: Surface/projection ordering fix
- `build.ps1`: prerequisite checks, patch application and isolated build
- `docs/PICO_SDK.md`: SDK checksum and redistribution boundary
- `docs/VERIFICATION.md`: build and device evidence
- `docs/PICO_ALPHA.md`: private Alpha metadata and G2 delivery limitation

## Licensing and distribution

The patch and Wolvic-derived source files are provided under MPL-2.0.
Third-party components keep their own licenses.

The test APK contains third-party runtime components, including the legacy
PicoVR SDK. Downloading it does not grant permission to extract or redistribute
the SDK separately. Do not commit the Pico AAR, native SDK library, unpacked
SDK files, R8 mapping, signing keys or credentials to this repository.

## Project status

Build `0038` is the current device-tested candidate. Reports and patches are
published for reproducibility, but this remains a focused legacy-device port,
not an official Wolvic distribution or a promise of long-term website support.
