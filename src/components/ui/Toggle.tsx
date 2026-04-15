'use client';

import { cn } from '@/lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled,
  className,
}: ToggleProps) {
  return (
    <label className={cn('flex min-w-0 items-start gap-3 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-all duration-300',
          checked ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-bg-tertiary)]',
          disabled && 'cursor-not-allowed'
        )}
        style={{ border: '1px solid var(--color-border)' }}
      >
        <span
          className={cn(
            'inline-block h-5 w-5 transform rounded-full shadow-lg transition-all duration-300',
            checked ? 'translate-x-6 bg-white' : 'translate-x-1 bg-white'
          )}
          style={{
            boxShadow: checked 
              ? '0 2px 8px rgb(99 102 241 / 0.4)' 
              : '0 2px 4px rgb(0 0 0 / 0.15)'
          }}
        />
      </button>
      {(label || description) && (
        <div className="min-w-0 flex-1 pt-0.5">
          {label && (
            <span className="block text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {label}
            </span>
          )}
          {description && (
            <span className="mt-0.5 block text-xs leading-5" style={{ color: 'var(--color-text-secondary)' }}>
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
