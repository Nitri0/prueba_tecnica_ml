import React from 'react';

interface ProductBadgeProps {
  text: string;
  variant?: 'new' | 'used' | 'official' | 'bestseller';
  className?: string;
}

export const ProductBadge: React.FC<ProductBadgeProps> = ({
  text,
  variant = 'new',
  className = '',
}) => {
  const variantClasses = {
    new: 'bg-transparent text-ml-gray-medium text-sm',
    used: 'bg-ml-gray-light text-ml-gray-dark text-xs px-2 py-1 rounded',
    official: 'bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold',
    bestseller: 'bg-orange-500 text-white text-xs px-3 py-1 rounded font-semibold uppercase',
  };

  return (
    <span className={`inline-block ${variantClasses[variant]} ${className}`}>
      {text}
    </span>
  );
};

export default ProductBadge;
