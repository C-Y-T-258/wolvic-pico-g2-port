# Verification record

## Reproducible source boundary

The public source release is based on Wolvic `v1.6.2`, commit
`14f4e485d45238908c2c5528fd8eb3a3698b82e7`. Apply the three patches in numeric
order. The final extension assets must hash to:

```text
background.js  32F49BE066BA88CACA3253ACAB4A8C624258AB345EAB27286017B18F3D9EE47C
main.js        04F15F8ED5C96B0174A1835908E03CE627FEC67C306B04165F316E6EEEA5F7AC
manifest.json  262AFD08A6B0A423841887B03A589C35BCB93E4631C594CC5DB588A7070A5FAC
```

The patch replay was checked on a clean detached checkout of that commit. The
legacy Pico SDK is deliberately not part of the public source tree.

## Production build 0052

- JDK 17.0.16
- Gradle 8.2 / Android Gradle Plugin 8.2.1
- compileSdk/targetSdk 34, minSdk 24
- NDK 25.1.8937393, CMake 3.22.1
- Task: `:app:assemblePicovrArm64GeckoGenericRelease`
- R8, resource shrinking and resource optimization executed
- Result: `BUILD SUCCESSFUL in 5m 26s`

```text
File:            Wolvic-1.6.2-gecko128-picog2-arm64-release-0052-production-signed.apk
Application ID:  io.github.cyt258.wolvic.picog2
Version name:    1.6.2
Version code:    202242126
ABI:             arm64-v8a only
APK SHA256:      CC1736358B02ABD98FE6AEF9E10A8203C1EA8B5BFA9B8BDAFB6157492AB929F3
Signer SHA256:   BF5F5C2FCEC33738A6075C206872C22635963165B4089372FAEB3D4B9360BA54
Signature:       APK Signature Scheme v2/v3
```

Static inspection confirmed `libPvr_NativeSDK.so`, `libnative-lib.so` and
`libxul.so`. The three extension files inside the signed APK match the hashes
above byte for byte. The signed APK is attached to the unofficial 0052 GitHub
prerelease. The R8 mapping, standalone SDK and signing materials are not
committed or published.

## Pico G2 acceptance

The package was installed in place on device `PA7510MGCB120425W`. Its original
install time was preserved, confirming an upgrade rather than a data-clearing
reinstall. Cold start succeeded, the built-in extension registered and no
Wolvic fatal crash or ANR was found in the startup log.

The following headset-visible regression groups passed:

- extension entry and the complete nine-choice Pornhub projection menu;
- Pornhub regular playback, original player interaction and Desktop-mode
  immersive playback;
- XVideos projection switching without white screen or stalled resume;
- direct fullscreen/immersive entry before playback without persistent crop.

This validates the tested Pico G2 paths, not every VR website, codec or future
website revision. A short aspect-ratio transition may still appear while
entering or leaving fullscreen before the final layout settles.

## Installation note

The first upgrade attempt failed with `INSTALL_FAILED_INSUFFICIENT_STORAGE`
when `/data` had about 1 GB free. Android cache trimming raised free space to
about 2 GB, after which `adb install -r` succeeded without clearing browser
data. Downgrading a non-debuggable release is not reliably supported; a full
uninstall/reinstall rollback erases this package's local data.
