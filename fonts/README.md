# Self-hosted webfonts

These are the faces `index.html` actually uses. They replace six `/_pagesmith/fonts/`
URLs that 404 on GitHub Pages and a Google Fonts stylesheet, so the published page now
fetches nothing from a third party.

| Family | Files | Axes vendored | Used as |
|---|---|---|---|
| Fraunces | roman + italic | `opsz 9..144`, `wght 300..700` (roman) / `300..600` (italic) | `--display`, `--read` |
| EB Garamond | roman + italic | `wght 400..700` | second serif behind Fraunces |
| Instrument Sans | roman + italic | `wght 400..600` | `--ui` |
| JetBrains Mono | roman | `wght 400..500` | `--mono` |

Each family ships a `latin` and a `latin-ext` file. The `@font-face` rules carry Google's
own `unicode-range`, so a reader on an English page downloads only the four `latin` files
(~167 KB); the `latin-ext` ones are fetched only if the text needs them.

The weight *ranges* matter — these are variable fonts, and one file covers the range. That
is why there are 14 files for 20 faces.

## Where they came from

Fetched from Google Fonts using the exact spec the page's own stylesheet requested:

```
Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600
Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400
JetBrains+Mono:wght@400;500
EB+Garamond:ital,wght@0,400..700;1,400..700      # never requested upstream; used as a fallback
```

`tools/fontface.css` is the generated `@font-face` block that `tools/depagesmith.py`
splices into the page. To re-fetch or change the axes, regenerate both together — the
script fails if a rule points at a file that is not here.

## Licence

All four families are licensed under the **SIL Open Font License 1.1**, which permits
self-hosting and redistribution. Upstream sources:

- Fraunces — <https://github.com/undercasetype/Fraunces>
- EB Garamond — <https://github.com/octaviopardo/EBGaramond12>
- Instrument Sans — <https://github.com/Instrument/instrument-sans>
- JetBrains Mono — <https://github.com/JetBrains/JetBrainsMono>

The OFL requires that the fonts not be sold on their own and that any derivative keep the
licence. Neither applies to serving them as part of this page.
