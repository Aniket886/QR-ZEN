import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    return (
      <div className="w-full">
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
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={cn(
              'w-full px-4 py-3 rounded-xl border transition-all duration-200 appearance-none pr-12',
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
          >
            <option value="" disabled>
              Select an option
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown 
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none transition-transform duration-200" 
            style={{ color: 'var(--color-text-muted)' }}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm font-medium" style={{ color: '#ef4444' }}>{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };