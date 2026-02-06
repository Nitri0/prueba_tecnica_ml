import React from 'react';

interface MLLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-8',
  md: 'h-12',
  lg: 'h-18',
};

export const MLLogo: React.FC<MLLogoProps> = ({ className = '', size = 'md' }) => {
  return (
    <>
      {/* Logo mobile - Icono */}
      <img
        src="https://sendu.cl/wp-content/uploads/2024/11/Ico_Mercado-libre.png"
        alt="Mercado Libre"
        className={`lg:hidden ${sizeClasses[size]} ${className}`}
      />
      {/* Logo desktop - Logo completo */}
      <img
        src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.9.0/mercadolibre/logo_large_plus@2x.webp"
        alt="Mercado Libre"
        className={`hidden lg:block ${sizeClasses[size]} ${className}`}
      />
    </>
  );
};

export default MLLogo;
