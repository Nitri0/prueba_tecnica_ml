import React from 'react';

interface ProductHighlightsProps {
  highlights: string[];
  title?: string;
  className?: string;
}

export const ProductHighlights: React.FC<ProductHighlightsProps> = ({
  highlights,
  title = 'Lo que tienes que saber de este producto',
  className = '',
}) => {
  if (highlights.length === 0) return null;

  return (
    <div className={`bg-white rounded-lg pt-6 ${className}`}>
      <h4 className="text-base text-xs font-semibold text-ml-gray-dark mb-4">
        {title}
      </h4>
      <ul className="space-y-2">
        {highlights.map((highlight, index) => (
          <li key={index} className="text-xs text-ml-gray-dark flex items-start gap-2">
            <span className="text-ml-gray-medium">•</span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductHighlights;
