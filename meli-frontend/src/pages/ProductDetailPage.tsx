import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductDetailLayout from '../components/templates/ProductDetailLayout';
import ProductMainDetail from '../components/organisms/ProductMainDetail';
import ProductCharacteristics from '../components/organisms/ProductCharacteristics';
import ProductDescription from '../components/organisms/ProductDescription';
import QuestionsSection from '../components/organisms/QuestionsSection';
import RelatedProducts, { type RelatedProduct } from '../components/organisms/RelatedProducts';
import Breadcrumb from '../components/organisms/Breadcrumb';
import { type Question } from '../components/molecules/QuestionItem';
import { type ProductVariants, type ProductCharacteristic } from '../types/product';
import Separator from '@/components/atoms/Separator';
import PurchaseBox from '@/components/organisms/PurchaseBox';
import SellerCard from '@/components/organisms/SellerCard';
import PaymentMethods from '@/components/organisms/PaymentMethods';
import ProductReviews from '@/components/organisms/ProductReviews';
import { parseProductUrl } from '../utils/variantUrl';


// Datos mock para demostración
const mockProduct = {
  id: 'MLC123456789',
  title: 'iPhone 15 Pro Max 256GB Titanio Natural',
  price: 1299990,
  originalPrice: 1499990,
  discount: 13,
  condition: 'new' as const,
  soldCount: 1247,
  availableStock: 15,
  productRating: 4.8,
  reviewCount: 769,
  categoryPath: [
    { label: 'Electrónica', href: '/categoria/electronica' },
    { label: 'Celulares y Smartphones', href: '/categoria/electronica/celulares' },
    { label: 'iPhone', href: '/categoria/electronica/celulares/iphone' },
  ],
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_863735-MLA71782896219_092023-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_693037-MLA71782896221_092023-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_686692-MLA71782896223_092023-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_740308-MLA71782896225_092023-F.webp',
  ],
  seller: {
    name: 'digitekcl',
    logo: 'https://http2.mlstatic.com/D_NQ_NP_2X_863735-MLA71782896219_092023-F.webp',
    isOfficialStore: false,
    followers: 50,
    totalProducts: 50,
    level: 'bronze' as const,
    location: 'Santiago, Región Metropolitana',
    positiveRating: 99,
    totalSales: 100,
    rating: 4.8,
    reviewCount: 3241,
    reputation: {
      red: 5,
      orange: 5,
      yellow: 10,
      green: 80,
    },
    reputationMessage: '¡Uno de los mejores del sitio!',
    goodAttention: true,
    onTimeDelivery: true,
  },
  shipping: {
    isFree: true,
    estimatedDays: { min: 2, max: 3 },
  },
  characteristics: [
    // Característica con rango visual
    {
      type: 'range',
      name: 'Tamaño de la pantalla',
      value: '6.7"',
      current: 75,
      min: 4,
      max: 8,
      minLabel: 'PEQUEÑO',
      maxLabel: 'GRANDE',
      icon: 'Smartphone',
    },
    // Características destacadas con íconos
    {
      type: 'highlight',
      name: 'Memoria interna',
      value: '256 GB',
      icon: 'HardDrive',
    },
    {
      type: 'highlight',
      name: 'Cámara trasera principal',
      value: '48 Mpx',
      icon: 'Camera',
    },
    // Categorías agrupadas
    {
      type: 'category',
      categoryName: 'Características generales',
      characteristics: [
        { name: 'Marca', value: 'Apple' },
        { name: 'Línea', value: 'iPhone' },
        { name: 'Modelo', value: 'iPhone 15 Pro Max' },
        { name: 'Color', value: 'Titanio Natural' },
      ],
    },
    {
      type: 'category',
      categoryName: 'Pantalla',
      characteristics: [
        { name: 'Tamaño de pantalla', value: '6.7"' },
        { name: 'Resolución', value: '2796 x 1290 px' },
        { name: 'Tipo de pantalla', value: 'Super Retina XDR' },
      ],
    },
    {
      type: 'category',
      categoryName: 'Sistema operativo',
      characteristics: [
        { name: 'Nombre del sistema operativo', value: 'iOS 17' },
      ],
    },
    {
      type: 'category',
      categoryName: 'Memoria',
      characteristics: [
        { name: 'Memoria interna', value: '256 GB' },
        { name: 'Memoria RAM', value: '8 GB' },
      ],
    },
    {
      type: 'category',
      categoryName: 'Cámara',
      characteristics: [
        { name: 'Cámara trasera', value: 'Triple 48 MP + 12 MP + 12 MP' },
        { name: 'Cámara frontal', value: '12 MP' },
      ],
    },
    {
      type: 'category',
      categoryName: 'Procesador',
      characteristics: [
        { name: 'Modelo del procesador', value: 'A17 Pro' },
        { name: 'Cantidad de núcleos', value: '6' },
      ],
    },
    {
      type: 'category',
      categoryName: 'Batería',
      characteristics: [
        { name: 'Capacidad de batería', value: '4422 mAh' },
      ],
    },
    {
      type: 'category',
      categoryName: 'Dimensiones y peso',
      characteristics: [
        { name: 'Peso', value: '221 g' },
        { name: 'Alto', value: '159.9 mm' },
        { name: 'Ancho', value: '76.7 mm' },
        { name: 'Profundidad', value: '8.25 mm' },
      ],
    },
  ] as ProductCharacteristic[],
  description: `El iPhone 15 Pro Max redefine lo que significa tener el smartphone más avanzado del mundo. Con su diseño de titanio aeroespacial, es el iPhone más ligero de la línea Pro que hemos creado.

CHIP A17 PRO
Súper potente y súper eficiente. El chip A17 Pro lleva el rendimiento y la eficiencia energética a un nivel completamente nuevo. Acelera tareas intensivas como los juegos más exigentes con gráficos de consola.

SISTEMA DE CÁMARAS PRO
Más zoom. Más creatividad. Captura fotos espectaculares con todo detalle gracias a la cámara principal de 48 MP. Y con el teleobjetivo de 120 mm, puedes acercarte hasta 5x al sujeto. Es perfecto para capturar primeros planos impresionantes.

PANTALLA SUPER RETINA XDR
Una pantalla tan brillante como ninguna. La pantalla Super Retina XDR con ProMotion lleva la experiencia visual a un nivel superior. Y ahora brilla hasta dos veces más que antes bajo el sol.

DISEÑO DE TITANIO
El titanio es uno de los metales con mejor relación resistencia-peso. Por eso el iPhone 15 Pro Max cuenta con un diseño súper resistente y es el iPhone Pro más liviano que hemos creado.

Incluye:
• iPhone 15 Pro Max
• Cable de carga USB-C
• Documentación`,
  descriptionImages: [],
  questions: [
    {
      id: '1',
      question: '¿Viene desbloqueado para cualquier compañía?',
      answer: 'Sí, el equipo viene liberado de fábrica y funciona con cualquier operador.',
      askedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      answeredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 3600000),
      status: 'answered' as const,
    },
    {
      id: '2',
      question: '¿Tiene garantía oficial de Apple?',
      answer: 'Sí, cuenta con 1 año de garantía oficial Apple Chile.',
      askedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      answeredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 7200000),
      status: 'answered' as const,
    },
    {
      id: '3',
      question: '¿Es nuevo o reacondicionado?',
      answer: 'Es completamente nuevo, sellado de fábrica.',
      askedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      answeredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 1800000),
      status: 'answered' as const,
    },
  ] as Question[],
  relatedProducts: [
    {
      id: '1',
      title: 'Nothing Phone (3a) Pro Celular 12gb Ram 256gb Rom 5g Color Negro',
      price: 599990,
      originalPrice: undefined,
      image: 'https://http2.mlstatic.com/D_NQ_NP_2X_786692-MLA71782896227_092023-F.webp',
      discount: undefined,
      installments: 12,
      installmentAmount: 49999,
      isFreeShipping: true,
      isFirstPurchaseFreeShipping: true,
    },
    {
      id: '2',
      title: 'Moto Edge 60 Fusion Rosa 8+256',
      price: 329990,
      originalPrice: 499990,
      image: 'https://http2.mlstatic.com/D_NQ_NP_2X_824829-MLA69459850594_052023-F.webp',
      discount: 34,
      installments: 6,
      installmentAmount: 54998,
      isFreeShipping: true,
      isFirstPurchaseFreeShipping: true,
    },
    {
      id: '3',
      title: 'Oukitel Wp55pro 16+32gb 512gb Dual Sim Celulares Resistentes',
      price: 361889,
      originalPrice: 517301,
      image: 'https://http2.mlstatic.com/D_NQ_NP_2X_895547-MLA69735768157_062023-F.webp',
      discount: 30,
      installments: 12,
      installmentAmount: 30157,
      isFreeShipping: true,
      isFirstPurchaseFreeShipping: true,
    },
    {
      id: '4',
      title: 'Samsung Galaxy S24 Ultra 256GB Titanium Gray',
      price: 1299990,
      originalPrice: 1499990,
      image: 'https://http2.mlstatic.com/D_NQ_NP_2X_747453-MLA71782896229_092023-F.webp',
      discount: 13,
      installments: 12,
      installmentAmount: 108332,
      isFreeShipping: true,
      isFirstPurchaseFreeShipping: true,
    },
  ] as RelatedProduct[],
  variants: {
    color: {
      title: 'Color',
      options: [
        {
          id: 'natural',
          label: 'Titanio Natural',
          value: 'Titanio Natural',
          image: 'https://http2.mlstatic.com/D_NQ_NP_2X_863735-MLA71782896219_092023-F.webp',
          slug: 'natural',
          available: true,
        },
        {
          id: 'azul',
          label: 'Titanio Azul',
          value: 'Titanio Azul',
          image: 'https://http2.mlstatic.com/D_NQ_NP_2X_693037-MLA71782896221_092023-F.webp',
          slug: 'azul',
          available: true,
        },
        {
          id: 'negro',
          label: 'Titanio Negro',
          value: 'Titanio Negro',
          image: 'https://http2.mlstatic.com/D_NQ_NP_2X_686692-MLA71782896223_092023-F.webp',
          slug: 'negro',
          available: true,
        },
        {
          id: 'blanco',
          label: 'Titanio Blanco',
          value: 'Titanio Blanco',
          image: 'https://http2.mlstatic.com/D_NQ_NP_2X_740308-MLA71782896225_092023-F.webp',
          slug: 'blanco',
          available: false,
        },
      ],
      selectedId: 'natural',
      showImages: true,
      order: 1,
    },
    capacidad: {
      title: 'Capacidad',
      options: [
        {
          id: '128gb',
          label: '128 GB',
          value: '128 GB',
          slug: '128gb',
          available: true,
        },
        {
          id: '256gb',
          label: '256 GB',
          value: '256 GB',
          slug: '256gb',
          available: true,
        },
        {
          id: '512gb',
          label: '512 GB',
          value: '512 GB',
          slug: '512gb',
          available: true,
        },
        {
          id: '1tb',
          label: '1 TB',
          value: '1 TB',
          slug: '1tb',
          available: false,
        },
      ],
      selectedId: '256gb',
      showImages: false,
      order: 2,
    },
  } as ProductVariants,
  highlights: [
    'Escritorio en L amplio',
    'Estantería móvil independiente',
    'Estructura metálica resistente',
    'Almacenamiento inteligente',
    'Ruedas con freno seguro',
  ],
  paymentMethods: [
    {
      id: 'mercadopago',
      name: 'Mercado Pago',
      imageUrl: 'https://http2.mlstatic.com/storage/logos-api-admin/f3e8e940-f549-11ef-bad6-e9962bcd76e5-xl.svg',
      type: 'cash' as const,
    },
    {
      id: 'amex',
      name: 'American Express',
      imageUrl: 'https://images.icon-icons.com/2341/PNG/512/amex_payment_method_card_icon_142744.png',
      type: 'credit' as const,
    },
    {
      id: 'visa',
      name: 'Visa',
      imageUrl: 'https://images.icon-icons.com/2342/PNG/512/visa_payment_method_card_icon_142746.png',
      type: 'credit' as const,
    },
    {
      id: 'mastercard',
      name: 'Mastercard',
      imageUrl: 'https://images.icon-icons.com/2342/PNG/512/mastercard_payment_method_icon_142750.png',
      type: 'credit' as const,
    },
    {
      id: 'visa-debit',
      name: 'Visa Débito',
      imageUrl: 'https://images.icon-icons.com/2342/PNG/512/visa_payment_method_card_icon_142746.png',
      type: 'debit' as const,
    },
    {
      id: 'mastercard-debit',
      name: 'Mastercard Débito',
      imageUrl: 'https://images.icon-icons.com/2342/PNG/512/mastercard_payment_method_icon_142750.png',
      type: 'debit' as const,
    },
  ],
  maxInstallments: 12,
  availableRatingCategories: [
    { id: 'camera_quality', name: 'Calidad de la cámara', order: 1 },
    { id: 'value_for_money', name: 'Relación precio-calidad', order: 2 },
    { id: 'battery_life', name: 'Duración de la batería', order: 3 },
    { id: 'durability', name: 'Durabilidad', order: 4 },
  ],
  reviews: [
    {
      id: '1',
      userName: 'Carlos Muñoz',
      rating: 4.75, // Promedio de categoryRatings: (5+5+4+5)/4 = 4.75
      date: 'Hace 2 días',
      comment: 'Excelente producto, llegó en perfecto estado y super rápido. La calidad es muy buena, totalmente recomendado.',
      likes: 12,
      verified: true,
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1592286927505-67d2b9da3b10?w=400&h=400&fit=crop',
      ],
      categoryRatings: {
        'camera_quality': 5,
        'value_for_money': 5,
        'battery_life': 4,
        'durability': 5,
      },
    },
    {
      id: '2',
      userName: 'María González',
      rating: 4.25, // Promedio de categoryRatings: (4+5+4+4)/4 = 4.25
      date: 'Hace 1 semana',
      comment: 'Muy buen producto, aunque el envío se demoró un poco más de lo esperado. Pero en general estoy satisfecha con la compra.',
      likes: 5,
      verified: true,
      images: [
        'https://images.unsplash.com/photo-1591122947157-26bad3a117d2?w=400&h=400&fit=crop',
      ],
      categoryRatings: {
        'camera_quality': 4,
        'value_for_money': 5,
        'battery_life': 4,
        'durability': 4,
      },
    },
    {
      id: '3',
      userName: 'José Silva',
      rating: 4.75, // Promedio de categoryRatings: (5+4+5+5)/4 = 4.75
      date: 'Hace 2 semanas',
      comment: 'Increíble! Superó mis expectativas. El vendedor muy atento y el producto tal como se describe.',
      likes: 8,
      verified: true,
      categoryRatings: {
        'camera_quality': 5,
        'value_for_money': 4,
        'battery_life': 5,
        'durability': 5,
      },
    },
  ],
  averageRating: 4.8,
  totalReviews: 769,
  ratingDistribution: {
    5: 650,
    4: 89,
    3: 20,
    2: 5,
    1: 5,
  },
  averageCategoryRatings: {
    'camera_quality': 4.7,
    'value_for_money': 4.7,
    'battery_life': 4.3,
    'durability': 4.7,
  },
};

