## 1. Site Info

SITE_TYPE: Editorial Guide & Spiritual Philosophy
HTML_LANG: en

## 2. Color Token Mapping

All computed colors are extracted and mapped to our semantic tokens, converted from RGB to HSL format.

---DESIGN_MD_START---
## Visual Theme
Elegant, warm, and highly editorial philosophical landing page. Features a classic literary style with a soft, warm cream/parchment background, rich dark charcoal-brown serif typography, and striking deep-terracotta/rust accent tones for key emphasis points.

## Colors
- background: hsl(39, 41%, 92%)           /* Warm Cream / Parchment background: rgb(244, 237, 224) */
- foreground: hsl(26, 27%, 10%)           /* Dark Charcoal Ink body text: rgb(33, 25, 19) */
- muted-foreground: hsl(29, 17%, 30%)     /* Muted Warm Slate Brown: rgb(91, 77, 64) */
- border: hsla(26, 27%, 10%, 0.15)        /* Subtle dark borders: rgba(33, 25, 19, 0.15) */
- surface: hsl(39, 41%, 92%)              /* Match main cream */
- primary: hsl(29, 17%, 30%)              /* Primary button text / Borders */
- primary-foreground: hsl(39, 41%, 92%)   /* Warm cream text on dark actions */
- primary-hover: hsl(29, 17%, 20%)        /* 10% darker muted brown */
- secondary: hsl(39, 59%, 45%)            /* Amber / Muted Gold: rgb(182, 134, 47) */
- secondary-foreground: hsl(26, 27%, 10%)
- secondary-hover: hsl(39, 59%, 35%)
- accent: hsl(16, 77%, 44%)               /* Deep Rust / Terracotta Orange: rgb(197, 72, 26) */
- accent-dark: hsl(16, 73%, 35%)          /* Accent red-brown label color: rgb(154, 58, 24) */
- dark: hsl(26, 27%, 10%)
- dark-foreground: hsl(39, 41%, 92%)
- dark-muted: hsl(35, 17%, 53%)           /* Muted Tan: rgb(154, 138, 115) */
- dark-border: hsla(39, 41%, 92%, 0.2)

## Page Background
solid hsl(39, 41%, 92%)

## Typography
- Heading font: fraunces
- Body font: fraunces
- Sans/Meta font: instrument-sans
- Monospace font: jetbrains-mono

## Components
- Buttons (Outline): Pill-shaped (`rounded-full`), padding `py-1.5 px-3.5`, border of `1px solid hsla(26, 27%, 10%, 0.22)`, text in `muted-foreground`, transition hover effect with slight darkening.
- Accordion Cards: Clean borders, structured details layout with minimal custom summary indicators (e.g. "+" transitions to "—" when open).
- Objection Cards: Rounded box (`rounded-xl`), soft background border, styled with an expressive accent-rust colored left border.
---DESIGN_MD_END---

## 3. Navigation Spec

NAV_FULL_WIDTH: true
NAV_WIDTH: 1920px
NAV_BACKGROUND: hsla(39, 41%, 92%, 0.78)
NAV_BORDER_RADIUS: none
NAV_POSITION: sticky
NAV_SHADOW: none
SCROLL_BEHAVIOR: backdrop-filter: blur(8px)

Link style:
- fontSize: text-[11.52px]
- fontWeight: font-normal (400)
- fontFamily: "Instrument Sans", sans-serif
- textTransform: uppercase
- letterSpacing: tracking-[0.08em]
- color: hsl(29, 17%, 30%) (muted-foreground)

### Navigation Structure
The main navigation is divided into two parts:
1. **Top Header**:
   - **Left**: Site logo/title `"THE LIVING SPRING"` set in all-caps, tracking-[0.2em], text-[13.5px], `font-mono` (`jetbrains-mono`).
   - **Right**: 
     - "Open all" custom toggle button (Pill outline style: `text-[11.52px]`, `border-[1px] border-border`, text `muted-foreground`).
     - Moon cycle theme icon button (small circular shape).
2. **Sub-Header / Section Bar**:
   - Sticky bar that anchors under the main nav on scroll.
   - Horizontal scrolling/flex strip containing numbered anchor links:
     - `01 THE FULLNESS`, `02 THE FOUNTAIN`, `03 WHAT YOU WANT`, `04 THE ACHE`, `05 HOW THE HEART TURNS`, `06 THE RIVERBED`, `07 THE FEAST`, `08 HONEST OBJECTIONS`
     - Typography: `font-mono` / sans-serif, uppercase, text-[10px], letter-spacing-[0.1em].
     - Active link gets a solid accent underline (`bg-accent` / rust-red color). Implement via an `IntersectionObserver` script tracking section IDs `fullness`, `fountain`, `slots`, `ache`, `heart`, `riverbed`, `feast`, `objections`.

