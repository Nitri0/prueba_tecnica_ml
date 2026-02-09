import React from 'react';
import { Star } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUrl';

interface ReviewPhotoCardProps {
  imageUrl: string;
  rating: number;
  onClick?: () => void;
  className?: string;
}

export const ReviewPhotoCard: React.FC<ReviewPhotoCardProps> = ({
  imageUrl,
  rating,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 flex-shrink-0 ${className}`}
    >
      {/* Imagen de fondo */}
      <img
        src={getImageUrl(imageUrl)}
        alt="Foto de opinión"
        className="w-full h-full object-cover"
      />

      {/* Overlay con rating */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
        <div className="flex items-center gap-1 text-white">
          <span className="text-sm font-semibold">{rating}</span>
          <Star className="w-4 h-4 fill-white text-white" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

export default ReviewPhotoCard;
