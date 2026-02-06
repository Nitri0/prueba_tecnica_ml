import React from 'react';
import { Truck } from 'lucide-react';

interface ShippingBadgeProps {
  isFree?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: {
    container: 'px-2 py-1 text-xs',
    icon: 'w-3 h-3',
  },
  md: {
    container: 'px-2.5 py-1.5 text-sm',
    icon: 'w-4 h-4',
  },
  lg: {
    container: 'px-3 py-2 text-base',
    icon: 'w-5 h-5',
  },
};

export const ShippingBadge: React.FC<ShippingBadgeProps> = ({
  isFree = true,
  size = 'md',
  className = '',
}) => {
  if (!isFree) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 bg-ml-green-light text-ml-green font-semibold rounded-md ${sizeClasses[size].container} ${className}`}
    >
      <Truck className={sizeClasses[size].icon} />
      <span>Envío gratis</span>
    </div>
  );
};

export default ShippingBadge;
