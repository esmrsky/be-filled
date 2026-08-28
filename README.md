# be-filled

Serves **The Living Spring** at <https://esmrsky.github.io/be-filled/>.

This is a **mirror, not a source.** The page is authored in Pagesmith and lives at
<https://seeharder.com/the-living-spring/>. Do not hand-edit `index.html` — content edits
belong upstream, and the next pull overwrites anything done here.

## Refreshing the page

```bash
pagesmith pull 69d6de2c-dd3f-427f-8adf-18b7e3c4aa22   # take the PUBLISHED page, not the preview
python3 tools/depagesmith.py                          # required — see below
```

Take the **published** page: the preview carries unpushed workspace edits. The Astro source
mirror is in `pagesmith-project/` for reference; it is not built here.

## Why the second step is not optional

Pagesmith serves the page with platform paths that only resolve on seeharder.com. Two of
them break here:

- **Six webfonts under `/_pagesmith/fonts/`.** These 404 on GitHub Pages, and they are
  declared in an inline `<style>` that comes *after* the page's Google Fonts `<link>` — so
  they did not merely fail, they **shadowed** the working Google faces at exactly the
  weights the body text uses. Fraunces 400 and Instrument Sans 400 both ended up with no
  usable face, and because EB Garamond (the second serif in `--display` / `--read`) was
  404 as well, roughly 474 serif elements fell through to Georgia. The page had been
  rendering in the wrong typeface for however long the mirror had been up.
- **favicon, apple-touch icon and social-share image on `pagesmith-cdn.com`.** These do
  resolve, but they put someone else's CDN on the critical path.

`tools/depagesmith.py` fixes both, and also drops the Google Fonts link now that the faces
are self-hosted. After it runs the page fetches **nothing from any third party**. It is
idempotent, and strict: if Pagesmith's output shape changes so a rule matches nothing, it
fails loudly rather than quietly shipping a fontless page.

`rel=canonical` and `og:url` still point at seeharder.com on purpose — that is where the
page is authored and where it should rank. That is a publishing decision, not a Pagesmith
dependency.

## Layout

```
index.html          the mirror (generated; run depagesmith.py after every pull)
fonts/              14 self-hosted woff2 files — see fonts/README.md
assets/             favicon.svg, apple-touch-icon.png, social-share.webp
tools/depagesmith.py  the post-pull transform
tools/fontface.css    the @font-face block it splices in
pagesmith-project/  Astro source mirror, for reference only
```

`assets/apple-touch-icon.png` is a real 180×180 opaque PNG. The upstream one is an SVG
served as `image/png`, which iOS refuses.
