#!/usr/bin/env python3
"""Make the published mirror stand on its own — no Pagesmith, no Google Fonts.

`index.html` here is a copy of https://seeharder.com/the-living-spring/, produced by
`pagesmith pull 69d6de2c-dd3f-427f-8adf-18b7e3c4aa22`. Pagesmith serves that page, so its
output references platform paths that only resolve on seeharder.com. Two of them matter:

  * Six webfonts under /_pagesmith/fonts/, which 404 here. They are declared in an inline
    <style> that comes AFTER the page's Google Fonts <link>, so they did not merely fail —
    they SHADOWED the working Google faces at exactly the weights the body text uses.
    Fraunces 400 and Instrument Sans 400 both ended up unavailable, and since EB Garamond
    (the second serif in --display/--read) was 404 too, every one of ~474 serif elements
    fell through to Georgia. The page had been rendering in the wrong typeface entirely.
  * favicon, apple-touch icon and social-share image on pagesmith-cdn.com. These do
    resolve, but they are someone else's CDN on our critical path.

So this script self-hosts every face the design actually asks for — the exact axes from
the page's own Google Fonts request, plus EB Garamond, which the page uses as a fallback
serif but never requested — and then drops the Google Fonts link as well. After it runs
the page fetches nothing from any third party at all.

Run it after every `pagesmith pull`, or the mirror reverts to Georgia:

    python3 tools/depagesmith.py

Idempotent: re-running on a converted file changes nothing and exits 0. Strict: if a
pattern it expects is missing AND the local replacement is not already in place, it fails
loudly, because a silent no-op here looks exactly like success and ships a broken page.

Not touched, deliberately: rel=canonical and og:url still point at seeharder.com. That is
where this page is authored and where it should rank — a publishing decision, not a
Pagesmith dependency.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGE = ROOT / "index.html"
FONTFACE = Path(__file__).resolve().parent / "fontface.css"
# The estate polish pack (tap highlight, press state, balanced and pretty text). Pagesmith
# never emits it, so every pull drops it; this puts it back before </head>.
POLISH = Path(__file__).resolve().parent / "polish-pack.html"
POLISH_BLOCK = re.compile(r'<style id="polish-pack">.*?</style>', re.S)

SOCIAL_IMAGE = "https://esmrsky.github.io/be-filled/assets/social-share.webp"

# One contiguous run of @font-face rules pointing at /_pagesmith/fonts/.
PAGESMITH_FONTFACE = re.compile(
    r"(?:@font-face\{[^}]*/_pagesmith/fonts/[^}]*\})+"
)
# The page's Google Fonts stylesheet and the two preconnects that feed it.
GOOGLE_FONTS = re.compile(
    r'\s*<link[^>]+href="https://fonts\.googleapis\.com/css2[^"]*"[^>]*>'
)
GOOGLE_PRECONNECT = re.compile(
    r'\s*<link rel="preconnect" href="https://fonts\.(?:googleapis|gstatic)\.com"[^>]*>'
)
CDN_PRECONNECT = re.compile(
    r'\s*<link rel="preconnect" href="https://pagesmith-cdn\.com"[^>]*>'
)
# Pagesmith emits this for its stock imagery. This page loads no <img> at all, so it
# only opens a TLS connection to a third party for nothing.
UNSPLASH_PRECONNECT = re.compile(
    r'\s*<link rel="preconnect" href="https://images\.unsplash\.com"[^>]*>'
)


def convert(html: str, fontface: str, polish: str) -> tuple[str, list[str], list[str]]:
    changed: list[str] = []
    problems: list[str] = []

    # The polish pack: replace an older copy, or add it.
    if polish not in html:
        html, n = POLISH_BLOCK.subn(lambda m: polish, html)
        if not n:
            html = html.replace("</head>", polish + "\n</head>", 1)
        changed.append("polish pack " + ("updated" if n else "added"))

    # Fonts: swap the whole shadowing block for the self-hosted one.
    html, n = PAGESMITH_FONTFACE.subn(lambda m: fontface, html)
    if n:
        changed.append(f"self-hosted @font-face ({n} block)")
    elif "url(fonts/fraunces-normal-latin.woff2)" not in html:
        problems.append("@font-face block")

    # Third-party font hosts are no longer needed.
    for label, pattern in (("Google Fonts stylesheet", GOOGLE_FONTS),
                           ("Google Fonts preconnects", GOOGLE_PRECONNECT),
                           ("Pagesmith CDN preconnect", CDN_PRECONNECT),
                           ("unused Unsplash preconnect", UNSPLASH_PRECONNECT)):
        html, n = pattern.subn("", html)
        if n:
            changed.append(f"{label} dropped ({n})")

    for label, pattern, replacement, marker in (
        ("social image", r"https://pagesmith-cdn\.com/[0-9a-f]+/images/[^\"']+",
         SOCIAL_IMAGE, re.escape(SOCIAL_IMAGE)),
        ("favicon", r"https://pagesmith-cdn\.com/[0-9a-f]+/favicons/favicon-[0-9a-f]+\.svg",
         "assets/favicon.svg", r'href="assets/favicon\.svg"'),
        # Upstream's apple-touch-icon is an SVG served as image/png, which iOS refuses.
        # assets/apple-touch-icon.png is a real 180x180 opaque PNG rendered from that SVG.
        ("apple-touch-icon",
         r"https://pagesmith-cdn\.com/[0-9a-f]+/favicons/apple-touch-icon-[0-9a-f]+\.png",
         "assets/apple-touch-icon.png", r'href="assets/apple-touch-icon\.png"'),
    ):
        html, n = re.subn(pattern, replacement, html)
        if n:
            changed.append(f"{label} -> local ({n})")
        elif not re.search(marker, html):
            problems.append(label)

    return html, changed, problems


def main() -> int:
    for path in (PAGE, FONTFACE, POLISH):
        if not path.exists():
            print(f"error: {path} not found", file=sys.stderr)
            return 2

    fontface = FONTFACE.read_text(encoding="utf-8").strip()
    original = PAGE.read_text(encoding="utf-8")
    html, changed, problems = convert(original, fontface, POLISH.read_text(encoding="utf-8").strip())

    if problems:
        print("error: these rules matched nothing and are not already applied:",
              file=sys.stderr)
        for p in problems:
            print("  " + p, file=sys.stderr)
        print("Pagesmith's output shape probably changed — inspect index.html before "
              "shipping; the page may be missing assets.", file=sys.stderr)
        return 1

    missing = [u for u in re.findall(r"url\(fonts/([^)]+)\)", html)
               if not (ROOT / "fonts" / u).exists()]
    if missing:
        print("error: @font-face points at files that are not in fonts/:", file=sys.stderr)
        for m in sorted(set(missing)):
            print("  " + m, file=sys.stderr)
        return 1

    for label, pattern in (("Pagesmith", r"[^\s\"'<>()]*pagesmith[^\s\"'<>()]*"),
                           ("Google Fonts", r"[^\s\"'<>()]*(?:googleapis|gstatic)[^\s\"'<>()]*")):
        leftovers = sorted(set(re.findall(pattern, html, re.I)))
        if leftovers:
            print(f"error: {label} references remain:", file=sys.stderr)
            for ref in leftovers:
                print("  " + ref, file=sys.stderr)
            return 1

    if html != original:
        PAGE.write_text(html, encoding="utf-8")
        print("rewrote index.html: " + "; ".join(changed))
    else:
        print("already converted, nothing to do")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
