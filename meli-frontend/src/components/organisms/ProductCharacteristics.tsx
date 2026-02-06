import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { type ProductCharacteristic } from '../../types/product';
import CharacteristicRange from '../molecules/CharacteristicRange';
import CharacteristicHighlight from '../molecules/CharacteristicHighlight';
import CharacteristicCategory from '../molecules/CharacteristicCategory';

interface ProductCharacteristicsProps {
  characteristics: ProductCharacteristic[];
  title?: string;
  initialVisibleCount?: number; // Número de características inicialmente visibles
  className?: string;
}

export const ProductCharacteristics: React.FC<ProductCharacteristicsProps> = ({
  characteristics,
  title = 'Características del producto',
  initialVisibleCount = 4,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Separar características por tipo
  const rangeChars = characteristics.filter(c => c.type === 'range');
  const highlightChars = characteristics.filter(c => c.type === 'highlight');
  const categoryChars = characteristics.filter(c => c.type === 'category');

  // Características visibles según el estado
  const visibleRangeChars = isExpanded ? rangeChars : rangeChars.slice(0, Math.min(2, rangeChars.length));
  const remainingCount = initialVisibleCount - visibleRangeChars.length;
  const visibleHighlightChars = isExpanded ? highlightChars : highlightChars.slice(0, Math.max(0, remainingCount));

  // Mostrar botón si hay categorías o más características de las visibles inicialmente
  const hasMoreChars = (rangeChars.length > visibleRangeChars.length) ||
                       (highlightChars.length > visibleHighlightChars.length) ||
                       categoryChars.length > 0;

  return (
    <div className={`bg-white ${className}`}>
      {/* Título */}
      <h2 className="text-2xl font-normal text-ml-gray-dark mb-6">
        {title}
      </h2>

      {/* Características con rango visual */}
      {visibleRangeChars.length > 0 && (
        <div className="mb-6">
          {visibleRangeChars.map((char, index) => (
            <CharacteristicRange
              key={index}
              name={char.name}
              value={char.value}
              current={char.current}
              minLabel={char.minLabel}
              maxLabel={char.maxLabel}
              icon={char.icon}
              segments={char.segments}
            />
          ))}
        </div>
      )}

      {/* Características destacadas (horizontal) */}
      {visibleHighlightChars.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 mb-6">
          {visibleHighlightChars.map((char, index) => (
            <CharacteristicHighlight
              key={index}
              name={char.name}
              value={char.value}
              icon={char.icon}
            />
          ))}
        </div>
      )}

      {/* Botón "Ver todas las características" */}
      {hasMoreChars && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-ml-blue hover:underline text-xs mb-6 transition-colors"
        >
          {!isExpanded ? (
            <div className='flex'>
              <span>Ver todas las características</span><ChevronDown className="w-5 h-5" />
            </div>
          ) : (<div></div>)}
        </button>
      )}

      {/* Categorías agrupadas (grid de 2 columnas) - Siempre visible */}
      {categoryChars.length > 0 && isExpanded && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          {categoryChars.map((char, index) => (
            <CharacteristicCategory
              key={index}
              categoryName={char.categoryName}
              characteristics={char.characteristics}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCharacteristics;
