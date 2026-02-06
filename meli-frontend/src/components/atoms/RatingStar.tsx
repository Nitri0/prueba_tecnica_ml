import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingStarProps {
  type: 'full' | 'half' | 'empty';
  size?: 'sm' | 'md' | 'lg';
  color?: 'yellow' | 'blue';
  className?: string;
}

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export const RatingStar: React.FC<RatingStarProps> = ({
  type,
  size = 'md',
  color = 'yellow',
  className = '',
}) => {
  const colorClasses = {
    yellow: 'fill-ml-yellow stroke-ml-yellow',
    blue: 'fill-ml-blue stroke-ml-blue',
  };

  const emptyClass = 'stroke-ml-gray-border fill-none';
  const strokeWidth = color === 'blue' ? 1.5 : 2;

  const starClass = `${sizeClasses[size]} ${className}`;

  if (type === 'half') {
    return (
      <StarHalf
        className={`${starClass} ${colorClasses[color]}`}
        strokeWidth={strokeWidth}
      />
    );
  }

  if (type === 'empty') {
    return (
      <Star
        className={`${starClass} ${emptyClass}`}
        strokeWidth={strokeWidth}
      />
    );
  }

  // type === 'full'
  return (
    <Star
      className={`${starClass} ${colorClasses[color]}`}
      strokeWidth={strokeWidth}
    />
  );
};

export default RatingStar;
