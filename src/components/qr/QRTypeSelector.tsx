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
        <h2 className="mt-2 text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Start with the content you want to encode
        </h2>
      </div>

      <div className="overflow-x-auto pb-2 md:overflow-visible">
        <div className="flex min-w-max gap-3 md:min-w-0 md:flex-wrap">
          {qrTypes.map((qt) => {
            const Icon = iconMap[qt.config.icon] || ScanLine;
            const isSelected = selectedType === qt.config.id;

            return (
              <button
                key={qt.config.id}
                type="button"
                onClick={() => onChange(qt.config.id)}
                className="group relative flex min-w-[152px] items-center gap-3 rounded-2xl px-4 py-4 text-left transition-all duration-200 md:min-w-[calc(50%-0.375rem)] lg:flex-1"
                style={{
                  background: isSelected
                    ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-strong))'
                    : 'var(--color-bg-tertiary)',
                  color: isSelected ? '#ffffff' : 'var(--color-text-primary)',
                  border: isSelected ? '1px solid transparent' : '1px solid var(--color-border)',
                  boxShadow: isSelected ? '0 18px 38px rgb(109 94 252 / 0.28)' : 'var(--shadow-sm)',
                }}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: isSelected ? 'rgb(255 255 255 / 0.14)' : 'var(--color-panel)',
                    border: isSelected ? '1px solid rgb(255 255 255 / 0.12)' : '1px solid var(--color-border)',
                  }}
                >
                  <Icon className={`h-5 w-5 transition-transform duration-200 ${isSelected ? '' : 'group-hover:scale-110'}`} />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{qt.config.label}</span>
                  <span className="mt-1 block text-xs opacity-75">{qt.config.description.replace('Generate QR code for ', '')}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
