import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ProductDescriptionProps {
  description: string;
  images?: string[];
  className?: string;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
  images = [],
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-white ${className}`}>
      <h2 className="text-2xl font-normal text-ml-gray-dark mb-6">
        Descripción
      </h2>

      {/* Contenido de la descripción */}
      <div
        className={`relative overflow-hidden transition-all duration-300 ${
          !isExpanded ? 'max-h-[400px]' : 'max-h-none'
        }`}
      >
        {/* Texto de descripción */}
        <div className="prose prose-sm max-w-none">
          <p className="text-sm text-ml-gray-dark whitespace-pre-wrap leading-relaxed">
            {description}
          </p>
        </div>

        {/* Imágenes adicionales */}
        {images.length > 0 && (
          <div className="mt-6 space-y-4">
            {images.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden border border-ml-gray-border">
                <img
                  src={image}
                  alt={`Descripción ${index + 1}`}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        )}

        {/* Gradiente de fade */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {/* Botón para expandir/contraer */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-xs text-ml-blue hover:underline font-medium mt-4 w-full"
      >
        
        {!isExpanded ? (
          <div className='flex'>
            <span>Ver descripción completa</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        ) : (<div></div>)}
      </button>
    </div>
  );
};

export default ProductDescription;
