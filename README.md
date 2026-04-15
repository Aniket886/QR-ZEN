<div align="center">

# 🔳 QR-ZEN

### ⚡ Free, Fast & Beautiful QR Code Generator

Built with **Next.js 16** · **Tailwind CSS v4** · **TypeScript**

[![Made with Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_a_Coffee-☕-orange)](https://buymeacoffee.com/aniket_tegginamath)

---

*A polished, responsive QR code generator with glass-panel UI, live preview, presets, and multi-format export.*

</div>

---

## ✨ New Look Design

The UI has been completely redesigned with a modern glass-panel aesthetic and fully responsive behavior:

- 🎨 Gradient background with layered radial effects
- 🌗 Theme-aware color system (light / dark mode)
- 🪟 Card-based layout with soft borders and depth
- 📱 Responsive panel sizing for desktop, tablet, and mobile
- 🎛️ Adaptive customization controls (auto-fit color blocks, fluid spacing)
- 📌 Sticky preview section on larger screens

---

## 🚀 Features

### QR Types
- URL, Text, WiFi, Email, Phone, SMS

### Live Preview
- Instant QR code rendering as you type

### Visual Customization
- QR size slider
- Foreground / background color pickers
- Design presets: **Classic**, **Midnight**, **Ocean**, **Sunset**
- QR shape: Square or Rounded
- Optional logo embedding

### Presets & Sharing
- Save named presets to local storage
- Apply / delete presets anytime
- Shareable preset links via `?preset=...`

### Export Options
- 📥 PNG download
- 📥 SVG download
- 📋 Copy raw encoded data

### PWA Support
- PWA-ready setup with manifest

---

## 🛠️ Tech Stack

| Technology        | Version / Details     |
|-------------------|-----------------------|
| Next.js           | 16 (App Router)       |
| React             | + TypeScript          |
| Tailwind CSS      | v4                    |
| `qrcode.react`    | QR rendering          |
| `lucide-react`    | Icon library          |

---

## 📁 Project Structure

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

## 🏁 Getting Started

```

npm install

npm run dev

```

Open http://localhost:3000.

---

## 🎨 Using Presets

1. Configure your QR type, data, and visual settings.
2. Enter a preset name in the **Presets** card and click **Save Preset**.
3. Use **Apply** to restore a preset, **Delete** to remove it, and **Share** to copy a shareable URL.

---

## 📦 Build

```

npm run build

npm start

```

---

## 👤 Developer & Footer Info

The footer includes:

- **Product label:** `QR Generator`
- **Version:** `v1.0.0`
- **Developer credit:** Made with ♥ by [Aniket Tegginamath](https://linktr.ee/anikettegginamath) for quick sharing
- ☕ [Buy Me a Coffee](https://buymeacoffee.com/aniket_tegginamath)

---

---

<div align="center">

**📄 MIT © [Aniket Tegginamath](https://linktr.ee/anikettegginamath)**

</div>
