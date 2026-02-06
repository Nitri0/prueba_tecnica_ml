import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface RelatedProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
  installments?: number;
  installmentAmount?: number;
  isFreeShipping?: boolean;
  isFirstPurchaseFreeShipping?: boolean;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  title?: string;
  showAd?: boolean;
  onProductClick?: (productId: string) => void;
  className?: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  title = 'Productos relacionados',
  showAd = true,
  onProductClick,
  className = '',
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    dragFree: false,
    watchDrag: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    // Verificar que los métodos existan antes de llamarlos
    if (typeof emblaApi.canScrollPrev === 'function') {
      setCanScrollPrev(emblaApi.canScrollPrev());
    }
    if (typeof emblaApi.canScrollNext === 'function') {
      setCanScrollNext(emblaApi.canScrollNext());
    }
    if (typeof emblaApi.selectedScrollSnap === 'function') {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    // Verificar que scrollSnapList exista
    if (typeof emblaApi.scrollSnapList === 'function') {
      setScrollSnaps(emblaApi.scrollSnapList());
    }

    // Verificar que los métodos de eventos existan
    if (typeof emblaApi.on === 'function' && typeof emblaApi.off === 'function') {
      emblaApi.on('select', onSelect);
      emblaApi.on('reInit', onSelect);

      return () => {
        emblaApi.off('select', onSelect);
        emblaApi.off('reInit', onSelect);
      };
    }
  }, [emblaApi, onSelect]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-CL');
  };

  if (products.length === 0) return null;

  return (
    <div className={`bg-white ${className}`}>
      {/* Header con título y "Ad" */}
      <div className="flex items-center justify-between ">
        <h2 className="mb-6 text-2xl font-normal md:text-2xl text-ml-gray-dark">
          {title}
        </h2>
        {showAd && (
          <span className="text-xs md:text-sm text-ml-gray-medium">Ad</span>
        )}
      </div>

      {/* Carousel con flechas */}
      <div className="relative">
        {/* Flecha izquierda */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="absolute left-0 z-10 flex items-center justify-center transition-all -translate-x-1/2 -translate-y-1/2 bg-white border rounded-full shadow-lg top-1/2 w-9 h-9 md:w-12 md:h-12 border-ml-gray-border hover:bg-ml-gray-light disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white active:scale-95"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-ml-gray-dark" />
        </button>

        {/* Productos */}
        <div className="overflow-hidden touch-pan-y" ref={emblaRef}>
          <div className="flex gap-3 -ml-0 md:gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-[0_0_calc(50%-6px)] md:flex-[0_0_calc(50%-8px)] lg:flex-[0_0_calc(33.333%-11px)] min-w-0 pl-0"
                onClick={() => onProductClick?.(product.id)}
              >
                <div className="flex flex-col h-full overflow-hidden transition-shadow bg-white border rounded-lg cursor-pointer select-none border-ml-gray-border hover:shadow-lg">
                  {/* Imagen del producto */}
                  <div className="relative bg-white aspect-square">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-contain w-full h-full p-4 md:p-6"
                    />
                  </div>

                  {/* Información del producto */}
                  <div className="flex flex-col flex-1 p-3 md:p-4">
                    {/* Título */}
                    <h3 className="text-xs md:text-sm text-ml-gray-dark line-clamp-2 mb-2 md:mb-3 min-h-[32px] md:min-h-[40px]">
                      {product.title}
                    </h3>

                    {/* Precio original tachado */}
                    {product.originalPrice && (
                      <p className="mb-1 text-xs line-through md:text-sm text-ml-gray-medium">
                        $ {formatPrice(product.originalPrice)}
                      </p>
                    )}

                    {/* Precio actual y descuento */}
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xl font-normal md:text-2xl text-ml-gray-dark">
                        $ {formatPrice(product.price)}
                      </p>
                      {product.discount && (
                        <span className="text-xs font-semibold md:text-sm text-ml-green">
                          {product.discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Cuotas sin interés */}
                    {product.installments && product.installmentAmount && (
                      <p className="text-[10px] md:text-xs text-ml-green font-normal mb-2">
                        {product.installments} cuotas de $ {formatPrice(product.installmentAmount)} sin interés
                      </p>
                    )}

                    {/* Envío gratis */}
                    {product.isFreeShipping && (
                      <div className="mt-auto">
                        <span className="text-xs font-semibold md:text-sm text-ml-green">
                          Envío gratis
                        </span>
                        {product.isFirstPurchaseFreeShipping && (
                          <span className="text-[10px] md:text-sm text-ml-gray-medium ml-1">
                            por ser tu primera compra
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flecha derecha */}
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="absolute right-0 z-10 flex items-center justify-center transition-all translate-x-1/2 -translate-y-1/2 bg-white border rounded-full shadow-lg top-1/2 w-9 h-9 md:w-12 md:h-12 border-ml-gray-border hover:bg-ml-gray-light disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white active:scale-95"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-ml-gray-dark" />
        </button>
      </div>

      {/* Indicadores de puntos (dots) */}
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? 'bg-ml-blue w-6'
                  : 'bg-ml-gray-border hover:bg-ml-gray-medium'
              }`}
              aria-label={`Ir a página ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
