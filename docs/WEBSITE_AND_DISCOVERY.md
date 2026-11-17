# Project website and discoverability

## Hosting

The website is plain static HTML and CSS under `site/`. It needs no application
server, database, paid domain, tracking service or build-time package download.

Planned default GitHub Pages address:
`https://c-y-t-258.github.io/wolvic-pico-g2-port/`

English version: `/wolvic-pico-g2-port/en/`.

The website is prepared locally. GitHub Pages was not enabled at the last
repository check. Deployment and public repository metadata changes are held
for the user's release review.

After publication approval:

1. Synchronize the reviewed source, documents and site to `main`.
2. Set the repository Pages build type to GitHub Actions.
3. Run `.github/workflows/pages.yml`. It builds and verifies the static pages,
   then uploads only `site/` to Pages.
4. Verify the deployment URL, both language pages, image and download responses.
5. Point the repository homepage to the deployed page.

All workflow actions are pinned to full commit hashes. The build job has
read-only repository access; only the deploy job has Pages/OIDC write access.
The site has no external fonts, client-side scripts, analytics or forms.

## Local review

```powershell
node tools/build-site.cjs
node tools/verify-site.cjs
```

Open `site/index.html` directly. No local development server is needed.
It includes ordinary links that also work from a static Pages deployment.

Chinese and English content are defined in `tools/build-site.cjs`. Generated
HTML is checked in so it can be opened without running a build.

## Search and AI discovery

The page includes:

- natural Chinese and English descriptions of Pico G2 / G2 4K browser support;
- a single product H1, descriptive page titles and descriptions;
- separate Chinese/English URLs with canonical and reciprocal hreflang links;
- SoftwareApplication JSON-LD matching the public 0052 download;
- Open Graph / Twitter preview metadata with a local bitmap;
- `sitemap.xml` and readable static HTML;
- links to source, evidence, releases, installation and issue reporting.

The repository already has relevant topics, including `pico-g2`, `picog2`,
`vr-browser`, `geckoview`, `firefox-reality` and `webxr`. The public homepage
currently points to an old 0038 test release; update it at deployment.

These are technical discoverability measures, not proof of search indexing,
ranking or an AI assistant's knowledge. No claim is made that every engine
or assistant will recommend this project. Search Console/Bing Webmaster Tools
submission is optional and would require the user's account; it is not needed
to finish the local website or to publish GitHub Pages.

The included project-path `robots.txt` documents an open crawl policy and the
sitemap location, but crawlers normally use the domain-root `/robots.txt`.
This project repository cannot control that root file on a shared account
Pages domain. Do not describe the project-path file as a verified crawler
configuration or claim it submitted a sitemap.

No hidden keywords, fake reviews, fabricated usage numbers or claims of
universal codec/site support are used.

## Content and image provenance

The main screenshot is the historical build 0037 Pico G2 startup capture,
`logs/wolvic_0037_regression_start.png` in the private development workspace.
The public page explicitly labels its age and does not present it as the final
candidate UI or a site compatibility result.

`headset-stereo.webp` is a resized copy of the original stereo screenshot.
`headset-single-eye.webp` crops the left eye at x=0, y=350, width=1440,
height=1040. No browser controls or successful test indicators were fabricated.
The social image combines that crop with the project title.

The favicon uses the existing Wolvic application icon. Wolvic marks and
underlying assets remain attributed to their owners. The project is labelled
as an unofficial community port.

Only the reviewed startup screenshot is copied into the public site. Private
device logs, browsing history, profile thumbnails and unrelated page captures
are excluded.

## Release content rule

Until the candidate is actually published, the download CTA and structured
data point to the existing 0052 APK. The 2026-11-13 candidate is visibly marked
as unpublished. Never link to a nonexistent candidate asset.

The Pages workflow queries the explicit new release tag and requires the named
APK to exist on a non-draft release before generating the new-download mode.
If it is absent, the public download stays on 0052. It runs on release
publication as well as site updates.

For local review only, the final publication mode can be generated separately:

```powershell
node tools/build-site.cjs --published-candidate --output D:\review\after-publication
node tools/verify-site.cjs D:\review\after-publication
```

That review output does not publish a file or change the live site. Both modes
update the download, package/install text and schema together and retain 0052
as a fallback. A published APK must not silently inherit device acceptance
claims from a different APK.

## 中文说明

展示页使用 GitHub Pages 默认地址，不要求准备服务器或购买域名。中英页面、
下载入口、覆盖范围、安装说明、真实历史截图和搜索元数据均在同一仓库维护。
Pages 发布后只需随仓库更新，不存在额外的应用服务器运维。

搜索和 AI 可发现性以公开、可抓取、可核查的资料为目标，不承诺收录、排名或
所有 AI 都会知道该项目。账户验证或主动提交站长平台是可选后续，不作为发布门槛。