### Global "Open All" Accordions Script
The "Open all" button in the sticky header must toggle the `open` state of all `<details>` components globally across the page:
```javascript
document.querySelector('[data-action="open-all"]').addEventListener('click', (e) => {
  const details = document.querySelectorAll('details');
  const allOpen = Array.from(details).every(d => d.hasAttribute('open'));
  details.forEach(d => {
    if (allOpen) {
      d.removeAttribute('open');
    } else {
      d.setAttribute('open', '');
    }
  });
  e.currentTarget.textContent = allOpen ? "Open all" : "Close all";
});
```

---

## 4. Section Plan

### Hero Section
- **ID**: `hero`
- **Theme**: LIGHT
- **Background**: `bg-background` (cream)
- **Container Max-Width**: `736px`
- **Padding Block**: `144px 96px`
- **Content**:
  - Mini header text: `— A FIELD GUIDE TO FULLNESS · MMXXVI` (centered, text-[10.5px], tracking-[0.25em], font-mono uppercase text-muted-foreground/60).
  - Main Heading (H1): `"You were made to be full."` (Size `text-[128px]`, line-height `117.76px`, font-weight `340`, italicizing `"full."` and painting it in `text-accent`).
  - Subhead text: `"Not by managing your needs one app at a time — but by being filled, all at once, from a source that doesn't run dry."` (Size `text-[27.2px]`, line-height `39.44px`, font-light).
  - Secondary highlighted subtext: `"There is a spring under everything you have ever wanted."` (text-[15.5px] italicized text-accent centered block).
  - Long description paragraph: `"This starts with the ache you already know — the looking that never quite lands — and walks toward the thing it was always pointing at. Read the short version straight through. Open the panels when you want the verses, the picture, and the full frame."` (text-[15.5px] leading-relaxed text-foreground/80 max-w-[550px] mx-auto text-center).
  - Sub-label row: `SEVEN MOVEMENTS ≈ 8 MIN · LONGER IF YOU OPEN IT ALL TAP "OPEN ALL" FOR THE FULL TEXT` (all-caps, mono, text-[9px] tracking-[0.1em] text-muted-foreground/60 center gap).

---

### Quote Banner
- **ID**: `quote-banner`
- **Theme**: LIGHT
- **Background**: `bg-background`
- **Container Max-Width**: `672px`
- **Padding Block**: `60.8px`
- **Content**:
  - Large center quote style container with top & bottom decorative hairline rules:
    `"“They feast on the abundance of your house, and you give them drink from the river of your delights. For with you is the fountain of life; in your light do we see light.” — PSALM 36:8-9"`
    - Font style: Italicized display serif (`Fraunces` italic, text-[22px], leading-[36px], text-center text-foreground).

---

### Section 1: Honestly? It's good news, and it's simple.
- **ID**: `fullness`
- **Theme**: LIGHT
- **Background**: `bg-background`
- **Container Max-Width**: `640px`
- **Padding Block**: `112px 112px`
- **Content**:
  - Section marker: `— THE SHORT VERSION` (text-[10px], mono, muted-foreground)
  - Heading (H2): `🌱 Honestly? It's good news, and it's simple.` (Size `text-[48px]`, font-weight `380`, leading-[50px]).
  - Body text:
    `"You have real needs. You were made to be filled — by God, by people, by a place, by good work. There is a fountain all of it flows from, and his name is Jesus. Everything thin you've ever reached for was reaching, badly, for him."`
    `"You could stop right there — that's the whole gospel of it. But if you want to see why the real thing satisfies where the substitute can't, and how a heart actually turns toward it, that's what the rest is for."` (Typography: `text-[18.88px]`, line-height `32.47px`).
  - **Accordion Element**:
    - **Trigger**: `"If you want the arc: It begins full, and it ends fuller"`
    - **Content**: `"It began whole. One garden where work and worship and body and people and meaning were a single life — every need met by its proper source, all at once. It fractured — first in Eden, then again when modernity pulled every need apart and handed each one to a separate vendor. That's the arc..."`
    - **Style**: Minimal border box, padding `py-4 px-5 bg-background/50 hover:bg-background/80 transition-all rounded-md`.

---

