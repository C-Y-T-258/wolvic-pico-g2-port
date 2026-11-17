# Install and rollback / 安装与回滚

This document concerns the candidate prepared on 2026-11-13, not the 0052 APK.
本文针对 2026-11-13 发布候选，不适用于 0052 包的覆盖升级。

| Item / 项目 | Candidate / 候选 |
| --- | --- |
| File / 文件 | `Wolvic-1.6.2-picog2-20261113-arm64-signed.apk` |
| Label / 名称 | Wolvic Pico G2 |
| Package / 包名 | `io.github.cyt258.wolvic.picog2.stage2epagequestua` |
| Version / 版本 | `1.6.2-picog2-20261113` |
| versionCode | `203170001` |
| ABI | arm64-v8a |

Verify the APK against the accompanying SHA256SUMS.txt before installing.
安装前用随包的 SHA256SUMS.txt 核对：

```powershell
Get-FileHash .\Wolvic-1.6.2-picog2-20261113-arm64-signed.apk -Algorithm SHA256
adb devices
adb install -r .\Wolvic-1.6.2-picog2-20261113-arm64-signed.apk
```

Alternatively, transfer the APK into the headset's Download folder and open it
with the Android package installer. Select the entry named **Wolvic Pico G2**.
也可把 APK 传入头显下载目录，用系统安装器安装，然后打开 **Wolvic Pico G2**。

The candidate uses the same signing certificate and package as the final test
baseline, so `-r` updates that package without an intentional data clear.
It does not replace package `io.github.cyt258.wolvic.picog2` (0052).
Firefox Reality is also a separate app. Browser data is not shared or
automatically migrated between these packages.

候选沿用最终测试基线的签名和包名，覆盖安装不主动清除数据。它不覆盖 0052，
也不覆盖 Firefox Reality；这几个应用的数据相互独立，不自动迁移。

## Rollback / 回滚

The safest fallback is to launch the retained 0052 app. Its APK and public
release remain unchanged. This does not remove or erase the candidate.
优先直接打开保留的 0052。旧包及公开下载不变，无需删除候选或清空数据。

For the same test package, the archived functional baseline is:
同测试包名的归档功能基线：

```text
Wolvic-stage2g-codec-completion-v2-signed.apk
versionCode: 203152159
SHA256: 94756694A5456D6E7F6B7FB759E6C93C74A2C7499E91C6D83B8921C7C1C4763F
```

Android may reject downgrading a non-debuggable release even with `-r -d`.
Do not assume a data-preserving downgrade will work. Uninstalling the test
package before reinstalling deletes its local browser data. Export needed
bookmarks and other data first; no automatic full-profile backup is provided.

Android 可能拒绝非调试 release 包降级，不能承诺 `-r -d` 保留数据回滚。
卸载测试包再装旧包会删除该包本地浏览数据，应先导出需要保留的书签等数据。
项目不提供自动完整配置备份或跨版本数据兼容保证。

If installation reports a signature mismatch, stop and check package/certificate
identity. Do not uninstall merely to bypass the error.
若提示签名不兼容，先核对包名和证书，不要为了绕过错误直接卸载。
