![Logo](https://raw.githubusercontent.com/BALMUZDAQ-STUDIO/Balmuzdaq-logos/refs/heads/main/Balmuz_logo_1.png)

<h1 align="center">Artistry</h1>

<p align="center"><b>Artistry</b> is a universal WebAR creation platform — augmented reality that runs straight from the browser, with no app to install. This repository is the product's marketing site: an interactive, 3D-driven landing page that lets visitors explore models, video, and live demos right on the page.</p>

![Artistry](https://raw.githubusercontent.com/balmuzdaq-studio/Artistry/main/public/og.png)

## Features

- **Interactive 3D hero** — a live Spline scene, lazy-loaded so it never blocks first paint, with a branded fallback while it streams in.
- **In-browser 3D model viewer** — a three.js / react-three-fiber viewer with drag-to-rotate, colour finishes, and size switching.
- **Model showcase** — a video grid that plays one clip at a time with a smooth 60fps progress bar; resting tiles are snapshotted to canvas so a switch never flashes black.
- **Directions** — a use-cases section (biology, physics, geography, chemistry, engineering, art), each illustrated with its own hand-built animated SVG scene.
- **Dual palette design system** — an "Aurora" (cyan-to-green) and a "Spectral" (violet-to-cyan) theme, driven entirely by CSS variables and switchable with a single `data-palette` flag.
- **Responsive and accessible** — fluid type, mobile navigation, visible focus states, and full `prefers-reduced-motion` support.


## Tech Stack

- **React 18** + **Vite 5** — application framework and build tooling.
- **Tailwind CSS 3** — utility styling on top of a CSS-variable token system.
- **three.js** + **@react-three/fiber** + **@react-three/drei** — the 3D model viewer.
- **Spline** (`@splinetool/react-spline`) — the interactive hero scene.
- **GSAP** + **@gsap/react** (ScrollTrigger) — scroll-triggered reveals.
- **Bricolage Grotesque** + **Inter** — self-hosted display and body typefaces.
- **ESLint** + **Prettier** — linting and formatting.

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/balmuzdaq-studio/Artistry.git
    cd Artistry
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the dev server:

    ```bash
    npm run dev
    ```

    The site runs at `http://localhost:5173`.

4. Build for production and preview the build:

    ```bash
    npm run build
    npm run preview
    ```

Lint the project with `npm run lint`.

## Project Structure

```
public/assets/       fonts, icons, images, videos, and the 3D model (.glb)
src/
  modules/           page sections (Header, Home, AboutUs, Directions, Models, Demo, Footer, Loader)
  components/        composite pieces (VideoCarousel, ModelView, IPhone, FeaturesList, CardTable, Lights)
  UI/                primitives (CustomButton, Card, Feature, DirectionScene)
  constants/         data, icons, images, videos
  hooks/ utils/      GSAP animation helpers
  index.css          design tokens (dual palette), fonts, and component/utility layers
index.html           metadata, favicons, critical inline tokens, font preloads
docs/PERFORMANCE.md  smooth-loading techniques used across the site
```

## Design

The colour system lives in CSS variables in `src/index.css` and is exposed to
Tailwind as tokens. The whole site can be re-themed by changing one attribute in
`index.html`:

```html
<html lang="en" data-palette="aurora">   <!-- or "spectral" -->
```

## Deployment

The site is a static single-page app — build with `npm run build` and deploy the
`dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, GitHub
Pages). Once a production domain is live, fill in the canonical, `og:url`, and
JSON-LD URL fields marked with a `DEPLOY TODO` in `index.html`.

## Authors

- [@maksimkaprosuperhacker](https://github.com/maksimkaprosuperhacker) — team lead, frontend, development
- [@Zloyproger777](https://github.com/Zloyproger777) — design

## Feedback

If you have any feedback, please reach out to us at balmuzdaq.studio@gmail.com

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
