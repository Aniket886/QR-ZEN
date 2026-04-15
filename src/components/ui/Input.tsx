import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full min-w-0">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-semibold mb-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {label}
            {props.required && <span style={{ color: '#ef4444' }} className="ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-3 rounded-xl border transition-all duration-200',
            'focus:outline-none focus:ring-4',
            error ? 'border-red-500 focus:border-red-500' : 'focus:border-[var(--color-primary)]'
          )}
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            borderColor: error ? '#ef4444' : 'var(--color-border)',
            color: 'var(--color-text-primary)',
            '--tw-ring-color': 'rgb(99 102 241 / 0.2)'
          } as React.CSSProperties}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm font-medium" style={{ color: '#ef4444' }}>{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
