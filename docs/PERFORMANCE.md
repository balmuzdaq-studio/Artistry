# Performance & Smooth-Loading Guide

How Artistry loads a heavy 3D/WebGL landing page (Spline runtime, three.js, and
several large videos) without the loader stuttering, without a flash of unstyled
content, and without the user ever watching a spinner wait on a 20 MB asset.

This is a field guide to the exact techniques used in this repository, why they
work, and where to find them in the code.

---

## The problem

A visually rich landing page fights three kinds of jank at once:

1. **Heavy JavaScript.** The Spline runtime plus three.js is multiple megabytes
   and blocks the main thread while it parses. Anything animated in JavaScript
   (a Lottie loader, a React-state progress bar) stutters while that parse runs.
2. **Heavy media.** Four showcase videos, two of them ~22 MB. Decoding several
   at once, or downloading them eagerly, stalls everything.
3. **First paint.** Before the bundled CSS is applied, elements render unstyled
   for a few frames — the classic "flash of unstyled content" (FOUC), which on a
   dark themed site shows up as a wrong-coloured flash.

The goal: the loader is always smooth, heavy work happens off the critical path,
and the user never sees the seams.

---

## 1. A loader that cannot stutter (CSS, not JavaScript)

**Principle:** anything that must stay smooth while heavy JS parses has to run on
the compositor thread, not the main thread. That means pure CSS animations on
`transform` / `opacity` / `background-position` — never a JS-driven animation
(Lottie, `requestAnimationFrame` state loops, GIFs).

The original loader used a Lottie JSON animation. Lottie runs on the main thread,
so it froze exactly when the Spline/three.js bundle was parsing — the worst
possible moment. It was replaced with a CSS-only loader:

- A shimmering wordmark: a moving `background-position` gradient clipped to text.
- An indeterminate bar: a `transform: translateX` sweep.

Both are GPU-composited, so they keep animating at 60fps even while the main
thread is fully blocked.

The overlay is also:

- **Opaque** (solid background) so it completely hides first paint and any FOUC
  underneath — the user sees a clean brand screen, not half-styled content.
- **Scroll-locked** (`document.body.style.overflow = "hidden"` while loading) so
  the reveal doesn't jump.
- Faded out with an `opacity` transition when the app is ready.

See `src/modules/Loader.jsx` and the `.loader-*` rules / `@keyframes` in
`src/index.css`.

```css
/* GPU-composited: unaffected by main-thread work */
.loader-wordmark { animation: loader-shimmer 1.5s linear infinite; }
@keyframes loader-shimmer { to { background-position: -150% 0; } }
```

---

## 2. Keep the heavy bundle off the critical path (code-splitting)

**Principle:** the biggest dependency should not be in the initial bundle. Load
it lazily, after first paint, behind a fallback.

The Spline runtime is imported with `React.lazy` + `Suspense` instead of a static
import. Vite then splits it into its own chunk that is fetched only when the hero
mounts — it never blocks the initial render.

Result in this project: the **main JS bundle dropped from ~3.8 MB to ~1.75 MB**;
the Spline runtime (~2 MB) is now a separate, deferred chunk.

```jsx
// src/modules/Home.jsx
const Spline = lazy(() => import("@splinetool/react-spline"));

<Suspense fallback={<HeroVisualFallback />}>
  <Spline scene="…" onLoad={() => setLoaded(true)} />
</Suspense>
```

Two details that make it feel instant:

- **A real fallback**, not a blank box — an animated gradient glow that matches
  the brand, so the hero is never empty while Spline streams in.
- **`onLoad` state** — the fallback stays until Spline reports it has actually
  rendered, so there is no black/empty frame in between.
- `<link rel="preconnect" href="https://prod.spline.design">` in `index.html`
  warms the TLS connection to the scene host so the fetch starts sooner.

---

## 3. Progressive media: never decode more than you show

**Principle:** heavy videos should be metadata-only until needed, only the
visible/active one should decode, and off-screen media should pause entirely.

The Models grid shows four clips but plays only one at a time:

- `preload="metadata"` — the browser fetches just enough to know duration/size,
  not the whole file.
- **Only the active tile plays**; the rest are paused. Four simultaneous 22 MB
  decodes would stall the compositor.
- **`IntersectionObserver`** pauses the active clip when the section scrolls
  off-screen and resumes it when it returns — no CPU/battery spent on a video
  nobody is looking at.
- Unused videos were removed from the import graph so Vite never bundles them
  (this alone cut ~15 MB from the build).

See `src/components/VideoCarousel.jsx`.

---

## 4. A paused `<video>` is not a reliable still — snapshot to `<canvas>`

