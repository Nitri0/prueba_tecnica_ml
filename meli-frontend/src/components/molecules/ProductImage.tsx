import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  onClick?: () => void;
  showZoomIcon?: boolean;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  onClick,
  showZoomIcon = true,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`relative bg-white rounded-lg overflow-hidden group cursor-pointer ${className}`}
      onClick={onClick}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-ml-gray-light animate-pulse" />
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        className="w-full h-full object-contain transition-transform group-hover:scale-105"
      />

      {showZoomIcon && !isLoading && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2">
            <ZoomIn className="w-6 h-6 text-ml-gray-dark" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
