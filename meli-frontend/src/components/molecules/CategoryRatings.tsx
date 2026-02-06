import React from 'react';
import { StarRating } from './StarRating';

export interface CategoryRating {
  id: string;
  name: string;
  rating: number;
}

interface CategoryRatingsProps {
  categories: CategoryRating[];
  className?: string;
}

export const CategoryRatings: React.FC<CategoryRatingsProps> = ({
  categories,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {categories.map((category, index) => (
        <div key={index} className="">
          <div className="text-sm text-ml-gray-dark">{category.name}</div>
          <StarRating rating={category.rating} />
        </div>
      ))}
    </div>
  );
};

export default CategoryRatings;