**Principle:** pausing a `<video>` does not guarantee it keeps showing its last
frame. Browsers may drop a paused element's decoded frame buffer to save memory,
leaving a black square. If you need a frozen frame, capture it yourself.

When switching away from a playing tile, the current frame is drawn to a
`<canvas>` the instant before the video is paused. The canvas keeps that image no
matter what the video element does, so the resting tile always shows a real
picture. The incoming tile cross-fades from its canvas poster to the live video
on the `playing` event, so there is no black flash on either side.

```jsx
// draw the live frame, then pause — the canvas holds the picture
ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
video.pause();
```

Tiles that have never been watched get a poster frame seeked (~30% in) and drawn
to their canvas on load, so they are never black from the start either.

---

## 5. Smooth progress with `requestAnimationFrame`, not React state

**Principle:** a progress bar driven by the video `timeupdate` event looks jumpy,
because that event only fires ~4 times per second. And updating React state every
frame causes a full re-render 60 times a second. Do neither.

The progress bar is driven by a single `requestAnimationFrame` loop that writes
the width **directly to the DOM node** via a ref — no `timeupdate`, no React
re-render per frame:

```jsx
const tick = () => {
  barRef.current.style.width = `${(v.currentTime / v.duration) * 100}%`;
  raf = requestAnimationFrame(tick);
};
```

This is the general rule for high-frequency UI updates: bypass the framework and
mutate the DOM node directly, so the work is a single style write per frame
instead of a reconciliation pass.

---

## 6. Fonts: self-hosted, swapped, preloaded

**Principle:** never let a webfont block rendering or shift the layout late.

- **Self-hosted `woff2`** (no external font CDN) — one fewer third-party
  connection, no dependency on Google Fonts uptime, no extra DNS/TLS handshake.
- **`font-display: swap`** on every `@font-face` — text renders immediately in a
  fallback and swaps to the real face when it arrives; nothing is invisible while
  a font loads.
- **`<link rel="preload" as="font">`** for the two or three above-the-fold faces
  (the display weight + core body weights) so they start downloading in parallel
  with the CSS instead of after it.

See the `@font-face` block in `src/index.css` and the preload links in
`index.html`.

---

## 7. Kill the flash of unstyled content (FOUC)

**Principle:** the correct colours and theme must be applied on the *very first*
paint, before the bundled stylesheet loads. Inline the critical bits in `<head>`.

Two layers of defence:

1. **Inline critical tokens.** The palette CSS variables and the dark page
   background are duplicated in a small `<style>` in `index.html`. So even before
   the main stylesheet arrives, `html { background: … }` is already dark and every
   `var(--…)` resolves to the right colour. (In dev, Vite injects the app CSS via
   JavaScript, so without this there is a visible unstyled flash; in production
   the stylesheet is render-blocking, but the inline tokens make both paths
   identical.)
2. **Inline styles on glass elements.** A translucent element (`bg-surface/50`)
   is transparent until its Tailwind rule loads, briefly revealing whatever is
   behind it. The few such elements above the fold (the hero pill) set their
   background via an inline `style` that reads the CSS variable directly, so they
   are never see-through for a frame.

Plus the opaque loader from §1 covers the whole screen during this window as a
belt-and-braces backstop.

---

## 8. Respect the user and the compositor

- **`prefers-reduced-motion`** — a global media query drops all animation
  durations to near-zero, so every decorative animation (including the SVG
  "direction" scenes) becomes a clean static illustration for users who ask for
  reduced motion.
- **Animate only `transform` and `opacity`.** These are compositor properties;
  animating `width`/`top`/`left` triggers layout on every frame. `will-change`
  is set on the handful of elements that animate continuously.
- **Scroll-triggered reveals** (GSAP `ScrollTrigger`) run section entrance
  animations only when a section scrolls into view, so nothing animates
  off-screen.

---

## Checklist for the next heavy page

- [ ] Loader animation is pure CSS on `transform`/`opacity` (never JS/Lottie).
- [ ] Loader overlay is opaque and covers first paint; scroll is locked.
- [ ] The heaviest dependency is `lazy()`-loaded behind a real fallback.
- [ ] Preconnect to any third-party asset host.
- [ ] Media is `preload="metadata"`; only what's visible decodes/plays.
- [ ] Off-screen media is paused via `IntersectionObserver`.
- [ ] Frozen video frames are snapshotted to `<canvas>`, not left to `pause()`.
- [ ] High-frequency UI (progress bars) writes to the DOM via ref, not state.
- [ ] Fonts self-hosted, `font-display: swap`, above-the-fold faces preloaded.
- [ ] Critical theme tokens + background inlined in `<head>` to kill FOUC.
- [ ] `prefers-reduced-motion` honoured globally.
