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
  - Optional logo embedding
- Export options:
  - PNG download
  - SVG download
  - Copy raw data
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

## Build

```bash
npm run build
npm start
```

## Developer & Footer Info

Footer includes:

- Product label: `Free QR Generator`
- Version: `v1.0.0`
- Developer credit: `Made with <3 by Aniket886 for quick sharing`

Footer component location:

- `src/components/layout/Footer.tsx`

## Notes for Contributors

- Keep visual language consistent with existing glass-card system.
- Preserve responsive behavior in narrow cards and small screens.
- Follow local repository rule in `AGENTS.md` for Next.js version-specific guidance.
