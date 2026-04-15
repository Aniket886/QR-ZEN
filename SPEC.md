# Free QR Generator - Project Specification

## 1. Project Overview

**Project Name:** Free QR Generator  
**Type:** Progressive Web Application (PWA)  
**Core Functionality:** A client-side QR code generator that allows users to create various types of QR codes (URL, Text, WiFi, Email, Phone, SMS) with customization options and download capability.  
**Target Users:** General users needing quick QR code generation without registration or payment.

---

## 2. Technical Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **QR Library:** qrcode.react
- **PWA:** next-pwa
- **Icons:** Lucide React

---

## 3. UI/UX Specification

### Layout Structure

```
┌─────────────────────────────────────────┐
│              Header                      │
│  Logo + Title + Dark Mode Toggle         │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │      QR Type Selector           │   │
│  │  [URL][Text][WiFi][Email]...    │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │      Input Form Panel           │   │
│  │  (Dynamic based on QR type)    │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌───────────────┐  ┌───────────────┐  │
│  │   QR Preview  │  │ Customization │  │
│  │               │  │    Options    │  │
│  └───────────────┘  └───────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│              Footer                     │
└─────────────────────────────────────────┘
```

### Responsive Breakpoints

- **Mobile:** < 640px (single column, stacked layout)
- **Tablet:** 640px - 1024px (two column where appropriate)
- **Desktop:** > 1024px (full layout with side-by-side panels)

### Visual Design

**Color Palette:**
- Primary: `#6366f1` (Indigo-500)
- Primary Hover: `#4f46e5` (Indigo-600)
- Secondary: `#10b981` (Emerald-500)
- Background: `#f8fafc` (Slate-50) / Dark: `#0f172a` (Slate-900)
- Surface: `#ffffff` / Dark: `#1e293b` (Slate-800)
- Border: `#e2e8f0` (Slate-200) / Dark: `#334155` (Slate-700)
- Text Primary: `#1e293b` (Slate-800) / Dark: `#f1f5f9` (Slate-100)
- Text Secondary: `#64748b` (Slate-500)

**Typography:**
- Font Family: `"Inter", system-ui, sans-serif`
- Headings: 700 weight, tracking tight
- Body: 400 weight, line-height 1.5

**Spacing:**
- Base unit: 4px
- Container max-width: 1280px
- Section padding: 24px (mobile), 48px (desktop)
- Card padding: 24px

**Visual Effects:**
- Card shadows: `shadow-lg` on hover
- Border radius: `rounded-xl` for cards, `rounded-lg` for buttons
- Transitions: 200ms ease for all interactive elements

### Components

1. **Header**
   - Logo (QR icon + "Free QR Generator" text)
   - Theme toggle button (sun/moon icons)

2. **QR Type Selector**
   - Horizontal scrollable tabs on mobile
   - Icons + labels for each type
   - Active state with primary color underline

3. **Input Form Panel**
   - Dynamic form fields based on QR type
   - Validation indicators
   - Clear form button

4. **QR Preview Panel**
   - Live QR code display
   - Download buttons (PNG, SVG)
   - Copy to clipboard button

5. **Customization Panel**
   - Size slider (128-512px)
   - Color pickers (foreground/background)
   - Include logo checkbox + upload

6. **Footer**
   - Minimal branding
   - Version info

---

## 4. Functionality Specification

### QR Types Supported

| Type | Fields | Example |
|------|--------|---------|
| URL | url | https://example.com |
| Text | text | Hello World |
| WiFi | ssid, password, encryption (WPA/WEP/None) | MyNetwork |
| Email | email, subject, body | test@mail.com |
| Phone | phone | +1234567890 |
| SMS | phone, message | +1234567890 |

### Core Features

1. **Real-time QR Generation**
   - Debounced input (300ms)
   - Live preview updates

2. **Customization**
   - QR size: 128px to 512px (default 256px)
   - Foreground color: picker (default #000000)
   - Background color: picker (default #ffffff)
   - Logo overlay: optional image upload

3. **Export Options**
   - Download as PNG
   - Download as SVG
   - Copy to clipboard

4. **PWA Features**
   - Installable on mobile/desktop
   - Offline support (service worker)
   - Add to homescreen prompt

5. **Theme**
   - Light/Dark mode toggle
   - Persisted in localStorage

### Validation Rules

- URL: valid URL format required
- Email: valid email format required
- Phone: valid phone number format
- WiFi SSID: required, max 32 characters
- Text: max 1000 characters

---

## 5. Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── qr/
│   │   ├── QRTypeSelector.tsx
│   │   ├── QRPreview.tsx
│   │   ├── InputForms/
│   │   │   ├── UrlForm.tsx
│   │   │   ├── TextForm.tsx
│   │   │   ├── WiFiForm.tsx
│   │   │   ├── EmailForm.tsx
│   │   │   ├── PhoneForm.tsx
│   │   │   └── SmsForm.tsx
│   │   └── CustomizationPanel.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       └── Toggle.tsx
├── config/
│   └── qr-types.ts         # QR type definitions
├── hooks/
│   ├── useQRGenerator.ts
│   └── useTheme.ts
├── lib/
│   ├── utils.ts            # Helper functions
│   └── types.ts            # Shared types
└── public/
    ├── manifest.json       # PWA manifest
    └── icons/              # PWA icons
```

---

## 6. Acceptance Criteria

- [ ] Page loads without errors
- [ ] All 6 QR types are selectable and functional
- [ ] QR code generates in real-time as user types
- [ ] Download PNG works
- [ ] Download SVG works
- [ ] Copy to clipboard works
- [ ] Customization options update QR in real-time
- [ ] Dark/Light mode toggle works and persists
- [ ] PWA is installable (manifest configured)
- [ ] Responsive on mobile, tablet, desktop
- [ ] TypeScript has no errors
- [ ] No console errors in production build