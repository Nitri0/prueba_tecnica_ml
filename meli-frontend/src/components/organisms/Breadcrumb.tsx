import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showBackButton?: boolean;
  backLabel?: string;
  className?: string;
}

/**
 * Organism: Breadcrumb de navegación
 * Muestra la ruta de navegación del usuario en el sitio
 * Primer item puede ser un botón "Volver" opcional
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showBackButton = true,
  backLabel = 'Volver',
  className = '',
}) => {
  return (
    <nav className={`mb-3 ${className}`}>
      <ol className="flex items-center gap-2 text-xs text-blue-500">
        {/* Botón "Volver" opcional */}
        {showBackButton && (
          <>
            <li>
              <a href="/" className="transition-colors hover:text-ml-blue">
                {backLabel}
              </a>
            </li>
            <li>|</li>
          </>
        )}

        {/* Items del breadcrumb */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.isCurrentPage || isLast;

          return (
            <React.Fragment key={index}>
              <li>
                {isCurrent ? (
                  <span className="text-ml-gray-dark">{item.label}</span>
                ) : (
                  <a
                    href={item.href}
                    className="transition-colors hover:text-ml-blue"
                  >
                    {item.label}
                  </a>
                )}
              </li>
              {!isLast && <li>&gt;</li>}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
