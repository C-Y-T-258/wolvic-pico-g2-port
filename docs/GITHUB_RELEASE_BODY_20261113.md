# Wolvic for Pico G2 — 2026-11-13 Community Build

An unofficial Wolvic 1.6.2 / GeckoView 128 port for Pico G2 and G2 4K.
Native legacy PicoVR, arm64-v8a, 3DoF head tracking and controller input.
This remains a community prerelease, not an official Wolvic or PICO build.

## Changes since 0052

- General video tools and native projection handoff.
- Per-page Quest UA fallback and shared player-control compatibility fixes.
- Stable native choice-menu hover.
- Same-video codec discovery and safe switching through player/protocol APIs.
  Resolution-only alternatives do not create a codec menu. At least two
  confirmed playable codec families are required.
- State protection, result verification and recovery handling during switching.
- Cleaned app display name: **Wolvic Pico G2**.

The functional assets and native libraries are identical to the final
device-tested development baseline. This release APK changes the app label
and version metadata; it has static verification, not a separate headset
installation pass. The source extension suite has 435 passing tests.

## Download and install

- APK: `Wolvic-1.6.2-picog2-20261113-arm64-signed.apk`
- Package: `io.github.cyt258.wolvic.picog2.stage2epagequestua`
- Version: `1.6.2-picog2-20261113` (`203170001`)
- APK SHA256: `AFA8E6451E1E5F5871497729A161F7834606E6FE2612281A59B1F55C42A8B950`
- Source: `Wolvic-picog2-20261113-source.zip`

Verify the download with `SHA256SUMS.txt`. Use the headset package installer,
or `adb install -r` from a computer. This package updates the earlier test
candidate and coexists with 0052. It does not migrate 0052 browser data.

## Compatibility and fallback

Natural Eporner H.264/AV1 switching has real two-way device evidence.
Other adapters have different levels of natural-site, historical or controlled
test evidence; they are not universally verified across websites.
Audio/quality/VR combinations still have documented gaps. No codec is promised
to improve smoothness at all specifications.

Read the [coverage matrix](https://github.com/C-Y-T-258/wolvic-pico-g2-port/blob/main/docs/RELEASE_20261113.md),
[installation/rollback guide](https://github.com/C-Y-T-258/wolvic-pico-g2-port/blob/main/docs/INSTALL_ROLLBACK_20261113.md)
and [release audit](https://github.com/C-Y-T-258/wolvic-pico-g2-port/blob/main/docs/RELEASE_AUDIT_20261113.md).
The [0052 release](https://github.com/C-Y-T-258/wolvic-pico-g2-port/releases/tag/picog2-1.6.2-0052)
remains available as a separate fallback. Uninstalling a package erases its data.

## 中文

这是 Pico G2 / G2 4K 的非官方 Wolvic 社区预发布包。相对 0052 增加通用视频
工具、原生投影交接、单页 Quest UA、控件修复及基于播放器/协议的编码发现和
安全切换。只有同一视频至少两种确认可播放编码时才显示来源，清晰度差异不算
多编码；B站继续使用站内控制。

本包沿用旧测试包名，可覆盖测试候选，与 0052 并存，不迁移其数据。功能资源
及原生库与最终测试基线一致，仅清理名称和版本，新名称 APK 未单独实机安装。
不同适配路线的证据等级与缺口见覆盖表，不能视为所有网站或 VR 组合均通过。

Source patches are MPL-2.0; third-party components retain their own licenses.
The standalone Pico SDK, signing material and private logs are not distributed.
