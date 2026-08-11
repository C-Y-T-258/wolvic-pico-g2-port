# Pico SDK dependency

The tested dependency is PicoVR Android Native SDK v1.3.3 (2020-07-23):

```text
File:   PvrSDK-Native-release.aar
SHA256: D3CF54F0A3A20033DACB49B91F14376DB32E8B2B9F5CCA5E8EA72E37892BD53C
```

The AAR contains `arm64-v8a/libPvr_NativeSDK.so` and
`armeabi-v7a/libPvr_NativeSDK.so`. Only arm64-v8a is packaged by this build.

Pico's SDK license permits SDK use for authorized applications but says that
SDK copies may not be distributed or published for others to copy. For that
reason this repository contains only integration source and a checksum. A
developer must obtain the SDK independently, review/accept its license and pass
the local AAR path to `build.ps1`.

The v1.3.3 mirror used during research was commit
`418d31425e3873749bbd6a7cb97641635df6e398` of
`lovr-org/pico_native_sdk`. This identifies the audited source; it is not an
instruction to republish the SDK.

## GitHub binary precedents

Igalia's official Wolvic releases publish complete APKs, including PicoXR
variants such as `Wolvic-picoxr-arm64-gecko-generic-release.apk`. A third-party
fork, `LearnHub/wolvic`, has also published a custom device build as an APK.
These examples establish that GitHub Releases can host Wolvic binaries; they do
not establish that an unrelated distributor has rights to every bundled vendor
SDK. Igalia may have vendor agreements that do not transfer to forks, and a
third party's upload is not a license grant.

This repository's `0038` APK is therefore labeled as an unofficial prerelease.
It does not include the standalone Pico AAR, headers, mapping file, signing key
or build logs. Users must have authorization to use the legacy Pico runtime,
and must not extract or redistribute the SDK separately.