### Section 2: You have tasted this. That's the whole argument.
- **ID**: `tasted`
- **Theme**: LIGHT
- **Background**: `bg-background`
- **Container Max-Width**: `544px`
- **Padding Block**: `112px 112px`
- **Content**:
  - Section marker: `— 01 · THE FULLNESS`
  - Heading (H2): `🌾 You have tasted this. That's the whole argument.` (Size `text-[48px]`, leading-[50px]).
  - Body Paragraphs: Beautiful, highly literary paragraphs detailing a warm kitchen table, safe company, and natural rest.
  - **Accordions**:
    1. **Trigger**: `"GO DEEPER: The nervous system already knows the difference"`
       - Content: Text detailing physiological signatures, awe, and co-regulation.
    2. **Trigger**: `"IN SCRIPTURE: Placed in a garden, given everything at once"`
       - Content: Biblical reference pointing to original unity of human need.

---

### Section 3: Every good thing is a stream. He is the source.
- **ID**: `fountain`
- **Theme**: LIGHT
- **Background**: `bg-background`
- **Container Max-Width**: `544px`
- **Padding Block**: `112px 112px`
- **Content**:
  - Section marker: `— 02 · THE FOUNTAIN`
  - Heading (H2): `⛲ Every good thing is a stream. He is the source.`
  - Body text on why the guide centers on this theological turn.
  - **Highlight Block**:
    - Large italic block quote framed between horizontal bars:
      `"He did not come to make your life thinner. He came that you “may have life, and have it abundantly.”"`
  - **Accordions**:
    1. **Trigger**: `"IN SCRIPTURE: The fountain, the bread, the vine, the light"`
    2. **Trigger**: `"GO DEEPER: Why the source can give without emptying"`

---

### Section 4: Inside you there are slots. They were the point.
- **ID**: `slots`
- **Theme**: LIGHT
- **Background**: `bg-background`
- **Container Max-Width**: `800px` (Note: Expanded grid width for cards layout)
- **Padding Block**: `112px`
- **Content**:
  - Section marker: `— 03 · WHAT YOU WERE MADE TO WANT`
  - Heading (H2): `🍷 Inside you there are slots. They were the point.`
  - Body Text: Introduction to the six slots of longing.
  - **The Grid Layout**:
    - A 2-column layout (collapsing to 1-column on mobile) featuring six beautifully designed slots:
      - **Slot 01: Connection** (The need to be known by name...)
      - **Slot 02: Rest** (The need for your whole system to trust...)
      - **Slot 03: Focus** (The need for one thing to mean enough...)
      - **Slot 04: Intimacy** (The need to be fully seen...)
      - **Slot 05: Meaning** (The need to pour yourself into something...)
      - **Slot 06: Mastery** (The need to become genuinely good...)
    - **Slot Card Style**: 
      - A `<details>` container formatted as a vertical card with border `1px solid border`, rounded corner design (`rounded-lg`), padding `p-6`.
      - Header features: Meta labels `SLOT 01` (font-mono, tracking-wider, text-[10px], `text-muted-foreground`) + Large elegant title.
      - On expansion, content is structured elegantly:
        - `H5` title: `"The real thing"` (styled in `text-accent-dark` HSL).
        - Paragraph details.
        - `H5` title: `"The thin echo"` (styled in `text-muted-foreground` HSL).
        - Paragraph details.
        - `H5` title: `"Where it's actually found"` (styled in `text-secondary` HSL).

---

### Section 5: The longing is real. So is the thing that broke.
- **ID**: `ache`
- **Theme**: LIGHT
- **Background**: `bg-background`
- **Container Max-Width**: `544px`
- **Padding Block**: `112px`
- **Content**:
  - Section marker: `— 04 · THE ACHE`
  - Heading (H2): `🥀 The longing is real. So is the thing that broke.`
  - Body text on unbundling of communal structures.
  - Highlight callout block:
    `"You are not addicted. You are homesick — for a fullness you've tasted and can't quite get back to alone."` (centered, italic, accented).
  - **Accordions**:
    1. **Trigger**: `"IN SCRIPTURE: The first picture of the break is hiding"`
    2. **Trigger**: `"IF YOU WANT THE ANATOMY: How a thin thing keeps you coming back"`

---

### Section 6: You don't fight the old love. A greater one displaces it.
- **ID**: `heart`
- **Theme**: LIGHT
- **Background**: `bg-background`
- **Container Max-Width**: `544px`
- **Padding Block**: `112px`
- **Content**:
  - Section marker: `— 05 · HOW THE HEART TURNS`
  - Heading (H2): `🔥 You don't fight the old love. A greater one displaces it.`
  - Highlighted quote block:
    `"“Oh, taste and see that the Lord is good.” Sight first, the turning follows the tasting."`
  - **Accordions**:
    1. **Trigger**: `"GO DEEPER: What the brain says about changing desire"`
    2. **Trigger**: `"IN SCRIPTURE: Transformation by beholding, not by striving"`

---

