import React from 'react';
import { MapPin, ThumbsUp } from 'lucide-react';
import { StarRating } from './StarRating';

interface SellerInfoProps {
  name: string;
  location?: string;
  positiveRating?: number;
  totalSales?: number;
  rating?: number;
  reviewCount?: number;
  className?: string;
}

export const SellerInfo: React.FC<SellerInfoProps> = ({
  name,
  location,
  positiveRating,
  totalSales,
  rating,
  reviewCount,
  className = '',
}) => {
  return (
    <div className={className}>
      {/* Nombre del vendedor */}
      <h3 className="text-base font-medium text-ml-gray-dark mb-2">
        {name}
      </h3>

      {/* Ubicación */}
      {location && (
        <div className="flex items-center gap-1.5 text-sm text-ml-gray-medium mb-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
      )}

      {/* Rating con estrellas */}
      {rating !== undefined && (
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={rating} size="sm" />
          {reviewCount !== undefined && (
            <span className="text-xs text-ml-blue hover:underline cursor-pointer">
              ({reviewCount.toLocaleString()})
            </span>
          )}
        </div>
      )}

      {/* Calificación positiva */}
      {positiveRating !== undefined && (
        <div className="flex items-center gap-1.5 text-sm text-ml-green mb-1">
          <ThumbsUp className="w-4 h-4" />
          <span className="font-medium">{positiveRating}% positivas</span>
        </div>
      )}

      {/* Total de ventas */}
      {totalSales !== undefined && (
        <div className="text-sm text-ml-gray-medium">
          {totalSales.toLocaleString()} ventas
        </div>
      )}
    </div>
  );
};

export default SellerInfo;
