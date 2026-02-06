import React from 'react';

interface StarIconProps {
  fillPercentage?: number; // 0-100
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Átomo: Ícono de estrella individual con relleno parcial
 * Usado para mostrar ratings en opiniones y características
 * Soporta relleno parcial (ej: 4.7 estrellas = quinta estrella 70% llena)
 */
export const StarIcon: React.FC<StarIconProps> = ({
  fillPercentage = 0,
  size = 'sm',
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  // ID único para el gradiente (para evitar colisiones cuando hay múltiples estrellas)
  const gradientId = `star-gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId}>
          <stop offset={`${fillPercentage}%`} stopColor="rgb(52, 131, 250)" />
          <stop offset={`${fillPercentage}%`} stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill={fillPercentage > 0 ? `url(#${gradientId})` : 'none'}
        stroke="rgb(52, 131, 250)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default StarIcon;
