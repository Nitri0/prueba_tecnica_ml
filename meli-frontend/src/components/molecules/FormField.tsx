import * as React from 'react';
import { Label } from '@/components/atoms/Label';
import { Input, type InputProps } from '@/components/atoms/Input';
import { cn } from '@/lib/utils';

export interface FormFieldProps extends InputProps {
  label: string;
  error?: string;
  helperText?: string;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-2">
        <Label htmlFor={inputId}>{label}</Label>
        <Input
          id={inputId}
          ref={ref}
          className={cn(error && 'border-destructive', className)}
          {...props}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        {helperText && !error && <p className="text-sm text-muted-foreground">{helperText}</p>}
      </div>
    );
  }
);
FormField.displayName = 'FormField';

export { FormField };
