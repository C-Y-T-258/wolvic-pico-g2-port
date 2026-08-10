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
