# UzOFin Landing Page

A responsive, animated fintech landing page built to recreate the UzOFin visual prototype. The project presents banking, payments, payouts, merchant onboarding, API, support, and final conversion sections in one polished single-page experience.

## Highlights

- Responsive React landing page for desktop, tablet, and mobile
- Tailwind CSS 4 styling with custom UzOFin brand colors
- GSAP and ScrollTrigger animations
- Scroll reveal and animated number counters
- Infinite horizontal marquees
- Hover-controlled navigation dropdowns
- Zig-zag GSAP card motion
- Floating/decorative image animations
- Synthesized click and hover sounds using the Web Audio API
- The sound is enerated entirely in code at runtime
- Persistent sound mute state with `localStorage`
- Preloader experience
- Vite hot module replacement for fast development

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI |
| Vite 8 | Development server and production build tooling |
| Tailwind CSS 4 | Utility-first styling |
| GSAP 3 | Timeline, reveal, marquee, and scroll animations |
| ScrollTrigger | Scroll-driven animation control |
| Oxlint | JavaScript/React linting |
| Web Audio API | Browser-generated UI sound effects |
| IntersectionObserver | Triggering counters when elements enter the viewport |

## Page Sections

1. **Header** — Logo, navigation, dropdown menus, sound control, mobile menu, and primary CTA.
2. **Hero** — Gradient headline, supporting copy, decorative background frames, and action buttons.
3. **Logo Strip** — Partner/trust logos presented as a seamless marquee.
4. **Feature Showcase** — Performance statistics, animated counters, ribbon artwork, and financial-suite cards.
5. **API CTA** — Developer-focused callout with floating line-art background.
6. **Why UzOFin** — Three themed feature marquees with alternating scroll directions.
7. **Industry Standard** — Horizontal marquee cards with GSAP zig-zag vertical motion and hover indicators.
8. **Final CTA** — Future-focused conversion section with floating disc artwork and CTAs.
9. **Footer** — Product, company, legal, and social links.

## Run Locally

Open a terminal in the project folder and run:

```bash
cd /home/adarsh/Documents/Trials/uzoFin
npm install
npm run dev
```


## Live site

https://uzo-fin-mew9-delta.vercel.app/


Then open the URL printed by Vite in a browser:

```text
http://localhost:5173/
```

If that port is already in use, Vite will automatically use another port, such as `5174`, and print the correct URL. Press `Ctrl+C` in the terminal to stop the local server.

## Getting Started

### Prerequisites

- Node.js 20.19+ or a compatible newer LTS release
- npm

### Development Server

For later runs, from the project folder, only this command is needed:

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

The optimized production files are generated in `dist/`.

### Preview the Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Animation and Interaction Details

### Scroll Reveals

`useScrollReveal` applies GSAP fade and upward-motion effects when an element enters the viewport. Passing `stagger` can animate direct child elements individually.

### Animated Counters

`useCounter` uses `IntersectionObserver` and GSAP to animate numeric values once they become visible.

### Marquees

`useMarquee` creates an infinite scrolling track, clones the first track for seamless looping, and pauses animation on hover or focus.

### Zig-Zag Cards

The Industry Standard section combines horizontal marquee movement with alternating GSAP vertical movement. The animation uses a staggered sine-based easing curve to keep the card row visually fluid.


### Sound Effects

UI clicks and hover sounds are browser generated with `AudioContext`; no external audio files are required. Sound preferences are saved under:

```text
uzofin:sound-muted
```

Use the sound toggle in the header to mute or enable feedback.

## Assets

Source assets are organized inside `src/assets/` according to page section. Imported assets are processed and hashed by Vite during production builds.

Recommended asset practices:

- Use PNG/WebP images for decorative graphics and transparent artwork.
- Keep original source artwork in `assets/` or a source-assets folder.
- Optimize large images before adding them to the application.
- Preserve meaningful `alt` text for content images and use `alt=""` for decorative images.

## Styling

Global theme values and brand tokens are declared in `src/index.css` with Tailwind CSS 4’s 

Important brand colors include:

- Brand purple: `#8A3FFC`
- Accent pink: `#FF3F8E`
- Accent blue: `#3F9AFF`
- Dark ink: `#0B0712`
- Bright purple hover: `#8C01FA`
- Dark violet: `#6300B1`

The Poppins font family is configured for the application typography.

## Customization

Common project updates:

- **Navigation links:** update `NAV_LINKS` in `src/components/layout/Header.jsx`.
- **Mobile links:** update `src/components/layout/MobileNav.jsx`.
- **Hero copy:** update `src/components/sections/Hero.jsx`.
- **Financial statistics/cards:** update `HERO_STATS` and `FEATURE_CARDS` in `FeatureShowcase.jsx`.
- **Marquee content:** update row arrays in `WhyUzoFin.jsx` and `INDUSTRY_CARDS` in `Testimonials.jsx`.
- **Footer links:** update `COLUMNS` and `SOCIAL` in `Footer.jsx`.
- **Brand theme:** update CSS variables in `src/index.css`.
- **Animation timing:** adjust options passed to GSAP hooks or individual GSAP tweens.

## Browser Support

The project targets modern evergreen browsers with support for:

- CSS Grid and Flexbox
- ES modules
- `IntersectionObserver`
- Web Audio API
- GSAP and ScrollTrigger

## Known Considerations

- Browser autoplay restrictions require an initial user gesture before Web Audio tones can play.
- `useMarquee` can clone animated tracks; list keys and accessibility attributes should remain unique and valid.
- GSAP transforms should be used with Tailwind transforms carefully to avoid transform conflicts.
- External links and CTA destinations can be replaced with more real product URLs or route anchors.

## Assumptions

- No backend/API exists — all CTAs, forms, and links are static placeholders, not wired to real endpoints.
- Content (copy, stats, testimonials, social links) is illustrative, recreated to match the visual prototype rather than sourced from a real UzOFin API or CMS.
- Sound effects are optional UX polish, synthesized via the Web Audio API — no audio asset files are bundled.