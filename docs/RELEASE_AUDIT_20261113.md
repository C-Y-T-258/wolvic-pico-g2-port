# Release audit: 2026-11-13

The audit below records the local preparation of the 2026-11-13 build.
Publication was authorized on 2026-11-18 (Asia/Shanghai); source, documentation
and the [community prerelease](https://github.com/C-Y-T-258/wolvic-pico-g2-port/releases/tag/picog2-1.6.2-20261113)
are now public. Publication does not extend the device acceptance boundary.

The subsequent website/discovery preparation is documented separately in
[website review](WEBSITE_REVIEW.md) and
[publication handoff](PUBLICATION_CHECKLIST.md). The APK below is unchanged.

## APK

```text
File:       Wolvic-1.6.2-picog2-20261113-arm64-signed.apk
Label:      Wolvic Pico G2
Package:    io.github.cyt258.wolvic.picog2.stage2epagequestua
Version:    1.6.2-picog2-20261113
Code:       203170001
ABI:        arm64-v8a
SHA256:     AFA8E6451E1E5F5871497729A161F7834606E6FE2612281A59B1F55C42A8B950
Signer:     BF5F5C2FCEC33738A6075C206872C22635963165B4089372FAEB3D4B9360BA54
Schemes:    APK Signature Scheme v2/v3 verified
```

Built with JDK 17.0.16, Gradle 8.2 and the final functional asset snapshot.
Gradle result: `BUILD SUCCESSFUL in 10m 11s`, 27 tasks executed and 27 up to date.
This was one APK build, followed by signing and static verification.

Relative to the final tested baseline, the three manual configuration changes
are app label, version name and a fixed version code. Package ID is unchanged.
The baseline APK and 0052 APK are preserved.

All 2,614 APK entries were compared by case-sensitive path and uncompressed
SHA256. No entries were removed. Differences:

- AndroidManifest.xml and resources.arsc;
- classes2.dex, which contains generated build metadata;
- generated assets/dexopt/baseline.prof;
- META-INF signing records.

All functional assets and native libraries are identical to the final tested
baseline. All 28 published extension files match the APK byte for byte.
Generated baseline profiles are excluded from the functional asset comparison.
See [machine-readable APK comparison](release-20261113-apk-audit.json).

This is static release verification. The relabelled APK has not been installed
or accepted on a headset; historical device results belong to the functional
baseline and earlier candidates. See [the evidence matrix](RELEASE_20261113.md).

## Source

The four patches replayed in order onto a fresh archive of upstream Wolvic
`14f4e485d45238908c2c5528fd8eb3a3698b82e7`. All 1,367 resulting source files
were compared with the prepared release source: exact bytes for assets and
binary data, with CRLF/LF equivalence allowed for non-asset text.

The fourth patch includes native changes, Gecko bridge changes, extension
assets and 20 Node test files. A legacy, unused media-session background
script absent from the APK is removed from the source snapshot.

Old patch envelopes were normalized to LF to avoid Windows checkout breaking
binary patch headers. `.gitattributes` prevents rewriting patch bytes.
Patch application accepts whitespace differences in historical context.

The 435-test extension suite passed from the prepared source directory.
`verify-source.cjs` separately verifies the 28 extension hashes after replay.
See [source replay audit](release-20261113-source-audit.json).

```powershell
node .\verify-source.cjs D:\work\wolvic-v1.6.2
node --test D:\work\wolvic-v1.6.2\tools\tests\*.test.cjs
```

Use a fresh upstream checkout and the documented JDK 17 toolchain.
The replay checks source completeness, not byte-identical unsigned APK
reproducibility across machines. No second full Android build was performed
from the replay directory.

The public source package excludes the proprietary SDK AAR, unpacked native
SDK, signing material, local settings, generated build output and private logs.
The APK itself still contains its required third-party runtime components.

## 中文结论

正式候选已完成一次构建、签名和静态审计，功能资源及原生库与最终验收基线
一致；只清理名称、版本名和版本号，没有新增功能逻辑。四个公开补丁已从干净
上游重放，1367 个源码文件完成比对，28 个扩展文件与 APK 一致，435 项测试通过。

新名称 APK 尚未单独实机安装；旧包的验证范围和未验收边界原样保留。
源码与发布材料已于2026-11-18（北京时间）同步公开，0052回退版本保留；
公开发布不改变上述静态审计与实机验收的区别。
