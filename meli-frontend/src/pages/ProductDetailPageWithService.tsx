import React, { useState } from 'react';
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
 * Página de detalle de producto usando el servicio de productos
 * Esta versión usa useProduct hook que consulta el servicio configurado (mock o API)
 */
export const ProductDetailPageWithService: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams<{ productId: string }>();
  const [cartCount, setCartCount] = useState(0);

  // Hook que maneja loading, error y datos del producto
  const { product, loading, error, refetch } = useProduct(productId);

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
  if (loading) {
    return (
      <ProductDetailLayout onSearch={handleSearch} cartItemsCount={cartCount}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-ml-blue"></div>
            <p className="text-gray-600">Cargando producto...</p>
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
      const selectedId = selectedVariantIds?.[key] || variantGroup.selectedId;

      acc[key] = {
        ...variantGroup,
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
            { label: product.title, isCurrentPage: true },
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
              productId={product.id}
              title={product.title}
              images={product.images}
              productRating={product.productRating}
              reviewCount={product.reviewCount}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              highlights={product.highlights}
              variants={currentVariants}
              seller={{ name: product.seller.name }}
            />
          </div>

          {/* Box de compra -  en mobile, aparece en sidebar en desktop */}
          <div className="space-y-4 lg:order-none lg:row-span-4 lg:px-4">
            <PurchaseBox
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              condition={product.condition}
              soldCount={product.soldCount}
              availableStock={product.availableStock}
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
              description={product.description}
              images={product.descriptionImages}
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

export default ProductDetailPageWithService;
