# Publication handoff

The local APK/source preparation, bilingual website and static discoverability
work are ready for review. Public changes are pending the user's explicit
confirmation.

## Concrete publication

Repository: `C-Y-T-258/wolvic-pico-g2-port`

Proposed release tag: `picog2-1.6.2-20261113`

Proposed title: `Wolvic Pico G2 1.6.2 / 2026-11-13 community build`

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

## Execution after confirmation

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

Steps involving public GitHub writes have not been performed in local review.
No new device tests are silently added to this gate.

## Proposed repository description

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
