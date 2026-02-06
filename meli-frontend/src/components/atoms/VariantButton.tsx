import React from 'react';
import { Check } from 'lucide-react';
import { type Variant } from '../../types/product';

export { type Variant };

interface VariantButtonProps {
  variant: Variant;
  isSelected: boolean;
  onClick: () => void;
  showImage?: boolean;
  className?: string;
}

export const VariantButton: React.FC<VariantButtonProps> = ({
  variant,
  isSelected,
  onClick,
  showImage = false,
  className = '',
}) => {
  const baseClasses = 'relative min-w-[80px] px-4 py-2 border-2 rounded-md text-sm font-medium transition-all';

  const stateClasses = variant.available !== false
    ? isSelected
      ? 'border-ml-blue bg-ml-blue-light text-ml-blue'
      : 'border-ml-gray-border hover:border-ml-gray-medium text-ml-gray-dark'
    : 'border-ml-gray-border text-ml-gray-medium opacity-50 cursor-not-allowed line-through';

  return (
    <button
      onClick={onClick}
      disabled={variant.available === false}
      className={`${baseClasses} ${stateClasses} ${className}`}
      aria-pressed={isSelected}
      title={variant.available === false ? 'No disponible' : variant.label}
    >
      {showImage && variant.image ? (
        <div className="flex flex-col items-center gap-1">
          <div className={`w-12 h-12 rounded-md overflow-hidden border ${isSelected ? 'border-ml-blue' : 'border-ml-gray-border'}`}>
            <img
              src={variant.image}
              alt={variant.label}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs">{variant.label}</span>
        </div>
      ) : (
        <span>{variant.label}</span>
      )}

      {isSelected && variant.available !== false && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-ml-blue rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
    </button>
  );
};

export default VariantButton;
