<div align="center">

# QR-ZEN

### Free, Fast & Beautiful QR Code Generator

Built with **Next.js 16** · **Tailwind CSS v4** · **TypeScript**

---

*A polished, responsive QR code generator with live preview, presets, customization, and multi-format export.*

</div>

---

## Live Demo

Production URL: https://qr-zen.vercel.app/

This is the current hosted version of the project on Vercel.

---

## New Look Design

The UI is built as a responsive single-dashboard workspace with a clean builder flow and live preview:

- Editorial dashboard-inspired layout
- Theme-aware interface with dark-first contrast
- Responsive panels for laptop, desktop, tablet, and mobile
- Integrated builder, presets, customize controls, and live preview
- Branded header, favicon, manifest icons, and footer links

---

## Features

### QR Types

- URL
- Text
- WiFi
- Email
- Phone
- SMS

### Live Preview

- Instant QR code rendering as you type
- Export-ready preview panel with live updates

### Visual Customization

- QR size slider
- Foreground / background color pickers
- Design presets: **Classic**, **Midnight**, **Ocean**, **Sunset**
- QR shape: **Square** or **Rounded**
- Optional logo embedding

### Presets & Sharing

- Save named presets to local storage
- Apply / delete presets anytime
- Shareable preset links via `?preset=...`

### Export Options

- PNG download
- SVG download
- Copy raw encoded data

### PWA Support

- Installable PWA manifest
- Branded app icon / favicon

---

## Tech Stack

| Technology | Version / Details |
|---|---|
| Next.js | 16 (App Router) |
| React | 19 + TypeScript |
| Tailwind CSS | v4 |
| `qrcode.react` | QR rendering |
| `lucide-react` | Icon library |

---

## Project Structure

```

src/

├── app/

├── components/

│   ├── layout/

│   ├── qr/

│   └── ui/

├── config/

├── hooks/

└── lib/

```

---

## Getting Started

```

npm install

npm run dev

```

Open `http://localhost:3000`.

---

## Using Presets

1. Configure your QR type, data, and visual settings.
2. Enter a preset name in the **Presets** section and click **Save Preset**.
3. Use **Apply** to restore a preset, **Delete** to remove it, and **Share** to copy a shareable URL.

---

## Build

```

npm run build

npm start

```

---

## Deployment

- Production: https://qr-zen.vercel.app/
- Hosting platform: Vercel

---

## Developer & Footer Info

The footer includes:

- **Product label:** `QR-ZEN`
- **Version:** `v1.0.0`
- **Developer credit:** Made with heart by [Aniket Tegginamath](https://linktr.ee/anikettegginamath)
- **Support link:** [Buy Me a Coffee](https://buymeacoffee.com/aniket_tegginamath)

---

<div align="center">

**MIT © [Aniket Tegginamath](https://linktr.ee/anikettegginamath)**

</div>
