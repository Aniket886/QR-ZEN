'use client';

import { qrTypes, QRType } from '@/config/qr-types';
import { Link, FileText, Wifi, Mail, Phone, MessageSquare, ScanLine } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Link,
  FileText,
  Wifi,
  Mail,
  Phone,
  MessageSquare,
};

interface QRTypeSelectorProps {
  selectedType: QRType;
  onChange: (type: QRType) => void;
}

export function QRTypeSelector({ selectedType, onChange }: QRTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="section-label">Choose Type</p>
        <h2 className="mt-2 text-xl font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
          Start with the content you want to encode
        </h2>
      </div>

      <div className="overflow-x-auto pb-2 md:overflow-visible">
        <div className="grid min-w-max grid-flow-col gap-3 md:min-w-0 md:grid-flow-row md:grid-cols-2 xl:grid-cols-3">
          {qrTypes.map((qt) => {
            const Icon = iconMap[qt.config.icon] || ScanLine;
            const isSelected = selectedType === qt.config.id;

            return (
              <button
                key={qt.config.id}
                type="button"
                onClick={() => onChange(qt.config.id)}
                className="group relative flex min-w-[168px] items-center gap-3 rounded-[1.3rem] px-4 py-4 text-left transition-all duration-200"
                style={{
                  background: isSelected
                    ? 'linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 18%, var(--color-panel)), color-mix(in srgb, var(--color-accent) 10%, var(--color-panel)))'
                    : 'var(--color-panel)',
                  color: 'var(--color-text-primary)',
                  border: isSelected ? '1px solid color-mix(in srgb, var(--color-primary) 65%, var(--color-border))' : '1px solid var(--color-border)',
                  boxShadow: isSelected ? '0 14px 28px rgb(35 28 22 / 0.08)' : 'none',
                }}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: isSelected ? 'color-mix(in srgb, var(--color-primary) 16%, var(--color-panel))' : 'var(--color-panel-strong)',
                    border: '1px solid var(--color-border)',
                    color: isSelected ? 'var(--color-primary-strong)' : 'var(--color-text-secondary)',
                  }}
                >
                  <Icon className={`h-5 w-5 transition-transform duration-200 ${isSelected ? '' : 'group-hover:scale-110'}`} />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{qt.config.label}</span>
                  <span className="mt-1 block text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {qt.config.description.replace('Generate QR code for ', '')}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
