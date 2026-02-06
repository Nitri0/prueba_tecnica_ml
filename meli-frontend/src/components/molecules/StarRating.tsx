import React from 'react';
import { StarIcon } from '../atoms/StarIcon';

interface StarRatingProps {
  rating: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showValue?: boolean;
  className?: string;
}

/**
 * Molécula: Rating con estrellas (1-5) con relleno parcial
 * Usado para mostrar calificaciones en opiniones y características de productos
 * Soporta ratings decimales (ej: 4.7 = 4 estrellas llenas + 1 estrella 70% llena)
 */
export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 'sm',
  showValue = false,
  className = '',
}) => {
  /**
   * Calcula el porcentaje de relleno para cada estrella
   * @param starNumber - Número de la estrella (1-5)
   * @param rating - Rating actual (ej: 4.7)
   * @returns Porcentaje de relleno (0-100)
   */
  const calculateFillPercentage = (starNumber: number, rating: number): number => {
    // Si el rating es mayor o igual al número de estrella, está completamente llena
    if (rating >= starNumber) {
      return 100;
    }

    // Si el rating es menor que el número de estrella anterior, está vacía
    if (rating < starNumber - 1) {
      return 0;
    }

    // Caso intermedio: calcular el porcentaje parcial
    // Ej: rating 4.7, starNumber 5 -> (4.7 - 4) * 100 = 70%
    const partial = (rating - (starNumber - 1)) * 100;
    return Math.max(0, Math.min(100, partial));
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {showValue && (
        <span className="text-sm font-medium text-ml-gray-dark mr-1">
          {rating.toFixed(1)}
        </span>
      )}
      {[1, 2, 3, 4, 5].map((star) => {
        const fillPercentage = calculateFillPercentage(star, rating);
        return <StarIcon key={star} fillPercentage={fillPercentage} size={size} />;
      })}
    </div>
  );
};

export default StarRating;
