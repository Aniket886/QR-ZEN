# QR-ZEN - Free QR Generator

A polished, responsive QR code generator built with Next.js 16 and Tailwind CSS.

## New Look Design

The UI has been redesigned with a modern glass-panel style and responsive behavior:

- Gradient background with layered radial effects
- Theme-aware color system (light/dark)
- Card-based layout with soft borders and depth
- Responsive panel sizing for desktop, tablet, and mobile
- Adaptive customization controls (auto-fit color blocks, fluid spacing)
- Sticky preview section on larger screens

## Features

- QR types: URL, Text, WiFi, Email, Phone, SMS
- Live QR preview
- Visual customization:
  - QR size slider
  - Foreground/background color pickers
  - Design presets: Classic, Midnight, Ocean, Sunset
  - QR shape: Square or Rounded
  - Optional logo embedding
- Presets and sharing:
  - Save named presets to local storage
  - Apply/delete presets anytime
  - Shareable preset links via `?preset=...`
- Export options:
  - PNG download
  - SVG download
  - Copy raw encoded data
- PWA-ready setup with manifest

## Tech Stack

- Next.js 16 (App Router)
- React + TypeScript
- Tailwind CSS v4
- `qrcode.react`
- `lucide-react`

## Project Structure

```txt
src/
  app/
  components/
    layout/
    qr/
    ui/
  config/
  hooks/
  lib/
```

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Using Presets

1. Configure QR type, data, and visual settings.
2. Enter a preset name in the Presets card and click `Save Preset`.
3. Use `Apply` to restore a preset, `Delete` to remove it, and `Share` to copy a share URL.

## Build

```bash
npm run build
npm start
```

## Developer & Footer Info

Footer includes:

- Product label: `Free QR Generator`
- Version: `v1.0.0`
- Developer credit: `Made with ♥ by Aniket Tegginamath for quick sharing`
- Portfolio link: `https://linktr.ee/anikettegginamath`
- Buy Me a Coffee link: `https://buymeacoffee.com/aniket_tegginamath`

Footer component location:

- `src/components/layout/Footer.tsx`

## Notes for Contributors

- Keep visual language consistent with existing glass-card system.
- Preserve responsive behavior in narrow cards and small screens.
- Keep QR output scannable: avoid clipping the matrix itself.
- Follow local repository rule in `AGENTS.md` for Next.js version-specific guidance.