### Section 7: Affection is the engine. Practice is the riverbed.
- **ID**: `riverbed`
- **Theme**: LIGHT
- **Background**: `bg-background`
- **Container Max-Width**: `544px`
- **Padding Block**: `112px`
- **Content**:
  - Section marker: `— 06 · THE RIVERBED`
  - Heading (H2): `🏞️ Affection is the engine. Practice is the riverbed.`
  - **Action List Card**:
    - Styled block labeled `"START HERE THIS WEEK"` in rust-orange header.
    - List of structured micro-practices:
      1. Put the instrument on a stand...
      2. Eat one meal with people, no screens...
      3. Find one form of movement...
      4. Make one thing with your hands...
      5. Take a real Sabbath...
      6. Sit somewhere quiet long enough...
  - **Accordions**:
    1. **Trigger**: `"GO DEEPER: Nine re-integration moves you can run inside modernity"`
    2. **Trigger**: `"THE NECESSARY WARNING: Encounter without root withers — the sower"`

---

### Section 8: The story doesn't end at recovery. It ends at a feast.
- **ID**: `feast`
- **Theme**: LIGHT
- **Background**: `bg-background`
- **Container Max-Width**: `544px`
- **Padding Block**: `112px`
- **Content**:
  - Section marker: `— 07 · THE FEAST`
  - Heading (H2): `🍞 The story doesn't end at recovery. It ends at a feast.`
  - Sequential chronological points elegantly laid out in line blocks:
    - **Sinai**: The Law as integration scaffold...
    - **The Shema**: Heart, soul, strength...
    - **Incarnation**: The Word became flesh...
    - **The early church**: All things in common...
    - **New Jerusalem**: The city with a river...
  - **Accordions**:
    1. **Trigger**: `"IN SCRIPTURE: Come, all who thirst — and the river in the city"`

---

### Section 9: The honest objections.
- **ID**: `objections`
- **Theme**: LIGHT
- **Background**: `bg-background`
- **Container Max-Width**: `640px`
- **Padding Block**: `112px`
- **Content**:
  - Section marker: `— BEFORE YOU GO`
  - Heading (H2): `🤔 The honest objections.`
  - **Structured Objection Cards** (Grid of 4 items, styled block list):
    - Each objection card features a distinct rust-red left-border accent:
      - Border: `border border-border/80 border-l-[3px] border-l-accent`
      - Padding: `p-6`
      - Background: `bg-background/40`
      - Content format:
        - Bold, expressive Title (Italicized serif: e.g., `"“This is just a nicer way of telling me the same religion.”"`)
        - Sub-label tag row: `FAITH - OR WHY IT, DON'T FIT, HOW IT CAN'T` (small caps, mono, text-muted-foreground).
        - Detailed explanatory body response paragraphs.

---

## 5. Favicon

Instruct the builder to call `generate_favicon` using the site name `"The Living Spring"` and primary color `hsl(29, 17%, 30%)`.

---

## 6. Footer

- **Background**: `bg-background` (seamlessly blends with bottom of page)
- **Top Decorative Element**: Hairline rule `border-t border-border` spans the container width.
- **Text Color**: `hsl(35, 17%, 53%)` (dark-muted / soft tan text)
- **Centered Closing Text**:
  - Centered tagline styling:
    `"You were never going to fill it yourself."` (Italics serif text-muted-foreground)
    `"You were made to be filled."` (Italics serif text-accent block mt-1)
  - Horizontal block: `The Living Spring · Taste → Behold → Abide · read slowly`
  - Fine print bottom banner: `THE LIVING SPRING · A FIELD GUIDE TO FULLNESS · MMXXVI` (font-mono text-[9px] tracking-[0.2em] opacity-80 mt-16 text-center).

---

## 7. Files

- **Modify**:
  - `src/layouts/Layout.astro` (Set global background, load typography fonts, import `global.css`)
  - `src/components/Navigation.astro` (Sticky split-header structure, intersection observer navigation tracker, "Open All" custom JavaScript logic implementation)
  - `src/components/Footer.astro` (Minimal footer styling)
  - `src/pages/index.astro` (Structure and assemble all landing sections)
- **Create**:
  - `src/components/home/Hero.astro`
  - `src/components/home/Fullness.astro` (Section 1)
  - `src/components/home/Tasted.astro` (Section 2)
  - `src/components/home/Fountain.astro` (Section 3)
  - `src/components/home/Slots.astro` (Section 4 slot-grid cards)
  - `src/components/home/Ache.astro` (Section 5)
  - `src/components/home/Heart.astro` (Section 6)
  - `src/components/home/Riverbed.astro` (Section 7 practices block)
  - `src/components/home/Feast.astro` (Section 8)
  - `src/components/home/Objections.astro` (Section 9 card system)