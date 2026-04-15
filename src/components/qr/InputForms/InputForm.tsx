'use client';

import { QRTypeDefinition } from '@/config/qr-types';
import { QRFormValues } from '@/lib/types';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { X, TrendingUp } from 'lucide-react';

interface InputFormProps {
  definition: QRTypeDefinition;
  values: QRFormValues;
  onChange: (key: string, value: string) => void;
  onClear: () => void;
}

export function InputForm({ definition, values, onChange, onClear }: InputFormProps) {
  const hasValues = Object.values(values).some((v) => v.trim() !== '');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
            <TrendingUp className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {definition.config.label}
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {definition.config.description}
            </p>
          </div>
        </div>
        {hasValues && (
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1.5 self-start rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{ 
              backgroundColor: 'var(--color-bg-tertiary)',
              color: 'var(--color-text-secondary)'
            }}
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>
      
      <div className="grid gap-5">
        {definition.fields.map((field) => (
          <div key={field.name} className="space-y-2">
            {field.type === 'select' ? (
              <Select
                id={field.name}
                label={field.label}
                options={field.options || []}
                value={values[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                required={field.required}
              />
            ) : (
              <Input
                id={field.name}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                value={values[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                required={field.required}
                maxLength={field.maxLength}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
