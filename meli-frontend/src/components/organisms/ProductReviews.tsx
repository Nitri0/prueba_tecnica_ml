import React from 'react';
import { ReviewPhotoCard } from '../molecules/ReviewPhotoCard';
import { StarRating } from '../molecules/StarRating';
import { ReviewItem, type Review } from '../molecules/ReviewItem';
import { CategoryRatings, type CategoryRating } from '../molecules/CategoryRatings';
import type { RatingCategory, CategoryRatings as CategoryRatingsType } from '@/types/product';

// Re-exportar Review para compatibilidad hacia atrás
export type { Review };

interface ProductReviewsProps {
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
  ratingDistribution?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  availableCategories?: RatingCategory[];
  averageCategoryRatings?: CategoryRatingsType;
  className?: string;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews = [],
  averageRating = 0,
  totalReviews = 0,
  ratingDistribution,
  availableCategories,
  averageCategoryRatings,
  className = '',
}) => {
  // Filtrar opiniones con imágenes
  const reviewsWithImages = reviews.filter(r => r.images && r.images.length > 0);

  // Preparar categorías promedio (dinámico)
  const averageCategories: CategoryRating[] = [];
  if (availableCategories && averageCategoryRatings) {
    // Ordenar por campo order si existe, sino mantener orden original
    const sortedCategories = [...availableCategories].sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return 0;
    });

    sortedCategories.forEach(category => {
      const rating = averageCategoryRatings[category.id];
      if (rating !== undefined) {
        averageCategories.push({
          id: category.id,
          name: category.name,
          rating: rating
        });
      }
    });
  }

  return (
    <div className={`bg-white p-6 lg:p-8 border-x border-b border-ml-gray-border ${className}`}>
      {/* Título */}
      <h2 className="text-2xl font-normal text-ml-gray-dark mb-6">
        Opiniones del producto
      </h2>

      <div className='flex flex-col lg:grid lg:grid-cols-[30%_40%_30%] gap-6 w-full'>
        <div>
          {/* Resumen de calificaciones */}
          {totalReviews > 0 && (
            <div className="row">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Promedio */}
                <div className="text-5xl font-normal text-ml-gray-dark mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="text-center md:text-left">
                  <StarRating rating={averageRating} size="md" />
                  <p className="text-xs text-ml-gray-medium mt-2">
                    {totalReviews} {totalReviews === 1 ? 'calificación' : 'calificaciones'}
                  </p>
                </div>
              </div>

              {/* Distribución de calificaciones */}
              {ratingDistribution && (
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = ratingDistribution[stars as keyof typeof ratingDistribution] || 0;
                    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                    
                    return (
                      <div key={stars} className="flex items-center gap-3 mb-2">
                        <div className="flex-1 h-1 bg-ml-gray-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-ml-gray-dark/60 rounded-full"
                            style={{ width: `${percentage}%` }}
                            />
                        </div>
                        <span className="text-xs text-ml-gray-medium w-8">{stars} ★</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          
          )}

          {/* Calificación de características */}
          {averageCategories.length > 0 && (
            <div className="mb-8">
              <h3 className="text-base font-semibold text-ml-gray-dark mb-4">
                Calificación de características
              </h3>
              <CategoryRatings categories={averageCategories} />
            </div>
          )}
        </div>
        <div>
          {/* Opiniones con fotos */}
          {reviewsWithImages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-normal text-ml-gray-dark mb-4">
                Opiniones con fotos
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {reviewsWithImages.map((review) =>
                  review.images?.map((image, index) => (
                    <ReviewPhotoCard
                      key={`${review.id}-${index}`}
                      imageUrl={image}
                      rating={review.rating}
                      className="w-32 h-32"
                    />
                  ))
                )}
              </div>
            </div>
          )}

          {/* Opiniones destacadas */}
          {reviews.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-normal text-ml-gray-dark mb-4">
                Opiniones destacadas
              </h3>
              <p className="text-xs text-ml-gray-medium mb-6">
                {reviews.length} comentarios
              </p>

              {reviews.slice(0, 3).map((review) => (
                <ReviewItem key={review.id} review={review} availableCategories={availableCategories} />
              ))}
            </div>
          )}

          {/* Lista de opiniones (si no hay opiniones) */}
          {reviews.length === 0 && (
            <div className="text-center py-8">
              <p className="text-ml-gray-medium">
                Este producto aún no tiene opiniones
              </p>
            </div>
          )}

          {/* Link ver todas */}
          {totalReviews > 3 && (
            <a
              href="#all-reviews"
              className="text-ml-blue text-base hover:underline inline-block"
            >
              Ver todas las opiniones ({totalReviews})
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
