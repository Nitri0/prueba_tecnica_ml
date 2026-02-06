import React from 'react';
import { StarRating } from '../molecules/StarRating';

interface ProductRatingProps {
  rating: number;
  reviewCount: number;
  compact?: boolean;
  className?: string;
}

export const ProductRating: React.FC<ProductRatingProps> = ({
  rating,
  reviewCount,
  compact = false,
  className = '',
}) => {
  if (compact) {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {/* Rating numérico */}
        <span className="text-xs font-normal text-ml-gray-dark">
          {rating.toFixed(1)}
        </span>

        {/* Estrellas */}
        <StarRating rating={rating} size="xs" />

        {/* Número de reseñas */}
        <span className="text-xs text-ml-gray-medium">
          ({reviewCount.toLocaleString()})
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Rating numérico */}
      <span className="text-sm font-normal text-ml-gray-dark">
        {rating.toFixed(1)}
      </span>

      {/* Estrellas */}
      <StarRating rating={rating} size="sm" />

      {/* Número de reseñas */}
      <a
        href="#reviews"
        className="text-sm text-ml-gray-medium hover:text-ml-blue transition-colors"
      >
        ({reviewCount.toLocaleString()})
      </a>
    </div>
  );
};

export default ProductRating;
