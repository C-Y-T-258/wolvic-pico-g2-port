# Project website and discoverability

## Hosting

The website is plain static HTML and CSS under `site/`. It needs no application
server, database, paid domain, tracking service or build-time package download.

Default GitHub Pages address:
`https://c-y-t-258.github.io/wolvic-pico-g2-port/`

English version: `/wolvic-pico-g2-port/en/`.

GitHub Pages was enabled on 2026-11-18 (Asia/Shanghai), after publication
approval. The reviewed source and website are synchronized to `main`.
The initial Pages build and deployment both succeeded.

Deployment procedure:

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

The default command previews the older fallback state. To reproduce the current
published download, use `node tools/build-site.cjs --published-candidate` before
verification.

Open `site/index.html` directly. No local development server is needed.
It includes ordinary links that also work from a static Pages deployment.

Chinese and English content are defined in `tools/build-site.cjs`. Generated
HTML is checked in so it can be opened without running a build.

## Search and AI discovery

The page includes:

- natural Chinese and English descriptions of Pico G2 / G2 4K browser support;
- a single product H1, descriptive page titles and descriptions;
- separate Chinese/English URLs with canonical and reciprocal hreflang links;
- SoftwareApplication JSON-LD matching the selected public release download;
- Open Graph / Twitter preview metadata with a local bitmap;
- `sitemap.xml` and readable static HTML;
- links to source, evidence, releases, installation and issue reporting.

The repository already has relevant topics, including `pico-g2`, `picog2`,
`vr-browser`, `geckoview`, `firefox-reality` and `webxr`. The public homepage
points to the default Pages address.

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

The [2026-11-18 discovery check](DISCOVERY_CHECK_20261118.md) records actual
queries and their limits. A repository result was returned with older 0052
copy; indexing of the new website and refreshed content remains unconfirmed.

## Active notification for the showcase

The two showcase URLs, rather than GitHub repository URLs, are listed in
`tools/indexnow.json`. After successful Pages deployment, a read-only checkout
job verifies the live ownership file and sends those URLs to IndexNow.
`tools/submit-indexnow.ps1` can also be run manually with PowerShell 7.
There is no periodic resubmission or account credential in this mechanism.

The IndexNow key is a public site-ownership proof served as a text file under
the project path. It does not grant GitHub or search-account access. This
scoped location authorizes only URLs below `/wolvic-pico-g2-port/`, not other
repositories on the account's Pages host. Both build modes generate the key.
The public JSON is the notification payload, not a private API secret.

HTTP 200 means the notification was received. HTTP 202 additionally means key
validation is pending. Neither response proves indexing or ranking. The
notification job retains its response in Actions; notification failure does
not undo or mislabel a successful Pages deployment.

IndexNow shares notifications among participating engines. It is not a Google
Search Console submission and is not an instruction to AI assistants.
Google URL-prefix verification and sitemap submission use Search Console.
Do not create a DNS property for the shared `github.io` domain or claim to own
GitHub's domain.

The project URL-prefix property was verified on 2026-11-18 using the HTML file
served from the project path. The file is retained in `site/` and copied to
alternate build outputs. Google's live test found the Chinese homepage
eligible for indexing. Sitemap submission was accepted, but its subsequent
fetch report and the individual indexing-request service returned errors.
The [discovery record](DISCOVERY_CHECK_20261118.md) distinguishes these partial
results from actual indexing; no successful indexing request is claimed.

The same project-path resource was also verified in Bing Webmaster Tools on
2026-11-18 using its downloaded `BingSiteAuth.xml`. Both build modes retain
that file. Bing accepted the sitemap (initial status: Processing) and confirmed
successful submission of the two showcase URLs. Its live homepage test reported
that the URL can be indexed, with no SEO/GEO issues found. The index report
still showed discovered but not crawled; submission is not proof of indexing.

Official references:

- [IndexNow protocol and scoped key locations](https://www.indexnow.org/documentation)
- [Google sitemap submission](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google AI features and site eligibility](https://developers.google.com/search/docs/appearance/ai-features)
- [OpenAI search crawler documentation](https://platform.openai.com/docs/bots)

Allowing search crawlers and publishing useful static content support
eligibility; they do not ensure recommendation. Google states that no extra
AI text file or special AI schema is required for its AI search features.
OpenAI distinguishes OAI-SearchBot search crawling from model-training
crawling. This project does not change training preferences as an SEO measure.

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

The published mode can also be generated locally:

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

GitHub 默认 `README.md` 使用中文，英文保留在 `README.en.md`。介绍与展示页已围绕
当前版重写，展开 Hamezo 交接、单页 Quest UA、YouPorn 沉浸控件、悬停修复和
同视频编码切换；0052 作为回退版本保留，不再占据新版安装主线。

搜索和 AI 可发现性以公开、可抓取、可核查的资料为目标，不承诺收录、排名或
所有 AI 都会知道该项目。实际观察见[搜索核对记录](DISCOVERY_CHECK_20261118.md)，
未确认的外部效果仍明确保留，不能以网页上线代替。账户验证或主动提交站长平台
是可选后续，不作为发布门槛。
