# Website review

The site is ready for local review and GitHub Pages deployment.
No GitHub Pages site has been created or published in this preparation step.

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

- `website/index.html`: accurate current-publication state, downloading 0052.
- `website-after-publication/index.html`: a preview of the final published
  state, with the new APK primary and 0052 retained.
- `website-review-published/zh-1440-viewport.png`: desktop screenshot.
- `website-review-published/zh-390-viewport.png`: mobile screenshot.

The second variant is only a preview; its candidate download URL will not
exist until the new release is actually published.

## Still pending

- User confirmation of public synchronization/publication.
- Actual GitHub Release upload and GitHub Pages deployment.
- Public HTTP, download and metadata checks after deployment.
- External indexing, if any, can only be observed after publication.
