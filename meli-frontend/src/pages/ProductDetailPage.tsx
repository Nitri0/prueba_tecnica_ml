import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ProductDetailLayout from '../components/templates/ProductDetailLayout';
import ProductMainDetail from '../components/organisms/ProductMainDetail';
import ProductCharacteristics from '../components/organisms/ProductCharacteristics';
import ProductDescription from '../components/organisms/ProductDescription';
import QuestionsSection from '../components/organisms/QuestionsSection';
import RelatedProducts from '../components/organisms/RelatedProducts';
import Breadcrumb from '../components/organisms/Breadcrumb';
import Separator from '@/components/atoms/Separator';
import PurchaseBox from '@/components/organisms/PurchaseBox';
import SellerCard from '@/components/organisms/SellerCard';
import PaymentMethods from '@/components/organisms/PaymentMethods';
import ProductReviews from '@/components/organisms/ProductReviews';
import { parseProductUrl } from '../utils/variantUrl';
import { useProduct } from '../hooks/useProduct';
import type { ProductVariants } from '../types/product';

/**
 * Página de detalle de producto usando el servicio de API
 * Esta versión usa useProduct hook que consulta el servicio configurado
 */

export const ProductDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams<{ productId: string }>();
  const [cartCount, setCartCount] = useState(0);

  // Redirect de producto base a variante por defecto (Natural 256GB)
  // El producto base fue eliminado para evitar duplicación con MLC137702355
  React.useEffect(() => {
    if (productId === 'MLC123456789') {
      navigate('/producto/MLC137702355', { replace: true });
    }
  }, [productId, navigate]);

  // Extraer base product ID (sin slugs de variantes en la URL)
  // Ejemplo: "MLC123456789-azul-256gb" → "MLC123456789"
  // O directamente: "MLC928744140" → "MLC928744140"
  const baseProductId = useMemo(() => {
    if (!productId) return undefined;

    // Si el ID tiene guiones, es formato antiguo con slugs
    if (productId.includes('-')) {
      return productId.split('-')[0];
    }

    // Si no tiene guiones, es un ID independiente (cargarlo directamente)
    return productId;
  }, [productId]);

  // Estado para manejar el fetch del producto variante específico
  const [variantProduct, setVariantProduct] = useState<any>(null);
  const [loadingVariant, setLoadingVariant] = useState(false);

  // Hook que maneja loading, error y datos del producto BASE desde la API
  // IMPORTANTE: Siempre carga el producto base primero para obtener configuración de variantes
  const { product: baseProduct, loading, error, refetch } = useProduct(baseProductId);

  // Efecto para cargar el producto variante cuando cambia la URL
  useEffect(() => {
    // Si no tenemos el producto base aún, no hacer nada
    if (!baseProduct) {
      setVariantProduct(null);
      return;
    }

    // Caso 1: URL con ID directo (sin slugs) - /producto/MLC928744140
    // Si el productId no tiene guiones, es un ID independiente
    if (productId && !productId.includes('-')) {
      // Si es diferente al base ID, es una variante específica
      if (productId !== baseProduct.basics.id) {
        const loadDirectVariant = async () => {
          // Si ya tenemos este producto cargado, no volver a cargar
          if (variantProduct?.basics?.id === productId) {
            return;
          }

          setLoadingVariant(true);
          try {
            const { getProductService } = await import('../services/ProductServiceFactory');
            const productService = getProductService();
            const data = await productService.getProductById(productId);
            setVariantProduct(data);
          } catch (err) {
            console.error('Error cargando producto variante:', err);
            setVariantProduct(null);
          } finally {
            setLoadingVariant(false);
          }
        };
        loadDirectVariant();
        return;
      }

      // Si es el mismo que el base, no cargar variante
      setVariantProduct(null);
      return;
    }

    // Caso 2: URL con slugs (formato antiguo) - /producto/MLC123456789-azul-256gb
    // Parsear variantes desde la URL
    const slugsFromUrl = parseProductUrl(location.pathname, baseProduct.variants);

    // Si no hay variantes en la URL, usar producto base
    if (!slugsFromUrl || Object.keys(slugsFromUrl).length === 0) {
      setVariantProduct(null);
      return;
    }

    // Resolver y cargar el producto variante específico
    const loadVariantProduct = async () => {
      setLoadingVariant(true);
      try {
        const { getProductService } = await import('../services/ProductServiceFactory');
        const productService = getProductService();

        // 1. Resolver el product ID basado en las variantes
        const baseId = productId?.split('-')[0] || '';
        const resolvedProductId = await productService.resolveVariantProductId(
          baseId,
          slugsFromUrl
        );

        // Si ya tenemos este producto cargado, no volver a cargar
        if (variantProduct?.basics?.id === resolvedProductId) {
          setLoadingVariant(false);
          return;
        }

        // 2. Cargar el producto completo con el ID resuelto
        const data = await productService.getProductById(resolvedProductId);
        setVariantProduct(data);
      } catch (err) {
        console.error('Error cargando producto variante:', err);
        setVariantProduct(null);
      } finally {
        setLoadingVariant(false);
      }
    };

    loadVariantProduct();
  }, [location.pathname, productId, baseProduct]);

  // Producto a mostrar: variante si existe, sino el base
  const product = variantProduct || baseProduct;

  const handleSearch = (query: string) => {
    console.log('Buscando:', query);
    // Aquí iría la lógica de búsqueda
  };

  const handleBuy = (quantity: number) => {
    console.log('Comprar cantidad:', quantity);
    // Aquí iría la lógica de compra
  };

  const handleAddToCart = (quantity: number) => {
    console.log('Agregar al carrito:', quantity);
    setCartCount(cartCount + quantity);
    // Aquí iría la lógica de agregar al carrito
  };

  const handleAskQuestion = (question: string) => {
    console.log('Nueva pregunta:', question);
    // Aquí iría la lógica para enviar la pregunta
  };

  const handleProductClick = (productId: string) => {
    navigate(`/producto/${productId}`);
  };

  // Estados de carga y error
  if (loading || loadingVariant) {
    return (
      <ProductDetailLayout onSearch={handleSearch} cartItemsCount={cartCount}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-ml-blue"></div>
            <p className="text-gray-600">
              {loadingVariant ? 'Cargando variante...' : 'Cargando producto...'}
            </p>
          </div>
        </div>
      </ProductDetailLayout>
    );
  }

  if (error) {
    return (
      <ProductDetailLayout onSearch={handleSearch} cartItemsCount={cartCount}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-md p-6 text-center bg-white rounded-lg shadow-lg">
            <div className="mb-4 text-6xl">⚠️</div>
            <h2 className="mb-2 text-xl font-bold text-gray-800">Error al cargar producto</h2>
            <p className="mb-4 text-gray-600">{error}</p>
            <button
              onClick={() => refetch()}
              className="px-6 py-2 text-white transition-colors rounded-lg bg-ml-blue hover:bg-ml-blue/90"
            >
              Reintentar
            </button>
          </div>
        </div>
      </ProductDetailLayout>
    );
  }

  if (!product) {
    return (
      <ProductDetailLayout onSearch={handleSearch} cartItemsCount={cartCount}>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-600">Producto no encontrado</p>
        </div>
      </ProductDetailLayout>
    );
  }

  // Parsear la URL actual para obtener las variantes seleccionadas
  const selectedVariantIds = parseProductUrl(location.pathname, product.variants);

  // Crear objeto de variantes con los IDs seleccionados basados en la URL actual
  const currentVariants: ProductVariants = Object.entries(product.variants).reduce(
    (acc, [key, variantGroup]) => {
      const selectedId = selectedVariantIds?.[key] || (variantGroup as any).selectedId;

      acc[key] = {
        ...(variantGroup as any),
        selectedId,
      };

      return acc;
    },
    {} as ProductVariants
  );

  return (
    <ProductDetailLayout onSearch={handleSearch} cartItemsCount={cartCount}>
      {/* Breadcrumb - Oculto en mobile */}
      <div className="hidden lg:block">
        <Breadcrumb
          items={[
            ...product.categoryPath,
            { label: product.basics.title, isCurrentPage: true },
          ]}
          showBackButton={true}
          backLabel="Volver"
        />
      </div>

      <div className="flex p-6 bg-white border shadow-md border-box border-ml-gray-border">
        <div className="flex flex-col lg:grid lg:grid-cols-[70%_30%] gap-6 w-full">

          {/* Detalle principal del producto */}
          <div className="space-y-4 ">
            <ProductMainDetail
              productId={product.basics.id}
              title={product.basics.title}
              images={product.media.images}
              averageRating={product.averageRating}
              reviewCount={product.reviewCount}
              price={product.basics.price}
              originalPrice={product.basics.originalPrice}
              discount={product.basics.discount}
              highlights={product.highlights}
              variants={currentVariants}
              seller={{ name: product.seller.name }}
            />
          </div>

          {/* Box de compra -  en mobile, aparece en sidebar en desktop */}
          <div className="space-y-4 lg:order-none lg:row-span-4 lg:px-4">
            <PurchaseBox
              price={product.basics.price}
              originalPrice={product.basics.originalPrice}
              discount={product.basics.discount}
              condition={product.basics.condition}
              soldCount={product.basics.soldCount}
              availableStock={product.basics.availableStock}
              onBuy={handleBuy}
              onAddToCart={handleAddToCart}
            />

            {/* Seller info compacto - solo visible en desktop dentro del sidebar */}
            <SellerCard
              name={product.seller.name}
              logo={product.seller.logo}
              isOfficialStore={product.seller.isOfficialStore}
              followers={product.seller.followers}
              totalProducts={product.seller.totalProducts}
              level={product.seller.level}
              totalSales={product.seller.totalSales}
              reputation={product.seller.reputation}
              reputationMessage={product.seller.reputationMessage}
              goodAttention={product.seller.goodAttention}
              onTimeDelivery={product.seller.onTimeDelivery}
            />

            {/* Medios de pago */}
            <PaymentMethods
              maxInstallments={product.maxInstallments}
              paymentMethods={product.paymentMethods}
            />

          </div>

          <Separator className="my-6" />
          {/* Productos relacionados - order-3 en mobile */}
          <div className="order-3">

            <RelatedProducts
              products={product.relatedProducts}
              onProductClick={handleProductClick}
            />

            <Separator className="my-6" />

            {/* Características */}
            <ProductCharacteristics
              characteristics={product.characteristics}
            />

            <Separator className="my-6" />

            {/* Descripción */}
            <ProductDescription
              description={product.basics.description}
              images={product.media.descriptionImages}
              className="mb-8"
            />

          </div>
        </div>
      </div>

      {/* Preguntas y respuestas */}
      <QuestionsSection
        questions={product.questions}
        onAskQuestion={handleAskQuestion}
      />

      {/* Opiniones del producto */}
      <ProductReviews
        reviews={product.reviews}
        averageRating={product.averageRating}
        totalReviews={product.totalReviews}
        ratingDistribution={product.ratingDistribution}
        availableCategories={product.availableRatingCategories}
        averageCategoryRatings={product.averageCategoryRatings}
      />

    </ProductDetailLayout>
  );
};

export default ProductDetailPage;
