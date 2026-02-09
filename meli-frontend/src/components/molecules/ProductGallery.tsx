import React, { useState } from 'react';
import ProductImage from '../molecules/ProductImage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../atoms/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUrl';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  className = '',
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      {/* Layout Desktop con thumbnails */}
      <div className={`hidden lg:flex gap-4 ${className}`}>
        {/* Thumbnails laterales */}
        <div className="flex flex-col gap-2 w-16">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                index === selectedIndex
                  ? 'border-ml-blue'
                  : 'border-ml-gray-border hover:border-ml-gray-medium'
              }`}
            >
              <img
                src={getImageUrl(image)}
                alt={`${productName} - vista ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>

        {/* Imagen principal */}
        <div className="flex-1">
          <ProductImage
            src={getImageUrl(images[selectedIndex])}
            alt={productName}
            onClick={() => setIsZoomOpen(true)}
            className="w-full h-[500px]"
          />
        </div>
      </div>

      {/* Layout Mobile con flechas */}
      <div className={`lg:hidden relative ${className}`}>
        {/* Contador de imágenes */}
        <div className="absolute top-4 left-4 z-10 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-ml-gray-dark">
          {selectedIndex + 1}/{images.length}
        </div>

        {/* Imagen principal */}
        <div className="relative">
          <ProductImage
            src={getImageUrl(images[selectedIndex])}
            alt={productName}
            onClick={() => setIsZoomOpen(true)}
            className="w-full h-[400px]"
          />

          {/* Botones de navegación */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-5 h-5 text-ml-gray-dark" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-5 h-5 text-ml-gray-dark" />
              </button>
            </>
          )}
        </div>

        {/* Indicadores de puntos */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === selectedIndex ? 'bg-ml-blue' : 'bg-ml-gray-light'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal de zoom */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-5xl h-[90vh] p-0">
          <DialogTitle className="sr-only">{productName}</DialogTitle>
          <DialogDescription className="sr-only">
            Vista ampliada de {productName}
          </DialogDescription>
          <div className="relative w-full h-full flex items-center justify-center bg-white">
            <button
              onClick={handlePrevious}
              className="absolute left-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-ml-gray-light transition-colors"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={getImageUrl(images[selectedIndex])}
              alt={productName}
              className="max-w-full max-h-full object-contain p-8"
            />

            <button
              onClick={handleNext}
              className="absolute right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-ml-gray-light transition-colors"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductGallery;
