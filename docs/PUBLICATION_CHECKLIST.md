# Publication handoff

The user approved public synchronization, Release publication and GitHub Pages
on 2026-11-18 (Asia/Shanghai). This records the reviewed publication procedure
and the execution checks. No separate server or domain is required.

## Concrete publication

Repository: `C-Y-T-258/wolvic-pico-g2-port`

Release tag: `picog2-1.6.2-20261113`

Title: `Wolvic Pico G2 1.6.2 / 2026-11-13 community build`

Release type: prerelease, preserving the existing project's community-test
status. No promise of full multi-site or every VR-combination acceptance.

Release body: [`GITHUB_RELEASE_BODY_20261113.md`](GITHUB_RELEASE_BODY_20261113.md).

Assets:

- `Wolvic-1.6.2-picog2-20261113-arm64-signed.apk`
- `Wolvic-picog2-20261113-source.zip`
- `SHA256SUMS.txt`

Default Pages address:
`https://c-y-t-258.github.io/wolvic-pico-g2-port/`

No custom domain, separate server, account subscription or payment is needed
by this publication plan.

## Publication procedure

1. Recheck remote state and local artifact hashes; preserve published 0052.
2. Reconcile the local release commit with remote `main` without force-pushing.
3. Synchronize complete source patches, documentation and website.
4. Create the new prerelease with the reviewed assets and body.
5. Enable Pages using Actions and run the prepared deployment workflow.
6. Update the repository homepage to the Pages URL; preserve appropriate
   existing topics and apply the reviewed short description.
7. Confirm the release asset hashes/sizes, bilingual Pages HTTP responses,
   actual download destination, sitemap, metadata and displayed release state.
8. Update README state from prepared to published using actual public links,
   rebuild the source package if its published contents change, refresh
   checksums and verify the uploaded source archive against the repository.

No new device tests are added to this publication gate.

## Execution record: 2026-11-18

- User authorization received before public writes.
- Existing remote history preserved by merge; ordinary push to `main`,
  without force-pushing. Initial synchronized commit:
  `aa0e2113e2cac3df8e7f49ad74137f1cfe269d75`.
- GitHub Pages enabled with the Actions build type and HTTPS.
- Initial workflow run `44181835259`: build and deploy both succeeded.
- Both Chinese and English public URLs returned HTTP 200.
- Repository homepage and bilingual description updated; existing topics retained.
- Three reviewed assets uploaded to the draft release. GitHub's APK digest
  matches local SHA256
  `AFA8E6451E1E5F5871497729A161F7834606E6FE2612281A59B1F55C42A8B950`;
  APK size is 115,521,249 bytes.
- Publication-state documentation and the generated site are synchronized
  before exposing the final release. The source archive and `SHA256SUMS.txt`
  are refreshed from these files.
- The release-triggered Pages workflow checks for the public APK before
  selecting its download. Build/deploy results remain available in
  [Actions](https://github.com/C-Y-T-258/wolvic-pico-g2-port/actions/workflows/pages.yml).

Final public verification checks the published release's three assets and
digests, both language pages, generated release state, structured data,
sitemap, images, installation links and the preserved 0052 release.
The source archive carries its current digest in `SHA256SUMS.txt`, avoiding
a self-referential archive hash in its own documentation.

Public entry points:

- [Community prerelease](https://github.com/C-Y-T-258/wolvic-pico-g2-port/releases/tag/picog2-1.6.2-20261113)
- [Chinese website](https://c-y-t-258.github.io/wolvic-pico-g2-port/)
- [English website](https://c-y-t-258.github.io/wolvic-pico-g2-port/en/)
- [Preserved 0052 fallback](https://github.com/C-Y-T-258/wolvic-pico-g2-port/releases/tag/picog2-1.6.2-0052)

## Repository description

Pico G2 / G2 4K 非官方 Wolvic VR 浏览器：GeckoView 128、原生 PicoVR、
WebXR 视频与通用编码工具 | Unofficial legacy 3DoF browser port

## Acceptance boundary

The metadata-cleaned APK has not been separately installed on the headset.
Functional assets and native libraries match the tested baseline. The full
evidence matrix retains historical/controlled/natural-site distinctions.
Publishing does not turn unverified combinations into verified support.

Search indexing is not a publication pass/fail gate. Server responses,
metadata, accessible HTML and sitemap can be verified; third-party search
ranking or AI recommendations cannot be guaranteed.

## 2026-11-18 introduction revision

The default README is Chinese, with `README.en.md` retaining the English
translation and `README.zh-CN.md` preserving the previous Chinese entry link.
Both introductions now centre on the current release: native PicoVR/WebXR,
crop/projection fixes, Hamezo handoff, per-page Quest UA, YouPorn/MGP controls,
hover repair and evidence-based codec selection. The bilingual website uses
the same concrete results and keeps 0052 as a fallback.

These are subsequent documentation changes on `main`. The published APK,
release tag and source ZIP remain the reviewed release snapshot; the source
attachment does not silently change with later README edits.

Actual search observations and unconfirmed indexing/AI effects are recorded
in [the discovery check](DISCOVERY_CHECK_20261118.md).
