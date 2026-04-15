'use client';

import { QRGeneratorOptions } from '@/config/qr-types';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { Toggle } from '@/components/ui/Toggle';
import { Input } from '@/components/ui/Input';
import { Slider } from '@/components/ui/Slider';
import { Palette, Maximize2 } from 'lucide-react';

interface CustomizationPanelProps {
  options: QRGeneratorOptions;
  onChange: (options: Partial<QRGeneratorOptions>) => void;
}

const designPresets: Record<
  QRGeneratorOptions['designPreset'],
  Pick<QRGeneratorOptions, 'fgColor' | 'bgColor' | 'qrShape' | 'marginSize'>
> = {
  classic: { fgColor: '#000000', bgColor: '#ffffff', qrShape: 'square', marginSize: 0 },
  midnight: { fgColor: '#8c7bff', bgColor: '#0b1328', qrShape: 'rounded', marginSize: 1 },
  ocean: { fgColor: '#006b7a', bgColor: '#e9fdff', qrShape: 'rounded', marginSize: 1 },
  sunset: { fgColor: '#7a245a', bgColor: '#fff1f2', qrShape: 'rounded', marginSize: 3 },
};

const designOptions: { value: QRGeneratorOptions['designPreset']; label: string; description: string }[] = [
  { value: 'classic', label: 'Classic', description: 'Neutral black on white' },
  { value: 'midnight', label: 'Midnight', description: 'High-contrast dark theme' },
  { value: 'ocean', label: 'Ocean', description: 'Fresh cyan and soft light' },
  { value: 'sunset', label: 'Sunset', description: 'Warm editorial accent' },
];

const shapeOptions: { value: QRGeneratorOptions['qrShape']; label: string; description: string }[] = [
  { value: 'square', label: 'Square', description: 'Sharp and technical' },
  { value: 'rounded', label: 'Rounded', description: 'Softer visual feel' },
];

export function CustomizationPanel({ options, onChange }: CustomizationPanelProps) {
  return (
    <div className="min-w-0 space-y-6">
      <div className="min-w-0">
        <p className="section-label">Customize</p>
        <div className="mt-2 flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
            <Palette className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
          </div>
          <div className="min-w-0">
            <h2 className="min-w-0 text-base font-semibold leading-snug sm:text-lg sm:leading-6" style={{ color: 'var(--color-text-primary)' }}>
              Fine-tune the visual output
            </h2>
            <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Adjust size, colors, style, and branding in one flow.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <section className="space-y-4 rounded-[1.35rem] border p-4 sm:p-5" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-tertiary)' }}>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <Maximize2 className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
            <span className="text-sm font-semibold tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
              Size
            </span>
            <span className="ml-auto shrink-0 text-sm font-bold max-[360px]:w-full max-[360px]:text-left" style={{ color: 'var(--color-primary)' }}>
              {options.size}px
            </span>
          </div>
          <Slider
            value={options.size}
            onChange={(value) => onChange({ size: value })}
            min={128}
            max={512}
            step={64}
          />
        </section>

        <section className="space-y-4 border-t pt-6" style={{ borderColor: 'var(--color-border)' }}>
          <div>
            <p className="text-sm font-semibold tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
              Colors
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Set contrast clearly so the code stays sharp and scannable.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="rounded-2xl border p-3.5 sm:p-4" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-tertiary)' }}>
              <ColorPicker
                label="Foreground"
                value={options.fgColor}
                onChange={(fgColor) => onChange({ fgColor })}
              />
            </div>
            <div className="rounded-2xl border p-3.5 sm:p-4" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-tertiary)' }}>
              <ColorPicker
                label="Background"
                value={options.bgColor}
                onChange={(bgColor) => onChange({ bgColor })}
              />
            </div>
          </div>
        </section>

        <section className="space-y-4 border-t pt-6" style={{ borderColor: 'var(--color-border)' }}>
          <div>
            <p className="text-sm font-semibold tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
              Style
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Pick a preset and module shape without crowding the controls.
            </p>
          </div>
          <div className="space-y-3">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--color-text-muted)' }}>
                Design Preset
              </p>
              <div className="grid gap-2">
                {designOptions.map((preset) => {
                  const active = options.designPreset === preset.value;
                  return (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => onChange({ designPreset: preset.value, ...designPresets[preset.value] })}
                      className="flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200"
                      style={{
                        borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                        backgroundColor: active ? 'color-mix(in srgb, var(--color-primary) 12%, var(--color-panel))' : 'var(--color-bg-tertiary)',
                        boxShadow: active ? '0 0 0 1px color-mix(in srgb, var(--color-primary) 30%, transparent)' : 'none',
                      }}
                    >
                      <span>
                        <span className="block text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                          {preset.label}
                        </span>
                        <span className="mt-1 block text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                          {preset.description}
                        </span>
                      </span>
                      <span
                        className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: active ? 'var(--color-primary)' : 'var(--color-border-strong)' }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--color-text-muted)' }}>
                QR Shape
              </p>
              <div className="grid grid-cols-2 gap-2">
                {shapeOptions.map((shape) => {
                  const active = options.qrShape === shape.value;
                  return (
                    <button
                      key={shape.value}
                      type="button"
                      onClick={() => onChange({ qrShape: shape.value })}
                      className="rounded-2xl border px-4 py-3 text-left transition-all duration-200"
                      style={{
                        borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                        backgroundColor: active ? 'color-mix(in srgb, var(--color-primary) 12%, var(--color-panel))' : 'var(--color-bg-tertiary)',
                      }}
                    >
                      <span className="block text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        {shape.label}
                      </span>
                      <span className="mt-1 block text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                        {shape.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4 border-t pt-6" style={{ borderColor: 'var(--color-border)' }}>
          <div>
            <p className="text-sm font-semibold tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
              Branding
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Add a centered logo only when you have enough contrast and padding.
            </p>
          </div>
          <Toggle
            checked={options.includeLogo}
            onChange={(includeLogo) => onChange({ includeLogo })}
            label="Add Logo"
            description="Include your logo in the QR code"
          />
          
          {options.includeLogo && (
            <div className="mt-4 min-w-0 animate-fade-in">
              <Input
                label="Logo URL"
                type="text"
                placeholder="https://example.com/logo.png"
                value={options.logoUrl || ''}
                onChange={(e) => onChange({ logoUrl: e.target.value })}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
