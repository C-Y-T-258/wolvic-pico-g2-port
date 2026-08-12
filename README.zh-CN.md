# Pico G2 版 Wolvic（Gecko 128）

[English](README.md) | [简体中文](README.zh-CN.md)

这是一个面向 **Pico G2 / Pico G2 4K** 的非官方 Wolvic VR 浏览器移植版。
项目将 Wolvic 1.6.2、GeckoView 128 与 legacy 原生 PicoVR 后端组合起来，
为这款 3DoF Android VR 设备提供较新的 WebXR 浏览器。它可作为 Pico G2
上的 Firefox Reality 替代方案，主要解决 Firefox Reality 12.2 / Gecko 81
无法兼容部分现代 WebGL、WebXR 和 VR 视频网站的问题。

这不是 Igalia 或 PICO 官方产品。它使用旧版 PicoVR 原生运行时，不是当前
Wolvic 的 `picoxr` OpenXR 后端。

## 当前版本

`0052` 是当前完成实机验收的正式构建，源码补丁和签名 APK 已发布在 GitHub
prerelease：

**[下载 Wolvic Pico G2 0052 APK](https://github.com/C-Y-T-258/wolvic-pico-g2-port/releases/tag/picog2-1.6.2-0052)**

```text
文件：       Wolvic-1.6.2-gecko128-picog2-arm64-release-0052-production-signed.apk
包名：       io.github.cyt258.wolvic.picog2
版本：       1.6.2（versionCode 202242126）
架构：       arm64-v8a
SHA256：     CC1736358B02ABD98FE6AEF9E10A8203C1EA8B5BFA9B8BDAFB6157492AB929F3
```

它使用独立包名，因此可以和 Firefox Reality 共存。以后使用相同签名证书的
新版执行 `adb install -r`，通常会保留本应用的浏览数据。

## 设备兼容范围

| 项目 | 已测试/支持范围 |
| --- | --- |
| 头显 | Pico G2 / Pico G2 4K 系列 |
| 系统 | 实测设备为 Android 8.1 / API 27 |
| CPU | 仅 arm64-v8a |
| 追踪 | 3DoF 头部追踪 |
| 输入 | Pico 手柄射线和点击 |
| 浏览器引擎 | GeckoView 128 |
| XR 后端 | legacy 原生 PicoVR |
| OpenXR | 本构建不使用，也不依赖 OpenXR |

本项目没有在 Pico Neo、Pico 4、G3、Quest、普通 Android 手机或当前 OpenXR
运行时上验证。新款头显应优先使用 Wolvic 官方版本。

## 安装方式

### 在头显中直接下载安装

你也可以直接在 Pico G2 的浏览器中打开 Release 页面，下载 APK 后，从下载
列表、系统文件管理器或已安装的 APK/安装包管理器打开文件并确认安装。

系统可能会要求你允许该浏览器或安装包管理器“安装未知来源应用”。只有在你
信任下载来源并核对过 SHA256 后才应授予该权限。

### 在电脑下载后传输到头显内部安装

也可以先在电脑下载并校验 APK，再通过 USB/MTP、可信的文件传输工具或 ADB
把文件传到设备内部：

```powershell
adb push .\Wolvic-1.6.2-gecko128-picog2-arm64-release-0052-production-signed.apk /sdcard/Download/
```

随后在头显的“下载”目录中使用系统安装器或安装包管理器打开 APK。这条路径
使用 Android 设备内的安装程序，不要求执行 `adb install`。

### 使用 ADB 直接安装

1. 在你有权管理的 Pico G2 上启用开发者模式和 USB 调试。
2. 安装 Android Platform Tools，用 USB 连接头显。
3. 确认 ADB 能看到设备：

   ```powershell
   adb devices
   ```

4. 安装前核对下载文件：

   ```powershell
   Get-FileHash .\Wolvic-1.6.2-gecko128-picog2-arm64-release-0052-production-signed.apk -Algorithm SHA256
   ```

5. 安装或覆盖升级：

   ```powershell
   adb install -r .\Wolvic-1.6.2-gecko128-picog2-arm64-release-0052-production-signed.apk
   ```

6. 在头显应用列表打开 **Wolvic Pico G2 测试版**，按需授予浏览、媒体和
   手柄相关的 Android 权限。

如果电脑同时连接多台 ADB 设备，请在 `adb` 后加入 `-s 设备序列号`。

## 如何使用 WebXR 视频

> **Pornhub 及类似 VR 视频网站：请先开启 Wolvic 的“桌面模式”，然后刷新
> 页面，再进入沉浸播放。** 桌面模式是本项目在 Pico G2 上完成验证时使用的
> 前置条件。未开启时，网站可能返回移动版播放器、显示不同的控制界面，或者
> 只表现为可以随视角移动的 360 度视频窗口，而不是预期的沉浸观影。

1. 对 Pornhub 这类网站，先切换 Wolvic 桌面模式并刷新页面。
2. 打开扩展中的“VR 视频投影”，调出悬浮菜单。菜单提供网站自动、2D、3D
   左右/上下、360/360 立体和 180/180 立体左右/上下共九项选择。
3. 如果网站要求用户手势，先在普通网页中启动视频。
4. 在入口可用后进入网站提供的全屏或沉浸式 VR 播放。
5. 转动头部确认 3DoF 跟踪；使用 Pico 手柄射线调出并操作播放控件。
6. 请分别检查：普通网页播放、全屏比例、沉浸式 WebXR、头部跟踪、视频纹理
   和按钮图标。只成功进入沉浸模式并不等于视频兼容问题已经解决。

本构建已验证 XVideos 普通/全屏播放和 Pornhub VR 沉浸播放。这里仅记录
兼容性测试结果，不代表对相关服务的推荐，也不保证网站未来更新后仍兼容。

## 已验证功能

- PicoVR 原生显示、TimeWarp 和约 74-75 Hz compositor
- Pico G2 3DoF 头部跟踪和手柄输入
- 标准 immersive WebXR session
- GeckoView 128 的视频/WebGL 纹理渲染
- Pornhub VR 进入真实沉浸并播放视频
- Three.js/canvas 播放器控制图标可见
- Pornhub 页面可调出九项悬浮投影菜单
- XVideos 普通视频与全屏播放
- XVideos 播放中切换投影不白屏且可继续播放
- 未播放直接进入全屏时不再持续裁切右侧和下侧
- 播放中退出并重新进入全屏后画面正常

“能编译”或“能进入 WebXR”不是完整验证。必须在头显中同时确认播放、跟踪、
控制输入和纹理显示。

## 已知限制

- 进入或退出全屏时可能出现短暂的比例过渡帧；实测最终画面会恢复正常。
- 长时间反复进行媒体实验时，Pico G2 曾出现 codec/Surface 资源状态异常；
  完整重启头显可以恢复。这是恢复办法，不是已经确认的应用层永久修复。
- PICO 当前测试渠道的资源库分发要求从 Pico Neo3 开始，G2 无法依靠 PICO
  Library 接收 Alpha 构建，仍需在获得授权的前提下使用 ADB 侧载。
- 本构建只声明手柄支持，不声明手势、体感、眼动、表情、Avatar 或混合现实。
- 网站可以独立更新，未来行为可能变化。

## 故障排查

### 显示 `VR not found` 或无法进入沉浸模式

- 确认安装的是本项目的 Pico G2 APK，而不是普通 Android APK 或当前
  OpenXR 构建。
- 完整关闭再重开 Wolvic。如果媒体和 XR 状态仍异常，重启头显，先验证普通
  视频，再测试沉浸模式。
- 确认网站使用 HTTPS，并在用户点击后启用了 WebXR 入口。

### 网页能打开，但视频无法播放

- 先测试普通非沉浸视频，区分网页、网络、解码和 XR 问题。
- 单独检查 DNS、VPN 或代理，不要把联网失败误认为视频解码失败。
- 如果经过多轮媒体实验后多个网站都无法播放，完整重启 Pico G2。实测设备
  在重启后恢复了 codec/Surface 状态。

### 播放器图标黑屏或全屏持续裁切

- 检查 `io.github.cyt258.wolvic.picog2` 的 versionCode 是否为
  `202242126` 或更高。
- `0052` 包含已验证的 SVG/canvas 兼容层、投影菜单和正确的早期 Surface
  resize 顺序。

### 出现 `INSTALL_FAILED_UPDATE_INCOMPATIBLE`

设备上已有同包名但签名证书不同的应用。卸载会删除该应用的本地数据，请先
备份：

```powershell
adb uninstall io.github.cyt258.wolvic.picog2
adb install .\Wolvic-1.6.2-gecko128-picog2-arm64-release-0052-production-signed.apk
```

## 回滚

如果旧版使用相同签名，可以先尝试允许降级安装：

```powershell
adb install -r -d .\older-wolvic-picog2.apk
```

如果 Android 拒绝降级，只能卸载后重新安装；这会清除本包名下的浏览数据。
Firefox Reality 是另一个包，不会被这些命令删除。

## 这个移植修改了什么

- 在 Wolvic 1.6.2 上恢复 legacy `picovr` product flavor 和 Pico G2 原生
  device delegate。
- 使用 GeckoView 128，替代 Firefox Reality 使用的 Gecko 81。
- 增加 Pornhub 范围内的 SVG/canvas 控件兼容层和包含九项选择的悬浮投影菜单。
- 保留进入 VR 视频时的早期 Surface resize 顺序，只在未播放且确有需要时等待，
  同时修复持续裁切和切换投影白屏回归。

本项目没有重新实现 Pornhub 播放器，没有把网站资源打包进浏览器，也没有用
普通 OpenXR 后端冒充 Pico G2 兼容方案。

## 从源码构建

源码构建面向已经取得 PicoVR Android Native SDK v1.3.3 并接受其许可的
开发者。本仓库有意不包含该 SDK。

所需工具链：

- JDK 17
- Gradle 8.2 / Android Gradle Plugin 8.2.1
- Android SDK 34
- Android NDK 25.1.8937393（r25b）
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

如果没有提供签名配置，release 变体是未签名 APK，不要安装。SDK 校验值和
构建证据见 [Pico SDK 依赖说明](docs/PICO_SDK.md) 和
[验证记录](docs/VERIFICATION.md)。

## 仓库结构

- `patches/0001-...source-only.patch`：基于 Wolvic `v1.6.2` 的累计移植补丁
- `patches/0002-...surface-resize.patch`：Surface/投影时序修复
- `build.ps1`：前置条件检查、补丁应用和隔离构建
- `docs/PICO_SDK.md`：SDK 校验值和再分发边界
- `docs/VERIFICATION.md`：构建与实机证据
- `docs/PICO_ALPHA.md`：私有 Alpha 元数据和 G2 分发限制

## 许可与分发

补丁和 Wolvic 衍生源码采用 MPL-2.0；第三方组件继续适用各自许可。

APK 包含 legacy PicoVR SDK 等第三方运行时组件。下载 prerelease 不代表获得
提取或单独再分发 SDK 的许可。本仓库不发布独立 Pico AAR、原生 SDK 库、解包
文件、R8 mapping、签名密钥或凭据。

## 项目状态

`0052` 是当前经过实机验收的正式构建，三个源码补丁均已公开以便复现，但它仍
是面向旧设备的专项移植，不是 Wolvic 官方发行版，也不承诺长期兼容所有网站。
