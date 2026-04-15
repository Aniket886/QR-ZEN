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

export function CustomizationPanel({ options, onChange }: CustomizationPanelProps) {
  return (
    <div className="min-w-0 space-y-4 sm:space-y-5">
      <div className="min-w-0">
        <p className="section-label">Customize</p>
        <div className="mt-2 flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
            <Palette className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
          </div>
          <h2 className="min-w-0 text-base font-semibold leading-snug sm:text-lg sm:leading-6" style={{ color: 'var(--color-text-primary)' }}>
            Fine-tune the visual output
          </h2>
        </div>
      </div>

      <div className="space-y-3.5 sm:space-y-4">
        <div className="panel-muted min-w-0 p-3.5 sm:p-5">
          <div className="mb-3 flex min-w-0 flex-wrap items-center gap-2">
            <Maximize2 className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
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

        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5 sm:gap-4">
          <div className="panel-muted min-w-0 h-full p-3.5 sm:p-5">
            <ColorPicker
              label="Foreground"
              value={options.fgColor}
              onChange={(fgColor) => onChange({ fgColor })}
            />
          </div>
          <div className="panel-muted min-w-0 h-full p-3.5 sm:p-5">
            <ColorPicker
              label="Background"
              value={options.bgColor}
              onChange={(bgColor) => onChange({ bgColor })}
            />
          </div>
        </div>

        <div className="panel-muted min-w-0 p-3.5 sm:p-5">
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
