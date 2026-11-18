const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const outputOption = process.argv.indexOf('--output');
const site = outputOption >= 0 ? path.resolve(process.argv[outputOption + 1]) : path.join(root, 'site');
const publishedCandidate = process.argv.includes('--published-candidate');
const repo = 'https://github.com/C-Y-T-258/wolvic-pico-g2-port';
const base = 'https://c-y-t-258.github.io/wolvic-pico-g2-port/';
const indexNow = JSON.parse(fs.readFileSync(path.join(__dirname, 'indexnow.json'), 'utf8'));
if (!/^[a-zA-Z0-9-]{8,128}$/.test(indexNow.key) ||
    indexNow.keyLocation !== `${base}${indexNow.key}.txt`) {
  throw new Error('IndexNow ownership file must stay within the project website.');
}
const tag = publishedCandidate ? 'picog2-1.6.2-20261113' : 'picog2-1.6.2-0052';
const release = `${repo}/releases/tag/${tag}`;
const file = publishedCandidate ? 'Wolvic-1.6.2-picog2-20261113-arm64-signed.apk'
  : 'Wolvic-1.6.2-gecko128-picog2-arm64-release-0052-production-signed.apk';
const apk = `${repo}/releases/download/${tag}/${file}`;
const hash = publishedCandidate ? 'AFA8E6451E1E5F5871497729A161F7834606E6FE2612281A59B1F55C42A8B950'
  : 'CC1736358B02ABD98FE6AEF9E10A8203C1EA8B5BFA9B8BDAFB6157492AB929F3';
