import React from 'react';
import * as LucideIcons from 'lucide-react';

interface CharacteristicRangeProps {
  name: string;
  value: string | number;
  current: number;      // Valor actual en el rango (ej: 6.7)
  min: number;          // Valor mínimo (ej: 4)
  max: number;          // Valor máximo (ej: 8)
  minLabel: string;
  maxLabel: string;
  icon?: string;
  segments?: number;    // Número de secciones (default: 5)
  className?: string;
}

export const CharacteristicRange: React.FC<CharacteristicRangeProps> = ({
  name,
  value,
  current,
  min,
  max,
  minLabel,
  maxLabel,
  icon,
  segments = 5,
  className = '',
}) => {
  // Obtener el ícono dinámicamente
  const IconComponent = icon ? (LucideIcons as any)[icon] : null;

  // Calcular el porcentaje basado en el valor actual y el rango
  const percentage = max > min ? ((current - min) / (max - min)) * 100 : 0;

  // Calcular qué segmento está activo basado en el porcentaje
  const activeSegment = Math.min(Math.floor((percentage / 100) * segments), segments - 1);

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 lg:pr-10 ${className}`}>
      {/* Columna con contenido */}
      <div className="flex items-start gap-3">
        {/* Ícono */}
        {IconComponent && (
          <div className="flex-shrink-0">
            <IconComponent className="w-6 h-6 text-ml-gray-dark" />
          </div>
        )}

        {/* Contenido */}
        <div className="flex-1">
        {/* Nombre y valor */}
        <div className="mb-2">
          <span className="text-xs text-ml-gray-dark">{name}: </span>
          <span className="text-xs font-bold text-ml-gray-dark">{value}</span>
        </div>

        {/* Barra de rango con segmentos */}
        <div className="space-y-2">
          {/* Segmentos */}
          <div className="flex gap-1">
            {Array.from({ length: segments }).map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 ${
                  index === activeSegment ? 'bg-ml-blue' : 'bg-ml-gray-light'
                }`}
              />
            ))}
          </div>

          {/* Labels */}
          <div className="flex items-center justify-between">
            <span className="text-xs font text-ml-gray-dark">
              {minLabel}
            </span>
            <span className="text-xs font text-ml-gray-dark">
              {maxLabel}
            </span>
          </div>
        </div>
        </div>
      </div>
      {/* Segunda columna vacía */}
    </div>
  );
};

export default CharacteristicRange;
