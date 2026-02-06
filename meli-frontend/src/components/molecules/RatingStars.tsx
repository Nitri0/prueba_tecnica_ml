import React from 'react';
import RatingStar from '../atoms/RatingStar';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  color?: 'yellow' | 'blue';
  className?: string;
}

const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  reviewCount,
  size = 'md',
  showNumber = true,
  color = 'yellow',
  className = '',
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-0.5">
        {/* Estrellas llenas */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <RatingStar
            key={`full-${i}`}
            type="full"
            size={size}
            color={color}
          />
        ))}

        {/* Media estrella */}
        {hasHalfStar && (
          <RatingStar
            type="half"
            size={size}
            color={color}
          />
        )}

        {/* Estrellas vacías */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <RatingStar
            key={`empty-${i}`}
            type="empty"
            size={size}
            color={color}
          />
        ))}
      </div>

      {showNumber && (
        <span className={`${textSizeClasses[size]} text-ml-gray-medium`}>
          {rating.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className={`${textSizeClasses[size]} text-ml-blue hover:underline cursor-pointer`}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};

export default RatingStars;
