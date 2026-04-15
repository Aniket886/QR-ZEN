'use client';

import { Sparkles, Heart, Coffee } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t py-4 sm:py-5" style={{ borderColor: 'var(--color-border)' }}>
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
              Free QR Generator
            </span>
            <span className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>v1.0.0</span>
          </div>
          <div className="flex items-center gap-1 text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
            <span>Made with</span>
            <Heart className="h-4 w-4 text-rose-500" />
            <span>by</span>
            <a
              href="https://linktr.ee/anikettegginamath"
              target="_blank"
              rel="noopener noreferrer"
              className="animate-pulse text-sm font-semibold sm:text-base"
              style={{ color: 'var(--color-primary)' }}
            >
              Aniket Tegginamath
            </a>
            <span>for quick sharing</span>
            <a
              href="https://buymeacoffee.com/aniket_tegginamath"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold transition sm:text-sm"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border)',
              }}
            >
              <Coffee className="h-3.5 w-3.5" />
              Buy Me a Coffee
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
