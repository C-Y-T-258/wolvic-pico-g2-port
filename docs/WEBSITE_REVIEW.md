# Website review

The reviewed site is published through GitHub Pages following user approval
on 2026-11-18 (Asia/Shanghai).
Chinese: `https://c-y-t-258.github.io/wolvic-pico-g2-port/`
English: `https://c-y-t-258.github.io/wolvic-pico-g2-port/en/`
The local preparation checks below are retained as the review record.

## Verified

- Two static language pages: Chinese and English.
- Five viewport sizes for each language: 320×740, 390×844, 760×900,
  1440×1000 and 1920×1080.
- No page-level horizontal overflow, broken images, browser script errors
  or clipped headings/navigation/buttons.
- Hero copy and image do not overlap; the next section remains visible.
- FAQ expand/collapse, language navigation and return-to-home work.
- Version-aware download, install instructions, checksums and schema.
- Both pre-publication and post-publication static metadata/link checks.
- Post-publication layout and interaction checks on all ten language/viewport
  combinations.
- All 50 referenced page links/assets pass local structure checks. Public
  GitHub documentation links become available when this source is synchronized.

Screenshots and machine-readable layout results are included in the local
release-review directory. They are not device screenshots; the website itself
uses one separately labelled historical device screenshot.

## Review entry points

In the local review bundle:

- `website/index.html`: refreshed copy of the published site.
- `website-after-publication/index.html`: a preview of the final published
  state, with the new APK primary and 0052 retained.
- `website-review-published/zh-1440-viewport.png`: desktop screenshot.
- `website-review-published/zh-390-viewport.png`: mobile screenshot.

The second variant was the reviewed preview before publication. The live
site uses the release-aware workflow and retains the 0052 fallback.

## Publication checks

- User approved public synchronization and publication on 2026-11-18.
- Source history is synchronized and the Pages build/deploy jobs succeeded.
- The new prerelease contains the APK, source archive and checksum file.
- Public HTTP, metadata, downloads and artifact checks are recorded in
  [the publication checklist](PUBLICATION_CHECKLIST.md).
- External search indexing and AI recommendations remain outside the verified scope.

## Introduction revision: 2026-11-18

The Chinese default README and English translation were rewritten around the
current release. The website now describes six concrete adaptation results,
including Hamezo handoff, per-page UA, YouPorn controls and codec switching,
and distinguishes site VR from native projection in the FAQ.

Both release modes passed metadata and 50 page-link/asset checks. The revised
published mode passed the same ten Chinese/English viewport and interaction
checks listed above; desktop Chinese and mobile English full-page screenshots
were also visually reviewed. Thirty local documentation links were checked.
The review output is stored locally under `website-review-rewrite-20261118/`.

Search observations and uncertain external results are retained in the
[discovery check](DISCOVERY_CHECK_20261118.md).
