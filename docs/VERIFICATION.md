# Verification record

## Build

- JDK 17.0.16
- Gradle 8.2 / Android Gradle Plugin 8.2.1
- compileSdk/targetSdk 34, minSdk 24
- NDK 25.1.8937393, CMake 3.22.1
- Task: `:app:assemblePicovrArm64GeckoGenericRelease`
- Result: `BUILD SUCCESSFUL in 2m 46s`

Unsigned release output:

```text
Size:   115127435 bytes
SHA256: 365A03C21CCE06605BCC328DB822D7501B19DE8FD723C457BA54BA32338458B1
Package: com.igalia.wolvic.internal
ABI: arm64-v8a
```

`apksigner verify` returns `DOES NOT VERIFY`, as expected. The APK contains
`libPvr_NativeSDK.so`, `libnative-lib.so`, `libmozglue.so` and `libxul.so`.

## Device

On Pico G2 the debug build was verified to provide native immersive WebXR,
video playback, 3DoF head tracking and visible Three.js/canvas control icons.
The previously persistent right/bottom fullscreen clipping was fixed.

The compositor ran at 74-75 Hz and no Wolvic crash/ANR was observed in the
post-reboot regression. Repeated `com.baidu.input` crashes are a separate
device input-method issue.

## Remaining limits

- A brief aspect-ratio transition remains during fullscreen enter/exit.
- ADB 2D touch does not emulate Pico's VR controller ray, so final interaction
  checks require wearing the headset.
- A device media/codec resource failure was observed during long test cycles;
  a full device reboot restored both tested HLS playback paths. This is not
  claimed as an application-level permanent fix.
- The unsigned release APK has not been installed or device-tested.

## Signed internal-test build

A later release build was signed with a dedicated local release key and
accepted by the PICO developer console's signature check:

```text
Application ID: io.github.cyt258.wolvic.picog2
Version name:   1.6.2
Version code:   202230230
APK SHA256:     C4B45E0B9F5A918E2ADFB4B9426C498FBF0FCCB63874919AC05FCF3035A293B0
Signer SHA256:  BF5F5C2FCEC33738A6075C206872C22635963165B4089372FAEB3D4B9360BA54
Signature:      APK Signature Scheme v2
```

The final device-tested candidate is build `0038`:

```text
Application ID: io.github.cyt258.wolvic.picog2
Version name:   1.6.2
Version code:   202231824
APK SHA256:     1C5847CF21E65BE5CBCE780A06B36B119B588A0E887CEA1690B20575E220BAF1
Signer SHA256:  BF5F5C2FCEC33738A6075C206872C22635963165B4089372FAEB3D4B9360BA54
Signature:      APK Signature Scheme v2/v3
```

On the tested Pico G2, `0038` passed the unplayed-to-fullscreen path without
persistent right/bottom clipping, exit/re-enter fullscreen while playing, and
Pornhub immersive playback with 3DoF head tracking and visible controls.

The signed APK and R8 mapping are not committed to the source tree. Binary
distribution must retain third-party notices and comply with the Pico SDK
license applicable to the distributor.

The PICO console recognized the build as a 3DoF application for `PICO G2 4k`.
Only controller support is declared; hand tracking, body tracking, eye
tracking, facial expression, Avatar and mixed-reality features are not
claimed.
