# UzOFin Landing Page

A responsive, animated recreation of the UzOFin fintech landing page, built with React, Vite, Tailwind CSS 4, and GSAP.

**Live site:** https://uzo-fin-mew9-delta.vercel.app/

## Setup

### Prerequisites

- Node.js 20.19+ (tested on v26.13.1 LTS)
- npm

### Install

```bash
git clone <repo-url>
cd uzoFin
npm install
```

## Run

### Development server

```bash
npm run dev
```

Opens at `http://localhost:5173/` (Vite picks another port automatically if that one is busy).

### Production build

```bash
npm run build
```

Outputs static files to `dist/`.

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Assumptions

- No backend/API exists — all CTAs, forms, and links are static placeholders, not wired to real endpoints.
- Content (copy, stats, testimonials, social links) is illustrative, recreated to match the visual prototype rather than sourced from a real UzOFin API or CMS.
- Target audience is modern evergreen desktop/mobile browsers; no legacy browser (e.g. IE11) support was attempted.
- Sound effects are optional UX polish, synthesized via the Web Audio API — no audio asset files are bundled.

## Known Issues

- Web Audio sounds require an initial user gesture (click/tap) before playing, due to browser autoplay policies — this is expected browser behavior, not a bug.
- A couple of Tailwind class lint notes exist for shorthand utilities (e.g. `border-l-1` vs `border-l`) that are cosmetic and don't affect rendering.
- Deep responsive QA (very small/very large viewports) and a final pixel-diff pass against the reference design are still pending.
- No automated test suite is set up yet.


------------------



npm create vite@latest . -- --template react -y
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && nvm use --lts && npm install && npm install -D tailwindcss postcss autoprefixer && npm install gsap

npm install -D @tailwindcss/vite && npm uninstall postcss autoprefixer

npm install --no-save sharp

---------------------------
cd /home/adarsh/Documents/Trials/uzoFin && node -e "
const sharp = require('sharp');
const fs = require('fs');
const dir = 'src/assets/testimonials';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
(async () => {
  for (const f of files) {
    const p = dir + '/' + f;
    const before = fs.statSync(p).size;
    const buf = await sharp(p).resize({ width: 900 }).png({ quality: 70, compressionLevel: 9 }).toBuffer();
    fs.writeFileSync(p, buf);
    const after = fs.statSync(p).size;
    console.log(f, (before/1024).toFixed(0)+'KB', '->', (after/1024).toFixed(0)+'KB');
  }
})();
"
---------------------------