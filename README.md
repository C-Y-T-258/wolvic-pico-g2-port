# Wolvic for Pico G2 (Gecko 128)

[English](README.md) | [简体中文](README.zh-CN.md)

An unofficial Wolvic VR browser port for **Pico G2 / Pico G2 4K**. It combines
Wolvic 1.6.2, GeckoView 128 and the legacy native PicoVR backend to provide an
updated WebXR browser for this 3DoF Android headset. It is useful as a
Firefox Reality alternative on Pico G2, especially for modern WebGL/WebXR video
sites that fail on Firefox Reality 12.2 / Gecko 81.

This is a community test build, not an Igalia or PICO product. It uses the old
PicoVR native runtime, not the current `picoxr` OpenXR backend.

## Current release

Build `0052` is the current device-tested production build. Its source patches
are published here. The APK is not attached to GitHub because this community
fork does not have documented permission to publicly redistribute the bundled
legacy PicoVR SDK runtime. Authorized testers can receive it through the
private PICO draft or a permitted local transfer.

```text
File:        Wolvic-1.6.2-gecko128-picog2-arm64-release-0052-production-signed.apk
Package:     io.github.cyt258.wolvic.picog2
Version:     1.6.2 (versionCode 202242126)
Architecture: arm64-v8a
SHA256:      CC1736358B02ABD98FE6AEF9E10A8203C1EA8B5BFA9B8BDAFB6157492AB929F3
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

## Installation options

### Install directly on the headset

You can try downloading the APK from the release page in a browser on the
Pico G2 itself. After the download finishes, open the APK from Downloads, the
system file manager or an installed APK/package manager and confirm the
installation.

The headset may ask you to allow installation from unknown sources for the
browser or package manager that opens the file. Only grant that permission if
you trust the downloaded APK and have verified its SHA256.

### Copy the APK to the headset, then install it

You can also download the APK on a computer, verify it there, and transfer it
to the headset's internal storage by USB/MTP, a trusted file-transfer tool, or
ADB:

```powershell
adb push .\Wolvic-1.6.2-gecko128-picog2-arm64-release-0052-production-signed.apk /sdcard/Download/
```

Then open the copied APK from the headset's Downloads folder with its package
manager. This uses Android's on-device installer; it does not require the
`adb install` command.

### Install directly with ADB

1. Enable developer/USB debugging on a Pico G2 that you are authorized to
   manage.
2. Install Android Platform Tools and connect the headset by USB.
3. Confirm that ADB sees the device:

   ```powershell
   adb devices
   ```

4. Verify the downloaded file before installing:

   ```powershell
   Get-FileHash .\Wolvic-1.6.2-gecko128-picog2-arm64-release-0052-production-signed.apk -Algorithm SHA256
   ```

5. Install or update the app:

   ```powershell
   adb install -r .\Wolvic-1.6.2-gecko128-picog2-arm64-release-0052-production-signed.apk
   ```

6. Launch **Wolvic Pico G2 Test Build** from the headset and grant the Android
   permissions needed for browsing, media and controller use.

For a specific device among multiple ADB targets, add `-s SERIAL` after `adb`.

## Using WebXR video

> **Pornhub and similar VR video sites:** enable Wolvic's **Desktop mode** and
> reload the page before entering immersive playback. Desktop mode is part of
> the verified Pico G2 path. Without it, the site may serve its mobile player,
> expose different controls, or behave like a movable 360-degree video window
> instead of the intended immersive presentation.

1. For Pornhub-like sites, switch Wolvic to Desktop mode and reload the page.
2. Open the browser extension entry named **VR 视频投影** to show the floating
   projection menu. Choose site automatic, 2D, 3D left/right, 3D top/bottom,
   360, 360 stereo, 180, 180 stereo left/right or 180 stereo top/bottom.
3. Start the video from the normal page first if the site requires a user
   gesture.
4. Use the website's fullscreen or immersive-VR entry when it becomes
   available.
5. Move your head to verify 3DoF tracking. Use the Pico controller ray to
   reveal and operate the player's controls.
6. Treat these as separate checks: page video playback, fullscreen layout,
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
- Pornhub-scoped floating menu with nine projection choices
- XVideos normal and fullscreen playback
- XVideos projection switching without a white screen or stalled resume
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

- Check that Android reports versionCode `202242126` or newer for
  `io.github.cyt258.wolvic.picog2`.
- Build 0052 contains the verified SVG/canvas compatibility layer, projection
  menu and corrected early Surface resize ordering.

### `INSTALL_FAILED_UPDATE_INCOMPATIBLE`

The installed package was signed with a different certificate. Back up data
before uninstalling it. Removing the package deletes that app's local data:

```powershell
adb uninstall io.github.cyt258.wolvic.picog2
adb install .\Wolvic-1.6.2-gecko128-picog2-arm64-release-0052-production-signed.apk
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
- Adds a Pornhub-scoped compatibility layer for SVG/canvas controls and a
  browser-action floating projection menu with nine choices.
- Preserves the early VR video resize call order while waiting only where an
  unplayed Surface actually needs it, fixing both persistent crop and the
  projection-switch white-screen regression.

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
git -C D:\work\wolvic-v1.6.2 config core.autocrlf false

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
- `patches/0003-...projection-menu.patch`: Pornhub compatibility and floating menu
- `build.ps1`: prerequisite checks, patch application and isolated build
- `docs/PICO_SDK.md`: SDK checksum and redistribution boundary
- `docs/VERIFICATION.md`: build and device evidence
- `docs/PICO_ALPHA.md`: private Alpha metadata and G2 delivery limitation

## Licensing and distribution

The patch and Wolvic-derived source files are provided under MPL-2.0.
Third-party components keep their own licenses.

The local test APK contains third-party runtime components, including the
legacy PicoVR SDK. This repository does not publish the 0052 APK or grant
permission to redistribute or extract that SDK. Do not commit the Pico AAR,
native SDK library, unpacked SDK files, R8 mapping, signing keys or credentials.

## Project status

Build `0052` is the current device-tested production build. Its three source
patches are published for reproducibility, but this remains a focused legacy-device port,
not an official Wolvic distribution or a promise of long-term website support.
