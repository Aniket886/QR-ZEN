'use client';

import { cn } from '@/lib/utils';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function ColorPicker({ value, onChange, label, className }: ColorPickerProps) {
  return (
    <div className={cn('flex h-full min-w-0 flex-col justify-between gap-3', className)}>
      {label && (
        <label className="block text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
          {label}
        </label>
      )}
      <div className="flex min-w-0 items-center gap-3 max-[420px]:flex-col max-[420px]:items-start">
        <div className="relative shrink-0">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-11 w-11 cursor-pointer rounded-xl border-0 sm:h-12 sm:w-12"
            style={{ padding: 0 }}
          />
          <div 
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ 
              boxShadow: 'inset 0 2px 4px rgb(0 0 0 / 0.1), inset 0 -2px 4px rgb(255 255 255 / 0.1)' 
            }}
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
              onChange(val);
            }
          }}
          className="w-full min-w-0 flex-1 rounded-xl px-3.5 py-2.5 text-sm font-mono transition-all duration-200 focus:outline-none focus:ring-4 sm:px-4 sm:py-3"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
            '--tw-ring-color': 'rgb(99 102 241 / 0.2)'
          } as React.CSSProperties}
          placeholder="#000000"
        />
      </div>
    </div>
  );
}
