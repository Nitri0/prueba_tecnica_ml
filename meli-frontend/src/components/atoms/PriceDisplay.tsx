import React from 'react';

interface PriceDisplayProps {
  amount: number;
  currency?: string;
  originalPrice?: number;
  discount?: number;
  showDiscount?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: {
    price: 'text-xl',
    symbol: 'text-lg',
    decimals: 'text-base',
  },
  md: {
    price: 'text-3xl',
    symbol: 'text-2xl',
    decimals: 'text-xl',
  },
  lg: {
    price: 'text-4xl',
    symbol: 'text-3xl',
    decimals: 'text-2xl',
  },
};

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  amount,
  currency = '$',
  originalPrice,
  discount,
  showDiscount = true,
  size = 'lg',
  className = '',
}) => {
  const integerPart = Math.floor(amount);
  const decimalPart = Math.round((amount - integerPart) * 100);

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className={className}>
      {showDiscount && (originalPrice || discount) && (
        <div className="flex items-center gap-2 mt-1">
          {originalPrice && (
            <span className="text-base text-ml-gray-medium line-through">
              {currency}{formatNumber(originalPrice)}
            </span>
          )}
        </div>
      )}
      <div className="flex items-start gap-1">
        <span className={`${sizeClasses[size].symbol} font-normal text-ml-gray-dark mt-1`}>
          {currency}
        </span>
        <span className={`${sizeClasses[size].price} font-normal text-ml-gray-dark`}>
          {formatNumber(integerPart)}
        </span>
        {decimalPart > 0 && (
          <span className={`${sizeClasses[size].decimals} font-normal text-ml-gray-dark align-top mt-1`}>
            {decimalPart.toString().padStart(2, '0')}
          </span>
        )}
        {discount && (
          <span className="text-sm text-[#00a650] font-semibold self-center px-2 py-0.5 rounded-sm bg-[#00a650]/10">
            {discount}% OFF
          </span>
        )}
      </div>
    </div>
  );
};

export default PriceDisplay;
