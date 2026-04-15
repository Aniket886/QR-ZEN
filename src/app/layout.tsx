import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Free QR Generator',
  description: 'Generate QR codes instantly - no registration required. Create QR codes for URLs, text, WiFi, email, phone, and SMS.',
  keywords: ['QR code generator', 'QR code', 'free QR', 'QR generator', 'QR maker'],
  authors: [{ name: 'Free QR Generator' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/branding/qrzen-logo.png',
    shortcut: '/branding/qrzen-logo.png',
    apple: '/branding/qrzen-logo.png',
  },
  openGraph: {
    title: 'Free QR Generator',
    description: 'Generate QR codes instantly with clean design presets and fast export.',
    images: ['/branding/qrzen-logo.png'],
  },
  twitter: {
    card: 'summary',
    title: 'Free QR Generator',
    description: 'Generate QR codes instantly with clean design presets and fast export.',
    images: ['/branding/qrzen-logo.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Free QR Generator',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#6366f1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => {
            const storageKey = 'theme';
            const root = document.documentElement;
            const stored = localStorage.getItem(storageKey);
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = stored === 'light' || stored === 'dark' ? stored : (systemDark ? 'dark' : 'light');
            root.classList.toggle('dark', theme === 'dark');
            root.setAttribute('data-theme', theme);
            root.style.colorScheme = theme;
          })();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
