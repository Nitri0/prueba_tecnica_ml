import { Link, type LinkProps } from 'react-router-dom';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavLinkProps extends LinkProps {
  icon?: LucideIcon;
  label: string;
  isActive?: boolean;
}

export function NavLink({ icon: Icon, label, isActive, className, ...props }: NavLinkProps) {
  return (
    <Link
      className={cn(
        'flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        className
      )}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{label}</span>
    </Link>
  );
}
