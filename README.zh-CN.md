# Wolvic Pico G2 移植版（Gecko 128）

[English](README.md) | [简体中文](README.zh-CN.md)

本仓库提供一套仅含源码的补丁，用于在 Pico G2 上运行 Wolvic 1.6.2
及其 legacy 原生 PicoVR 后端。这不是当前 Wolvic 的 `picoxr`/OpenXR
后端。

## 已验证范围

- 基线：Igalia/Wolvic `v1.6.2`（`14f4e485d45238908c2c5528fd8eb3a3698b82e7`）
- GeckoView：`128.0.20240609205151`，ExternalVR ABI 18
- 设备：Pico G2，Android 8.1/API 27，arm64-v8a
- 已在实机验证原生 PicoVR 显示、TimeWarp、3DoF 头部跟踪、手柄输入和
  immersive WebXR。
- 运行时兼容代码会补齐目标网站 Three.js canvas 控件所使用的 SVG
  intrinsic dimensions。
- 已修复全屏 Surface resize 竞态。进入或退出全屏时仍可能短暂出现比例
  过渡帧。

能够成功构建不等于所有 WebXR 网站或视频都能正常工作，仍需进行实机测试。

## 文件说明

- `patches/0001-...source-only.patch`：基于 `v1.6.2` 的 Pico G2 累计移植补丁
- `patches/0002-...surface-resize.patch`：等待 Surface resize 完成后再创建
  VR 视频投影
- `build.ps1`：检查依赖、暂存本地 Pico SDK AAR、依次应用补丁并构建
- `docs/PICO_SDK.md`：SDK 校验值和再分发边界
- `docs/VERIFICATION.md`：构建/实机验证结果和已知限制
- `docs/PICO_ALPHA.md`：内部测试元数据和 Pico G2 分发限制

## 构建

请自行取得 PicoVR Android Native SDK v1.3.3 AAR，并阅读和接受 Pico
许可条款。本仓库有意不包含该 SDK。

```powershell
git clone --branch v1.6.2 --recurse-submodules https://github.com/Igalia/wolvic.git D:\work\wolvic-v1.6.2

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

除非向上游项目提供签名配置，否则 release 变体是未签名 APK。不要安装
未签名 APK。debug 变体使用 Android 的常规 debug 签名行为。

## 发布边界

未获得 Pico 单独许可前，不要提交或附加以下文件：

- `PvrSDK-Native-release.aar`
- `libPvr_NativeSDK.so`
- 解包后的 SDK classes 或头文件
- 在发行条款尚未审查时，内嵌 SDK 的 APK

本仓库的补丁和 Wolvic 衍生源码采用 MPL-2.0；第三方组件继续适用各自的
许可条款。

## 当前发布状态

单独签名的 `1.6.2` 构建已通过 PICO APK 签名测试，并登记在仅面向
`PICO G2 4k` 的私有 Alpha 渠道。经过实机验证的 `0038` APK 已作为明确
标注的非官方 GitHub prerelease 提供。

该 APK 包含 legacy Pico runtime。下载 APK 不代表获得提取或单独再分发
SDK 的许可。PICO 当前测试渠道文档只支持 Pico Neo3 及更新设备通过资源库
接收测试应用，因此已测试的 G2 仍需在获得授权的前提下本地侧载。
