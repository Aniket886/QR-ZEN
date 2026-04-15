'use client';

import { Sparkles, Heart } from 'lucide-react';

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
            <span>for quick sharing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
