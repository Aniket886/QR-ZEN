'use client';

import { QRGeneratorOptions } from '@/config/qr-types';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { Toggle } from '@/components/ui/Toggle';
import { Input } from '@/components/ui/Input';
import { Slider } from '@/components/ui/Slider';
import { Select } from '@/components/ui/Select';
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

export function CustomizationPanel({ options, onChange }: CustomizationPanelProps) {
  return (
    <div className="min-w-0 space-y-5 sm:space-y-6">
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

      <div className="space-y-4">
        <div className="panel-muted min-w-0 p-4 sm:p-5">
          <div className="mb-4 flex min-w-0 flex-wrap items-center gap-2">
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
        </div>

        <div className="panel-muted min-w-0 p-4 sm:p-5">
          <div className="mb-4">
            <p className="text-sm font-semibold tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
              Colors
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Set contrast clearly so the code stays sharp and scannable.
            </p>
          </div>
          <div className="grid gap-3 sm:gap-4">
            <div className="rounded-2xl border p-3.5 sm:p-4" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-panel)' }}>
              <ColorPicker
                label="Foreground"
                value={options.fgColor}
                onChange={(fgColor) => onChange({ fgColor })}
              />
            </div>
            <div className="rounded-2xl border p-3.5 sm:p-4" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-panel)' }}>
              <ColorPicker
                label="Background"
                value={options.bgColor}
                onChange={(bgColor) => onChange({ bgColor })}
              />
            </div>
          </div>
        </div>

        <div className="panel-muted min-w-0 p-4 sm:p-5">
          <div className="mb-4">
            <p className="text-sm font-semibold tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
              Style
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Pick a preset and module shape without crowding the controls.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              label="Design"
              value={options.designPreset}
              options={[
                { value: 'classic', label: 'Classic' },
                { value: 'midnight', label: 'Midnight' },
                { value: 'ocean', label: 'Ocean' },
                { value: 'sunset', label: 'Sunset' },
              ]}
              onChange={(e) => {
                const designPreset = e.target.value as QRGeneratorOptions['designPreset'];
                onChange({ designPreset, ...designPresets[designPreset] });
              }}
            />
            <Select
              label="QR Shape"
              value={options.qrShape}
              options={[
                { value: 'square', label: 'Square' },
                { value: 'rounded', label: 'Rounded' },
              ]}
              onChange={(e) =>
                onChange({
                  qrShape: e.target.value as QRGeneratorOptions['qrShape'],
                })
              }
            />
          </div>
        </div>

        <div className="panel-muted min-w-0 p-4 sm:p-5">
          <div className="mb-4">
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
        </div>
      </div>
    </div>
  );
}
