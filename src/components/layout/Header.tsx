'use client';

import Link from 'next/link';
import { QrCode, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useEffect, useState } from 'react';

export function Header() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'color-mix(in srgb, var(--color-bg-secondary) 84%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
      }}
    >
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl text-white"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                boxShadow: '0 16px 30px rgb(109 94 252 / 0.24)',
              }}
            >
              <QrCode className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px]"
                style={{ color: 'var(--color-primary)' }}
              >
                <Sparkles className="h-3 w-3" />
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                Free QR Generator
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                Fast, polished, installable QR creation
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-full px-3 py-1 text-xs font-medium sm:block"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}
            >
              PWA Ready
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              disabled={!mounted}
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-200 hover:scale-[1.03] disabled:cursor-default"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span className="absolute inset-0 rounded-2xl" style={{ boxShadow: 'var(--shadow-sm)' }} />
              <span className="relative flex h-5 w-5 items-center justify-center">
                <Sun
                  className={`absolute h-5 w-5 text-amber-400 transition-all duration-300 ${mounted && theme === 'dark' ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}
                />
                <Moon
                  className={`absolute h-5 w-5 text-indigo-500 transition-all duration-300 ${mounted && theme === 'light' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
