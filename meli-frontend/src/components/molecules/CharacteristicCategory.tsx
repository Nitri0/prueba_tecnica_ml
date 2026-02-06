import React from 'react';

interface CharacteristicCategoryProps {
  categoryName: string;
  characteristics: Array<{
    name: string;
    value: string;
  }>;
  className?: string;
}

export const CharacteristicCategory: React.FC<CharacteristicCategoryProps> = ({
  categoryName,
  characteristics,
  className = '',
}) => {
  return (
    <div className={className}>
      {/* Título de la categoría */}
      <h3 className="text-base text-ml-gray-dark mb-3">
        {categoryName}
      </h3>

      {/* Lista de características */}
      <div className="space-y-0 border border-ml-gray-light rounded">
        {characteristics.map((char, index) => (
          <div
            key={index}
            className={`grid grid-cols-2 gap-4 py-3 px-4 ${
              index % 2 === 0 ? 'bg-ml-gray-light' : 'bg-white'
            }`}
          >
            <div className="text-xs text-ml-gray-dark font-medium">
              {char.name}
            </div>
            <div className="text-xs text-ml-gray-dark">
              {char.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacteristicCategory;
