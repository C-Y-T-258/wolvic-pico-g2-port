# PICO Alpha channel record

The signed internal-test build is registered in a private PICO Alpha channel.
This record documents platform metadata; it does not grant permission to
redistribute the APK.

```text
Application:    Wolvic Pico G2 test build
Package:        io.github.cyt258.wolvic.picog2
Version:        1.6.2 (202230230)
Platform:       3DoF
Target device:  PICO G2 4k
App type:       Android/mobile application
OpenXR claim:   No (the port uses legacy PicoVR)
Hardening:      Disabled
Features:       Controller support only
Signature test: Passed
```

English and Simplified Chinese application names, icons and version notes are
configured. No OBB or additional resource package is used.

One mainland-China PICO test account accepted the Alpha invitation. Account
identifiers are deliberately omitted from this repository.

PICO's current testing-channel documentation says Library-based delivery is
available on Pico Neo3 or newer devices with the required system components.
Pico G2 is outside that delivery matrix. Accepting the Alpha invitation is
useful for validating channel metadata, but it does not replace an authorized
local sideload on G2.
