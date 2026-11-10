# Akaza Snowfall

A minimal, full-screen React website: Akaza artwork, layered live snowfall, and your supplied background music.

## Responsive design

The scene fills the available viewport on desktop, tablets, and phones. It uses dynamic viewport sizing for mobile browsers, keeps the character centered, and adapts image cropping for portrait phones and short landscape screens. The 4K source artwork remains crisp on high-density displays.

## Run it

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually http://localhost:5173).

## Snowfall

Two independent `react-snowfall` canvas layers create depth:
- distant layer: many small, slow flakes
- foreground layer: fewer, larger, faster, softly blurred flakes

## Background music

The supplied audio is at `public/akaza-theme.mp3`. Music fades in after the visitor's first click/tap or key press because browsers generally block autoplay with sound until a user gesture.

## Production build

```bash
npm run build
npm run preview
```

The character artwork is bundled locally as a 3840 × 2160 WebP image.
