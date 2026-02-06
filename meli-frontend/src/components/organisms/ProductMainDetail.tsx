import React from 'react';
import { Heart, Store } from 'lucide-react';
import ProductGallery from '../molecules/ProductGallery';
import ProductBadge from '../atoms/ProductBadge';
import ProductRating from './ProductRating';
import PriceDisplay from '../atoms/PriceDisplay';
import VariantSelector from '../molecules/VariantSelector';
import ProductHighlights from './ProductHighlights';
import { type ProductVariants } from '../../types/product';

interface ProductMainDetailProps {
  // Información del producto
  productId: string;  // Nuevo: ID del producto para construcción de URLs
  title: string;
  images: string[];
  productRating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  highlights: string[];
  condition?: 'new' | 'used';
  soldCount?: number;
  categoryRank?: string; // ej: "15° en Celulares y Smartphones"
  isBestSeller?: boolean;

  // Variantes
  variants: ProductVariants;
  onVariantChange?: (variantType: string, variantId: string) => void;

  // Vendedor
  seller: {
    name: string;
    isOfficialStore?: boolean;
  };

  className?: string;
}

export const ProductMainDetail: React.FC<ProductMainDetailProps> = ({
  productId,
  title,
  images,
  productRating,
  reviewCount,
  price,
  originalPrice,
  discount,
  highlights,
  variants,
  onVariantChange,
  seller,
  condition = 'new',
  soldCount,
  categoryRank,
  isBestSeller = false,
  className = '',
}) => {
  return (
    <>
      {/* Layout Mobile */}
      <div className={`lg:hidden flex flex-col gap-4 w-full ${className}`}>
        {/* 1. Tienda Oficial */}
        <a href="#tienda" className="flex items-center gap-1 text-ml-blue text-sm hover:underline">
          <Store className="w-4 h-4" />
          Visita la Tienda oficial de {seller.name}
          {seller.isOfficialStore && (
            <span className="text-ml-blue">✓</span>
          )}
        </a>

        {/* 2. Condición, vendidos y rating */}
        <div className="flex items-center justify-between text-sm text-ml-gray-dark">
          <div className="flex items-center gap-2">
            <span>{condition === 'new' ? 'Nuevo' : 'Usado'}</span>
            {soldCount && (
              <>
                <span>|</span>
                <span>+{soldCount} vendidos</span>
              </>
            )}
          </div>
          <ProductRating
            rating={productRating}
            reviewCount={reviewCount}
            compact
          />
        </div>

        {/* 3. Badge MÁS VENDIDO y categoría */}
        {isBestSeller && categoryRank && (
          <div className="flex items-center gap-2">
            <ProductBadge text="MÁS VENDIDO" variant="bestseller" />
            <span className="text-xs text-ml-blue">{categoryRank}</span>
          </div>
        )}

        {/* 4. Título */}
        <h1 className="text-xl font-normal text-ml-gray-dark">
          {title}
        </h1>

        {/* 5. Galería */}
        <ProductGallery
          images={images}
          productName={title}
        />

        {/* 6. Variantes */}
        <div className="space-y-4">
          {Object.entries(variants)
            .sort(([, a], [, b]) => (a.order || 0) - (b.order || 0))
            .map(([key, variantGroup]) => (
              <VariantSelector
                key={key}
                title={variantGroup.title}
                variants={variantGroup.options}
                selectedId={variantGroup.selectedId}
                variantKey={key}
                productId={productId}
                allVariants={variants}
                onSelect={onVariantChange ? (id) => onVariantChange(key, id) : undefined}
                showImages={variantGroup.showImages ?? false}
              />
            ))
          }
        </div>

        {/* 7. Precio */}
        <PriceDisplay
          amount={price}
          originalPrice={originalPrice}
          discount={discount}
          size="lg"
        />

        {/* 8. Highlights */}
        <ProductHighlights highlights={highlights} />
      </div>

      {/* Layout Desktop */}
      <div className={`hidden lg:grid grid-cols-[50%_50%] gap-6 w-full ${className}`}>
        {/* Columna izquierda: Galería */}
        <div>
          <ProductGallery
            images={images}
            productName={title}
          />
        </div>

        {/* Columna derecha: Info del producto */}
        <div className="space-y-4 p-2">
          {/* Tienda Oficial */}
          <a href="#tienda" className="flex items-center gap-1 text-ml-blue text-sm hover:underline">
            <Store className="w-4 h-4" />
            Visita la Tienda oficial de {seller.name}
            {seller.isOfficialStore && (
              <span className="text-ml-blue">✓</span>
            )}
          </a>

          {/* Badge Nuevo + Favorito */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <ProductBadge text="Nuevo" variant="new" />
            </div>
            <button className="p-2 hover:bg-ml-gray-light rounded-full transition-colors">
              <Heart className="w-6 h-6 text-ml-blue" />
            </button>
          </div>

          {/* Título */}
          <h1 className="text-2xl font-bold text-ml-gray-dark">
            {title}
          </h1>

          {/* Rating */}
          <ProductRating
            rating={productRating}
            reviewCount={reviewCount}
            className="mb-4"
          />

          {/* Precio */}
          <div>
            <PriceDisplay
              amount={price}
              originalPrice={originalPrice}
              discount={discount}
              size="lg"
              className="mb-2"
            />
            <p className="text-ml-green text-sm font-medium">
              6 cuotas de ${Math.round(price / 6).toLocaleString('es-CL')} sin interés
            </p>
            <a href="#" className="text-ml-blue text-xs hover:underline">
              Ver los medios de pago
            </a>
          </div>

          {/* Variantes */}
          <div className="space-y-4">
            {Object.entries(variants)
              .sort(([, a], [, b]) => (a.order || 0) - (b.order || 0))
              .map(([key, variantGroup]) => (
                <VariantSelector
                  key={key}
                  title={variantGroup.title}
                  variants={variantGroup.options}
                  selectedId={variantGroup.selectedId}
                  variantKey={key}
                  productId={productId}
                  allVariants={variants}
                  onSelect={onVariantChange ? (id) => onVariantChange(key, id) : undefined}
                  showImages={variantGroup.showImages ?? false}
                />
              ))
            }
          </div>

          {/* Highlights */}
          <ProductHighlights highlights={highlights} />
        </div>
      </div>
    </>
  );
};

export default ProductMainDetail;
