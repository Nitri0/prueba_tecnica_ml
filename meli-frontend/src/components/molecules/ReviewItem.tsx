import React from 'react';
import { StarRating } from './StarRating';
import type { CategoryRating } from './CategoryRatings';
import type { RatingCategory, CategoryRatings as CategoryRatingsType } from '@/types/product';
import { getImageUrl } from '../../utils/imageUrl';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  likes?: number;
  verified?: boolean;
  images?: string[];
  categoryRatings?: CategoryRatingsType;
}

interface ReviewItemProps {
  review: Review;
  availableCategories?: RatingCategory[];
  className?: string;
}

/**
 * Molécula: Item de opinión individual
 * Muestra una reseña con avatar, rating, comentario, imágenes y ratings por categoría
 */
export const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  availableCategories,
  className = '',
}) => {
  // Preparar categorías para CategoryRatings (dinámico)
  const categories: CategoryRating[] = [];
  if (availableCategories && review.categoryRatings) {
    // Ordenar por campo order si existe, sino mantener orden original
    const sortedCategories = [...availableCategories].sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return 0;
    });

    sortedCategories.forEach(category => {
      const rating = review.categoryRatings![category.id];
      if (rating !== undefined) {
        categories.push({
          id: category.id,
          name: category.name,
          rating: rating
        });
      }
    });
  }

  // Calcular rating como promedio de las categorías
  const calculatedRating = categories.length > 0
    ? categories.reduce((sum, cat) => sum + cat.rating, 0) / categories.length
    : review.rating;

  return (
    <div className={`py-6 border-b border-ml-gray-border last:border-0 ${className}`}>
      {/* Header: Estrellas y Fecha */}
      <div className="flex items-center justify-between mb-3">
        <StarRating rating={calculatedRating} size="sm" />
        <span className="text-sm text-ml-gray-medium">{review.date}</span>
      </div>

      {/* Badge de compra verificada */}
      {review.verified && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-ml-gray-dark">Comprado a Tienda oficial Motorola</span>
          <svg className="w-4 h-4 text-ml-blue" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Comentario */}
      <p className="text-base text-ml-gray-dark mb-4 leading-relaxed">{review.comment}</p>

      {/* Imágenes de la opinión */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mb-4">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={getImageUrl(image)}
              alt={`Foto ${index + 1} de la opinión`}
              className="w-20 h-20 object-cover rounded-lg border border-ml-gray-border cursor-pointer hover:opacity-80 transition-opacity"
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default ReviewItem;