const doc = name => `${repo}/blob/main/docs/${name}`;
const copy = {
  zh: {
    lang: 'zh-CN', title: 'Pico G2 浏览器 Wolvic | G2 4K / Firefox Reality 替代方案',
    description: 'Pico G2 / G2 4K 的非官方 Wolvic 浏览器，Firefox Reality 社区替代方案。GeckoView 128、原生 PicoVR、WebXR、视频投影交接与编码选择。下载 APK，查看适配成果、安装和验证范围。',
    skip: '跳到正文', nav: ['适配成果', '下载', '安装', 'English'],
    eyebrow: 'Pico G2 / G2 4K · 社区移植',
    intro: '给 Pico G2 一个较新的网页与 VR 视频入口。基于 Wolvic 1.6.2、GeckoView 128 和原生 PicoVR。',
    heroNote: 'Pico G2 历史实机画面 · 单眼裁切 · 非最终候选截图',
    specs: [['GeckoView 128', '浏览器引擎'], ['原生 PicoVR', 'legacy 运行时'], ['3DoF', '头部追踪与手柄'], ['arm64-v8a', '实测 Android 8.1']],
    resultTitle: '为这款旧头显做了什么',
    resultIntro: '从原生显示、视频交接到网站控件，围绕 Pico G2 的实际使用路径做适配。项目独立于 Wolvic 和 PICO 官方。',
    features: [
      ['原生显示与 WebXR', '恢复 legacy PicoVR 后端，接入 GeckoView 128，保留 G2 的头部追踪和手柄输入。已有普通网页、视频纹理与沉浸 WebXR 的历史实机记录。'],
      ['视频投影与网页交接', '原生 2D、180°、360° 和立体投影，修复早期画面裁切与投影切换白屏。后续候选加入通用视频交接、单页 Quest UA 和共享播放器控件修复。'],
      ['有证据的编码选择', '新候选按播放器和协议识别同内容编码，区分编码与清晰度。至少两种编码确认可播放时才显示来源；切换验证、状态保护与失败恢复同时纳入。']
    ],
    download: '下载与版本', published: '已发布 · 历史实机验收', downloadButton: '下载 0052 APK',
    releaseLink: 'Release 与源码', releaseCopy: '0052 是目前公开下载版本。它包含 Pico G2 原生后端、WebXR 视频兼容和早期投影修复，不包含后续完整编码工具。',
    releaseMeta: '约 110 MiB · arm64-v8a · 非官方预发布',
    pending: '新候选 · 尚未公开发布', candidate: '2026-11-13 候选',
    candidateCopy: '新增通用视频工具、编码切换、单页 UA 与控件修复。发布标识清理已完成；新名称 APK 尚未单独实机安装。',
    packageNote: '候选沿用旧测试包名，与 0052 并存。两者不共享或自动迁移浏览数据。',
    notes: '候选说明与证据', coverage: '验证到了哪里',
    coverageIntro: '下面区分已发布版本、后续候选与受控测试。播放器适配代码存在，不等于所有网站都可切换编码。',
    headers: ['路线', '已有证据', '边界'],
    rows: [
      ['PicoVR / WebXR', '0052 有头显播放、追踪、控制输入与纹理验收记录。', '仅 Pico G2 系列范围；不是当前 OpenXR 构建。'],
      ['视频交接与投影', 'Hamezo 等路径有历史原生交接与用户回归；后续候选保留实现。', '网页全屏、原生投影与网站 VR 分别处理；不承诺所有特殊投影模型。'],
      ['Video.js / VHS', 'Eporner 自然网页 H.264 / AV1 双向切换。', '有一次清单超时记录；不能外推成所有视频均成功或播放性能提升。'],
      ['xPlayer', 'xHamster 历史自然双编码与质量模式验证。', '最终 APK 未逐项重跑；视频本身需提供双编码。'],
      ['HTML / hls.js / dash.js', '受控设备播放器、状态和失败恢复测试。', '不等于任意自然网站双编码已验证。'],
      ['Shaka / MGP / Delight', '有受控切换与自然页面绑定、发现等不同层次证据。', '真实双编码、音轨、质量映射及 VR 组合仍各有缺口。'],
      ['B站 / 普通网页', '保持站内控制；已有普通使用回归反馈。', '最终一轮未完成所有质量与 VR 组合验收。']
    ],
    matrixLink: '查看完整覆盖表和已知限制',
    install: '安装到 Pico G2', installLead: '使用头显系统安装器，或从电脑通过 ADB 安装。下载后先核对 SHA256。',
    steps: [
      ['下载并核对 APK', '在头显浏览器下载，或从电脑传到头显的 Download 目录。'],
      ['打开系统安装器', '按系统提示允许安装来源，也可使用 ADB 命令从电脑安装。'],
      ['启动并测试普通网页', '0052 在应用列表显示为 Wolvic Pico G2 测试版。先确认普通网页和视频，再尝试网站沉浸入口。']
    ],
    installNote: '版本提示：下面命令安装公开的 0052。新候选使用独立测试包名，安装与回滚细节单独说明。',
    installGuide: '0052 完整安装与回滚说明', checksum: '0052 APK · SHA256',
    gallery: '在头显里运行', galleryCaption: '历史 0037 构建的 Pico G2 启动页实机截图，仅作移植运行展示，不代表新版界面或站点兼容验收。原始画面保留双眼布局与 G2 截屏的色彩特征。',
    faq: '下载前常见问题',
    questions: [
      ['这是 Pico G2 的 Firefox Reality 替代浏览器吗？', '可以作为一个社区替代方案。它使用 Wolvic 1.6.2 与 GeckoView 128，为旧 Pico G2 提供较新的网页引擎，但不保证每个现代网站或流媒体服务兼容。'],
      ['Pico 4、Neo、G3 或 Quest 能装吗？', '这个移植针对 Pico G2 / G2 4K 系列。实际测试设备为 Android 8.1 的 G2，只有 arm64 构建。其他设备未验证，新头显应优先使用官方适配。'],
      ['为什么有时没有媒体来源菜单？', '来源选择是新候选功能，0052 没有完整实现。候选只在同一视频至少两种真实、可播放编码确认后显示。单编码、只有分辨率差异、身份不明或设备不支持时隐藏。'],
      ['能保证 H.264 或 AV1 播放更流畅吗？', '不能。网站、网络、分辨率、码率和设备解码能力都会影响体验。当前记录证明部分路径可以切换，不构成同规格流畅度对比。'],
      ['遇到黑屏或视频无法播放怎么办？', '先区分网络与解码问题，再测试普通视频。历史媒体资源异常曾通过完整重启头显恢复；这不是应用已永久修复资源问题的保证。'],
      ['这是 Wolvic 或 PICO 官方产品吗？', '不是。这是社区旧设备移植，采用 legacy PicoVR，而非当前 picoxr OpenXR 后端。源码沿用 MPL-2.0，第三方组件保留各自许可。']
    ],
    footer: '非官方社区移植。Wolvic 及相关标识属于各自权利人。验证范围以项目记录为准，网站变化可能影响兼容性。',
    source: '源代码', feedback: '反馈问题', evidence: '验证记录'
  },
  en: {
    lang: 'en', title: 'Wolvic for Pico G2 | G2 4K Browser / Firefox Reality Alternative',
    description: 'An unofficial Pico G2 / G2 4K browser and community Firefox Reality alternative. GeckoView 128, native PicoVR, WebXR, video handoff and codec selection. Download the APK and review installation, changes and tested scope.',
    skip: 'Skip to content', nav: ['The port', 'Download', 'Install', '简体中文'],
    eyebrow: 'Pico G2 / G2 4K · Community port',
    intro: 'A newer web and VR video entry point for Pico G2. Built on Wolvic 1.6.2, GeckoView 128 and native PicoVR.',
    heroNote: 'Historical Pico G2 capture · single-eye crop · not the final candidate',
    specs: [['GeckoView 128', 'Browser engine'], ['Native PicoVR', 'Legacy runtime'], ['3DoF', 'Head tracking and controller'], ['arm64-v8a', 'Tested on Android 8.1']],
    resultTitle: 'A browser port for this headset',
    resultIntro: 'Native display, video handoff and player controls adapted around real Pico G2 workflows. An independent community project, unaffiliated with Wolvic or PICO.',
    features: [
      ['Native display and WebXR', 'Restores the legacy PicoVR backend with GeckoView 128, G2 head tracking and controller input. Historical device records cover browsing, video textures and immersive WebXR.'],
      ['Video projection and handoff', 'Native 2D, 180°, 360° and stereo projection, with early crop and projection white-screen fixes. Later candidates add general video handoff, per-page Quest UA and shared player-control fixes.'],
      ['Evidence-based codec selection', 'The new candidate discovers same-content codecs through player and protocol APIs. It separates codec from resolution, shows only confirmed playable alternatives and verifies switches with state protection and recovery.']
    ],
    download: 'Download and versions', published: 'Published · historical device acceptance', downloadButton: 'Download 0052 APK',
    releaseLink: 'Release and source', releaseCopy: '0052 is the publicly available build. It includes the Pico G2 native backend, WebXR video compatibility and early projection fixes, without the later complete codec tools.',
    releaseMeta: 'About 110 MiB · arm64-v8a · unofficial prerelease',
    pending: 'New candidate · not yet published', candidate: '2026-11-13 candidate',
    candidateCopy: 'Adds general video tools, codec switching, per-page UA and player fixes. Release metadata cleanup is complete; the relabelled APK has not had a separate headset installation.',
    packageNote: 'The candidate retains the test package ID and coexists with 0052. Browser data is not shared or automatically migrated.',
    notes: 'Candidate notes and evidence', coverage: 'What has been verified',
    coverageIntro: 'Published builds, later candidates and controlled tests have different evidence. An implemented adapter is not proof of codec switching on every website.',
    headers: ['Path', 'Evidence', 'Boundary'],
    rows: [
      ['PicoVR / WebXR', '0052 device acceptance for playback, tracking, controls and textures.', 'Pico G2 family scope; not a current OpenXR build.'],
      ['Handoff / projection', 'Historical native handoff on paths such as Hamezo, plus user regression checks.', 'Page fullscreen, native projection and site VR stay distinct; special projection models are not universally supported.'],
      ['Video.js / VHS', 'Natural Eporner H.264 / AV1 switching in both directions.', 'A manifest timeout is recorded; no universal success or performance claim.'],
      ['xPlayer', 'Historical natural xHamster dual-codec and quality-mode checks.', 'Not fully rerun in the final APK; the video must actually offer two codecs.'],
      ['HTML / hls.js / dash.js', 'Controlled device player, state and recovery tests.', 'Not proof of natural dual-codec support on arbitrary websites.'],
      ['Shaka / MGP / Delight', 'Controlled switching and varying natural binding or discovery evidence.', 'Natural dual codecs, audio, quality mapping and VR combinations still have specific gaps.'],
      ['Bilibili / ordinary pages', 'Site controls retained; historical ordinary-use regression feedback.', 'The last round did not verify every quality and VR combination.']
    ],
    matrixLink: 'Full evidence matrix and known limits',
    install: 'Install on Pico G2', installLead: 'Use the headset package installer or ADB from your computer. Verify the downloaded APK with SHA256 first.',
    steps: [
      ['Download and verify', 'Download on the headset, or transfer the APK from your computer into its Download folder.'],
      ['Open the Android installer', 'Allow the installation source when prompted. ADB users can use the commands alongside.'],
      ['Launch and browse', '0052 appears as Wolvic Pico G2 Test Build. Check ordinary browsing and playback before a site immersive entry.']
    ],
    installNote: 'These commands install the public 0052 APK. The new candidate has a separate test package; its upgrade and rollback instructions are documented separately.',
    installGuide: '0052 installation and rollback guide', checksum: '0052 APK · SHA256',
    gallery: 'Running on the headset', galleryCaption: 'Historical build 0037 on a Pico G2 home page. This demonstrates the running port, not the new candidate UI or a site compatibility result. The original stereo layout and G2 capture color characteristics are retained.',
    faq: 'Before you download',
    questions: [
      ['Is this a Firefox Reality alternative for Pico G2?', 'It is a community alternative based on Wolvic 1.6.2 and GeckoView 128. It brings a newer web engine to Pico G2, without promising compatibility with every modern website or streaming service.'],
      ['Can I use it on Pico 4, Neo, G3 or Quest?', 'This port targets the Pico G2 / G2 4K family. The tested device is a G2 running Android 8.1; builds are arm64 only. Other headsets are unverified and should use their officially supported browser.'],
      ['Why might the media-source menu be absent?', 'Codec selection belongs to the new candidate, not the complete 0052 feature set. It requires at least two verified playable codecs for the same content. Single codecs, resolution-only choices, unknown identity or unsupported playback stay hidden.'],
      ['Will H.264 or AV1 necessarily play more smoothly?', 'No. Network, bitrate, resolution, player and device decoding support all affect playback. The recorded tests demonstrate switching on specific paths, not a controlled same-spec performance comparison.'],
      ['What if video stops or the display goes black?', 'Separate network failures from decoding problems and test ordinary video first. A full headset reboot recovered a historical codec/Surface resource failure; that is a recovery method, not a proven permanent fix.'],
      ['Is this an official Wolvic or PICO product?', 'No. This is a community legacy-device port using native PicoVR rather than the current picoxr OpenXR backend. Derived source is MPL-2.0; third-party components retain their own licenses.']
    ],
    footer: 'Unofficial community port. Wolvic and related marks belong to their respective owners. Compatibility claims follow recorded evidence; websites can change independently.',
    source: 'Source code', feedback: 'Report an issue', evidence: 'Verification'
  }
};
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
if (publishedCandidate) {
  Object.assign(copy.zh, {
    heroNote: 'Pico G2 历史实机画面 · 单眼裁切 · 非当前版界面',
    features: [
      ['原生 PicoVR 与 WebXR', '在 Wolvic 1.6.2 上恢复 G2 的 legacy PicoVR 后端，接入 GeckoView 128。保留 3DoF 头部追踪和手柄，已有普通网页、视频纹理及沉浸 WebXR 实机记录。'],
      ['视频裁切与投影白屏', '调整视频 Surface 尺寸更新和等待顺序，修复进入全屏后的持续裁切、投影切换白屏。提供原生 2D、180°、360° 和立体投影；特殊投影模型另有边界。'],
      ['Hamezo 网页到原生交接', '通用视频工具按媒体与渲染器归属交接，避免把整个网页放大成视频。Hamezo 的 Video.js VR 路径已有历史实机验收；原生接管后，网站 VR 按钮可能需要刷新恢复。'],
      ['当前页 Quest UA 回退', '部分网站非桌面模式不提供可用沉浸入口时，可对当前页使用 Quest/Oculus UA 并重新加载。离开后恢复原 UA；Pornhub / YouPorn 有历史实机记录，不承诺所有网站通用。'],
      ['沉浸控件与悬停修复', '共享 MGP SVG / CanvasTexture 兼容层处理黑色图标，补足 YouPorn 的 VR 激活判据；共用原生选择控件修复单行悬停闪烁。这些修复已有用户验收记录。'],
      ['同视频真实多编码选择', '按播放器和协议发现来源，至少两种确认可播放、可切换的编码族才显示菜单。Eporner H.264 / AV1 有自然网页双向证据；清晰度差异不算编码，失败恢复及其他路线限制均明确列出。']
    ],
    coverageIntro: '当前版保留历史实机成果，编码部分区分最终功能基线、历史自然网页与受控测试。新名称 APK 的功能资源已核对一致，但未单独重做头显安装验收；播放器适配器存在不等于所有网站都可切换。',
    published: '新发布 · 功能基线实测 / 发布包静态核对', downloadButton: '下载新版 APK',
    releaseCopy: '2026-11-13 构建：通用视频工具、原生投影交接、编码选择、单页 UA 和控件修复。功能资源与最终测试基线一致，新名称 APK 尚未单独实机安装。',
    pending: '保留下载 · 旧版回退', candidate: 'Wolvic 1.6.2 / 0052',
    candidateCopy: '0052 是历史实机验收版本，包含原生后端与早期投影修复，不含后续完整编码工具。',
    packageNote: '新版本沿用测试包名，与 0052 并存，不共享或自动迁移浏览数据。',
    notes: '下载 0052 回退版本',
    installNote: '这些命令安装新版，覆盖同包名测试候选。0052 包名不同，可保留并存；卸载任一应用会删除其本地数据。',
    installGuide: '新版安装与回滚说明', checksum: '新版 APK · SHA256'
  });
  copy.zh.steps[2][1] = '在应用列表打开 Wolvic Pico G2。先确认普通网页和视频，再尝试网站沉浸入口。';
  copy.zh.rows[1][1] = 'Hamezo 等路径有历史原生交接与用户回归；当前版保留实现。';
  copy.zh.questions[2][1] = '来源选择要求同一视频至少两种真实、可播放编码得到确认。单编码、只有分辨率差异、身份不明或设备不支持时隐藏。旧版 0052 没有完整编码工具。';
  copy.zh.questions.splice(2, 0, ['如何选择网页 VR 和原生视频投影？', '先在普通网页启动视频。网站 VR 入口使用网页自己的沉浸播放器；浏览器扩展里的“VR 视频工具”用于原生投影或当前页 UA。网页全屏、网站 VR、原生投影分别处理，扩展在普通网页界面操作。原生接管部分渲染器后，网站 VR 按钮可能需要刷新恢复。']);
  Object.assign(copy.en, {
    heroNote: 'Historical Pico G2 capture · single-eye crop · not the current release UI',
    galleryCaption: 'Historical build 0037 on a Pico G2 home page. This demonstrates the running port, not the current release UI or a site compatibility result. The original stereo layout and G2 capture color characteristics are retained.',
    features: [
      ['Native PicoVR and WebXR', 'Restores the G2 legacy PicoVR backend on Wolvic 1.6.2 with GeckoView 128. Preserves 3DoF tracking and controller input, with historical device records for browsing, video textures and immersive WebXR.'],
      ['Video crop and projection fixes', 'Corrects video Surface sizing and wait order to address persistent fullscreen cropping and projection-switch white screens. Native 2D, 180°, 360° and stereo modes are available; special projection models have separate limits.'],
      ['Hamezo native video handoff', 'General video tools hand off the media and its renderer instead of enlarging the entire page. The Hamezo Video.js VR path has historical device acceptance. After native takeover, a reload may be needed to restore the site VR button.'],
      ['Per-page Quest UA fallback', 'If a non-desktop site does not offer a usable immersive entry, apply Quest/Oculus UA to the current page and reload. The previous UA returns after leaving. Historical checks cover Pornhub / YouPorn, not every website.'],
      ['Immersive controls and hover', 'A shared MGP SVG / CanvasTexture layer addresses black icons and adds the YouPorn VR activation condition. The shared native choice widget also fixes single-row hover flicker. User acceptance records cover these fixes.'],
      ['Real same-video codec choices', 'Player and protocol discovery shows the menu only for at least two confirmed playable, switchable codec families. Natural Eporner H.264 / AV1 switching passed in both directions. Resolution is not a codec; recovery and other adapter limits remain documented.']
    ],
    coverageIntro: 'The current release retains historical device work. Codec evidence distinguishes the final functional baseline, historical natural pages and controlled tests. Functional assets match, but the relabelled APK has not had separate headset installation acceptance. An adapter is not proof of support on every website.',
    published: 'New release · tested baseline / static APK audit', downloadButton: 'Download new APK',
    releaseCopy: 'The 2026-11-13 build adds general video tools, native handoff, codec selection, per-page UA and player fixes. Functional assets match the final tested baseline; the relabelled APK has not had a separate headset installation.',
    pending: 'Still available · older fallback', candidate: 'Wolvic 1.6.2 / 0052',
    candidateCopy: '0052 has historical device acceptance for the native backend and early projection fixes, without the later complete codec tools.',
    packageNote: 'The new build retains the test package ID and coexists with 0052, without sharing or automatically migrating browser data.',
    notes: 'Download the 0052 fallback',
    installNote: 'These commands install the new build over the same test package. 0052 has a different package ID and can coexist. Uninstalling either app deletes its own data.',
    installGuide: 'New-build installation and rollback', checksum: 'New APK · SHA256'
  });
  copy.en.steps[2][1] = 'Open Wolvic Pico G2. Check ordinary browsing and playback before a site immersive entry.';
  copy.en.questions[2][1] = 'Codec selection requires at least two verified playable codecs for the same content. Single codecs, resolution-only choices, unknown identity or unsupported playback stay hidden. The older 0052 build does not include the complete codec tools.';
  copy.en.questions.splice(2, 0, ['How do site VR and native projection differ?', 'Start playback on the ordinary page first. The site VR entry uses its own immersive player; the browser extension named “VR 视频工具” provides native projection and per-page UA. Page fullscreen, site VR and native projection are distinct paths. Operate the extension from the ordinary page. Native takeover of some renderers may require a reload before site VR works again.']);
}
function render(locale) {
  const t = copy[locale], en = locale === 'en', prefix = en ? '../' : './';
  const canonical = base + (en ? 'en/' : '');
  const schema = {
    '@context': 'https://schema.org', '@type': 'SoftwareApplication',
    name: 'Wolvic for Pico G2', alternateName: ['Pico G2 Wolvic browser', 'Pico G2 浏览器'],
    applicationCategory: 'BrowserApplication', operatingSystem: 'Android (Pico G2, arm64-v8a)',
    description: t.description, url: canonical, image: `${base}assets/wolvic-icon.png`,
    inLanguage: t.lang, sameAs: repo, mainEntityOfPage: canonical,
    softwareVersion: publishedCandidate ? '1.6.2-picog2-20261113' : '1.6.2 / 0052', downloadUrl: apk,
    author: { '@type': 'Person', name: 'C-Y-T-258', url: 'https://github.com/C-Y-T-258' },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    license: `${repo}/blob/main/LICENSE`, isBasedOn: 'https://github.com/Igalia/wolvic'
  };
  return `<!doctype html>
<html lang="${t.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(t.title)}</title>
  <meta name="description" content="${escape(t.description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  <link rel="sitemap" type="application/xml" href="${base}sitemap.xml">
  <link rel="alternate" hreflang="zh-CN" href="${base}">
  <link rel="alternate" hreflang="en" href="${base}en/">
  <link rel="alternate" hreflang="x-default" href="${base}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Wolvic for Pico G2">
  <meta property="og:title" content="${escape(t.title)}">
  <meta property="og:description" content="${escape(t.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${en ? 'en_US' : 'zh_CN'}">
  <meta property="og:image" content="${base}assets/social-preview.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Wolvic for Pico G2 — GeckoView 128 / native PicoVR">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escape(t.title)}">
  <meta name="twitter:description" content="${escape(t.description)}">
  <meta name="twitter:image" content="${base}assets/social-preview.png">
  <meta name="theme-color" content="#075b48">
  <link rel="icon" href="${prefix}assets/wolvic-icon.png" type="image/png">
  <link rel="stylesheet" href="${prefix}assets/style.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <a class="skip" href="#main">${t.skip}</a>
  <header class="wrap topbar">
    <a class="identity" href="${prefix}index.html"><img src="${prefix}assets/wolvic-icon.png" alt="" width="34" height="34">Wolvic for Pico G2</a>
    <nav aria-label="${en ? 'Main navigation' : '主导航'}">
      <a href="#results">${t.nav[0]}</a><a href="#download">${t.nav[1]}</a><a href="#install">${t.nav[2]}</a>
      <a href="${en ? '../index.html' : './en/index.html'}" lang="${en ? 'zh-CN' : 'en'}">${t.nav[3]}</a>
      <a href="${repo}">GitHub</a>
    </nav>
  </header>
  <main id="main">
    <section class="hero" aria-labelledby="title">
      <img class="hero-image" src="${prefix}assets/headset-single-eye.webp" alt="${en ? 'Historical Wolvic home page running inside the Pico G2 virtual environment' : '历史 Wolvic 主页在 Pico G2 虚拟环境中运行的实机画面'}" width="1440" height="1040" fetchpriority="high">
      <div class="hero-copy"><span class="eyebrow">${t.eyebrow}</span><h1 id="title">Wolvic for Pico G2</h1><p>${t.intro}</p></div>
      <p class="image-note">${t.heroNote}</p>
    </section>
    <div class="wrap specbar">${t.specs.map(([a, b]) => `<div><strong>${a}</strong><span>${b}</span></div>`).join('')}</div>
    <section id="results" class="section"><div class="wrap">
      <span class="eyebrow">01 / ${en ? 'The port' : '适配成果'}</span><h2>${t.resultTitle}</h2><p class="section-lead">${t.resultIntro}</p>
      <div class="features">${t.features.map(([title, text], i) => `<article class="feature"><span class="number">0${i + 1}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>
    </div></section>
    <section id="download" class="section download-band"><div class="wrap">
      <div class="section-title"><div><span class="eyebrow">02 / ${en ? 'Download' : '获取应用'}</span><h2>${t.download}</h2></div></div>
      <div class="release-layout"><article>
        <span class="status">${t.published}</span><h3 class="release-title">${publishedCandidate ? 'Wolvic 1.6.2 / 2026-11-13' : 'Wolvic 1.6.2 / 0052'}</h3><p class="release-copy">${t.releaseCopy}</p>
        <div class="actions"><a class="button" href="${apk}">${t.downloadButton}</a><a href="${release}">${t.releaseLink}</a></div>
        <p class="meta">${t.releaseMeta}</p>
      </article><article class="candidate"><span class="status pending">${t.pending}</span><h3>${t.candidate}</h3><p>${t.candidateCopy}</p><p>${t.packageNote}</p><a href="${publishedCandidate ? `${repo}/releases/tag/picog2-1.6.2-0052` : doc('RELEASE_20261113.md')}">${t.notes}</a></article></div>
    </div></section>
    <section id="coverage" class="section"><div class="wrap">
      <span class="eyebrow">03 / ${en ? 'Evidence' : '证据与边界'}</span><h2>${t.coverage}</h2><p class="section-lead">${t.coverageIntro}</p>
      <div class="table-scroll" role="region" aria-label="${t.coverage}" tabindex="0"><table><thead><tr>${t.headers.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${t.rows.map(row => `<tr>${row.map((cell, i) => i === 0 ? `<th scope="row">${cell}</th>` : `<td data-label="${t.headers[i]}">${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <p class="evidence-note"><a href="${doc('RELEASE_20261113.md')}">${t.matrixLink}</a></p>
    </div></section>
    <section id="install" class="section"><div class="wrap">
      <span class="eyebrow">04 / ${en ? 'Installation' : '安装'}</span><h2>${t.install}</h2><p class="section-lead">${t.installLead}</p>
      <div class="install-grid"><ol class="steps">${t.steps.map(([title, text]) => `<li><strong>${title}</strong><p>${text}</p></li>`).join('')}</ol>
      <div><pre class="terminal"><code>adb devices
adb install -r .\\${file}</code></pre><p class="meta">${t.installNote}</p><p class="meta"><a href="${publishedCandidate ? doc('INSTALL_ROLLBACK_20261113.md') : `${repo}/blob/main/${en ? 'README.en.md' : 'README.md'}`}">${t.installGuide}</a></p>
      <div class="checksum">${t.checksum}<code>${hash}</code></div></div></div>
    </div></section>
    <section class="section gallery"><div class="wrap"><div class="section-title"><h2>${t.gallery}</h2></div>
      <figure><a href="${prefix}assets/headset-stereo.webp"><img src="${prefix}assets/headset-stereo.webp" alt="${en ? 'Stereo screenshot of Wolvic build 0037 running on Pico G2' : 'Wolvic 0037 在 Pico G2 上运行的双眼实机截屏'}" width="1920" height="1067" loading="lazy"></a><figcaption>${t.galleryCaption}</figcaption></figure>
    </div></section>
    <section id="faq" class="section"><div class="wrap"><h2>${t.faq}</h2><div class="faq" style="margin-top:28px">${t.questions.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></div></section>
  </main>
  <footer class="wrap footer"><p>${t.footer}</p><div class="footer-links"><a href="${repo}">${t.source}</a><a href="${repo}/issues">${t.feedback}</a><a href="${doc('VERIFICATION.md')}">${t.evidence}</a></div></footer>
</body>
</html>
`;
}
fs.mkdirSync(path.join(site, 'en'), { recursive: true });
if (site !== path.join(root, 'site')) {
  fs.cpSync(path.join(root, 'site/assets'), path.join(site, 'assets'), { recursive: true });
}
fs.writeFileSync(path.join(site, 'index.html'), render('zh'));
fs.writeFileSync(path.join(site, 'en/index.html'), render('en'));
fs.writeFileSync(path.join(site, '.nojekyll'), '');
fs.writeFileSync(path.join(site, `${indexNow.key}.txt`), indexNow.key + '\n');
fs.writeFileSync(path.join(site, 'release-state.json'), JSON.stringify({ publishedCandidate, tag, apk, sha256: hash }, null, 2) + '\n');
fs.writeFileSync(path.join(site, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${base}sitemap.xml\n`);
fs.writeFileSync(path.join(site, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${['', 'en/'].map(suffix => `  <url><loc>${base}${suffix}</loc><xhtml:link rel="alternate" hreflang="zh-CN" href="${base}"/><xhtml:link rel="alternate" hreflang="en" href="${base}en/"/></url>`).join('\n')}
</urlset>\n`);
console.log('Built static Chinese/English pages, sitemap and robots.txt.');