export const ProductDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

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

  // Parsear la URL actual para obtener las variantes seleccionadas
  const selectedVariantIds = parseProductUrl(location.pathname, mockProduct.variants);

  // Crear objeto de variantes con los IDs seleccionados basados en la URL actual
  const currentVariants: ProductVariants = Object.entries(mockProduct.variants).reduce(
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
            ...mockProduct.categoryPath,
            { label: mockProduct.title, isCurrentPage: true },
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
              productId={mockProduct.id}
              title={mockProduct.title}
              images={mockProduct.images}
              productRating={mockProduct.productRating}
              reviewCount={mockProduct.reviewCount}
              price={mockProduct.price}
              originalPrice={mockProduct.originalPrice}
              discount={mockProduct.discount}
              highlights={mockProduct.highlights}
              variants={currentVariants}
              seller={{ name: mockProduct.seller.name }}
            />
          </div>

          {/* Box de compra -  en mobile, aparece en sidebar en desktop */}
          <div className="space-y-4 lg:order-none lg:row-span-4 lg:px-4">
            <PurchaseBox
              price={mockProduct.price}
              originalPrice={mockProduct.originalPrice}
              discount={mockProduct.discount}
              condition={mockProduct.condition}
              soldCount={mockProduct.soldCount}
              availableStock={mockProduct.availableStock}
              onBuy={handleBuy}
              onAddToCart={handleAddToCart}
            />

            {/* Seller info compacto - solo visible en desktop dentro del sidebar */}
            <SellerCard
              name={mockProduct.seller.name}
              logo={mockProduct.seller.logo}
              isOfficialStore={mockProduct.seller.isOfficialStore}
              followers={mockProduct.seller.followers}
              totalProducts={mockProduct.seller.totalProducts}
              level={mockProduct.seller.level}
              totalSales={mockProduct.seller.totalSales}
              reputation={mockProduct.seller.reputation}
              reputationMessage={mockProduct.seller.reputationMessage}
              goodAttention={mockProduct.seller.goodAttention}
              onTimeDelivery={mockProduct.seller.onTimeDelivery}
            />

            {/* Medios de pago */}
            <PaymentMethods
              maxInstallments={mockProduct.maxInstallments}
              paymentMethods={mockProduct.paymentMethods}
            />

          </div>

          <Separator className="my-6" />
          {/* Productos relacionados - order-3 en mobile */}
          <div className="order-3">

            <RelatedProducts
              products={mockProduct.relatedProducts}
              onProductClick={handleProductClick}
            />

            <Separator className="my-6" />

            {/* Características */}
            <ProductCharacteristics
              characteristics={mockProduct.characteristics}
            />

            <Separator className="my-6" />

            {/* Descripción */}
            <ProductDescription
              description={mockProduct.description}
              images={mockProduct.descriptionImages}
              className="mb-8"
            />

          </div>
        </div>
      </div>

      {/* Preguntas y respuestas */}
      <QuestionsSection
        questions={mockProduct.questions}
        onAskQuestion={handleAskQuestion}
      />

      {/* Opiniones del producto */}
      <ProductReviews
        reviews={mockProduct.reviews}
        averageRating={mockProduct.averageRating}
        totalReviews={mockProduct.totalReviews}
        ratingDistribution={mockProduct.ratingDistribution}
        availableCategories={mockProduct.availableRatingCategories}
        averageCategoryRatings={mockProduct.averageCategoryRatings}
      />

    </ProductDetailLayout>
  );
};

export default ProductDetailPage;
