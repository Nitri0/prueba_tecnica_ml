import React from 'react';
import * as LucideIcons from 'lucide-react';

interface CharacteristicHighlightProps {
  name: string;
  value: string;
  icon: string;
  className?: string;
}

export const CharacteristicHighlight: React.FC<CharacteristicHighlightProps> = ({
  name,
  value,
  icon,
  className = '',
}) => {
  // Obtener el ícono dinámicamente
  const IconComponent = (LucideIcons as any)[icon];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Ícono */}
      {IconComponent && (
        <div className="flex-shrink-0">
          <IconComponent className="w-6 h-6 text-ml-gray-dark" />
        </div>
      )}

      {/* Texto */}
      <div>
        <span className="text-xs text-ml-gray-dark">{name}: </span>
        <span className="text-xs font-bold text-ml-gray-dark">{value}</span>
      </div>
    </div>
  );
};

export default CharacteristicHighlight;
