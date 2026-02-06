import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VariantButton, { type Variant } from '../atoms/VariantButton';
import { type ProductVariants } from '../../types/product';
import { buildProductUrl, getCurrentVariantSlugs } from '../../utils/variantUrl';

interface VariantSelectorProps {
  title: string;
  variants: Variant[];
  selectedId: string;
  variantKey: string;  // Nuevo: clave del tipo de variante (ej: "color", "capacidad")
  productId: string;   // Nuevo: ID del producto
  allVariants: ProductVariants;  // Nuevo: todas las variantes para construir URL
  onSelect?: (variantId: string) => void;
  showImages?: boolean;
  className?: string;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  title,
  variants,
  selectedId,
  variantKey,
  productId,
  allVariants,
  onSelect,
  showImages = false,
  className = '',
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedVariant = variants.find(v => v.id === selectedId);

  const handleVariantClick = (variant: Variant) => {
    if (variant.available === false) return;

    // Obtener los slugs actuales de todas las variantes
    const currentSlugs = getCurrentVariantSlugs(location.pathname, allVariants);

    // Reemplazar solo el slug de la variante clickeada
    const newSlugs = {
      ...currentSlugs,
      [variantKey]: variant.slug,
    };

    // Construir la nueva URL con todas las variantes
    const newUrl = buildProductUrl(productId, newSlugs, allVariants);

    // Navegar a la nueva URL
    navigate(newUrl);

    // Llamar al callback si existe
    if (onSelect) {
      onSelect(variant.id);
    }
  };

  return (
    <div className={className}>
      <div className="mb-3">
        <h3 className="text-sm font-medium text-ml-gray-dark mb-1">
          {title}: <span className="font-semibold">{selectedVariant?.label || selectedVariant?.value}</span>
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <VariantButton
            key={variant.id}
            variant={variant}
            isSelected={variant.id === selectedId}
            onClick={() => handleVariantClick(variant)}
            showImage={showImages}
          />
        ))}
      </div>

      {variants.some(v => v.available === false) && (
        <p className="text-xs text-ml-gray-medium mt-2">
          Algunas variantes no están disponibles
        </p>
      )}
    </div>
  );
};

export default VariantSelector;
