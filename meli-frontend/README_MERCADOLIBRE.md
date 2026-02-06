# 🛍️ Réplica de Página de Producto Mercado Libre

Transformación completa de la aplicación a una réplica visual y funcional de la página de detalle de producto de Mercado Libre Chile.

## 🎯 Objetivo

Crear una réplica exacta de la experiencia de usuario de la página de producto de Mercado Libre, manteniendo la arquitectura Atomic Design y utilizando React 19, TypeScript y Tailwind CSS.

## ✨ Características Implementadas

### 🎨 Diseño Fiel a Mercado Libre
- **Header amarillo característico** (#FFE600) con logo, barra de búsqueda y carrito
- **Colores oficiales**: Amarillo, Azul (#3483FA), Verde (#00A650)
- **Tipografía**: Proxima Nova / Inter
- **Espaciado y layout**: Contenedor de 1200px, grid responsive

### 🖼️ Componentes Principales

#### Header y Navegación
- Logo vectorial de Mercado Libre
- Barra de búsqueda prominente con ícono
- Links de navegación (Categorías, Ofertas, Ayuda)
- Carrito con contador de items

#### Galería de Producto
- Imagen principal grande (500px)
- Thumbnails laterales con selección
- Modal de zoom con navegación (anterior/siguiente)
- Indicador de posición (1/4)

#### Sección de Compra
- Precio con formato ML (símbolo, enteros, decimales separados)
- Precio tachado y badge de descuento
- Selector de cantidad con controles +/-
- Botón "Comprar ahora" (azul sólido)
- Botón "Agregar al carrito" (outline azul)
- Botones de favoritos y compartir

#### Información del Vendedor
- Badge MercadoLíder (Platinum/Gold/Silver/Bronze)
- Rating con estrellas (1-5)
- Porcentaje de calificaciones positivas
- Total de ventas
- Ubicación
- Botones: Ver tienda, Contactar
- Badge "Compra Protegida"

#### Envío
- Badge verde "Envío gratis"
- Cálculo automático de fecha estimada
- Ubicación con opción de cambiar
- Opciones de entrega expandibles
- Badge "Devolución gratis" (30 días)

#### Métodos de Pago
- Mercado Pago destacado (12 cuotas)
- Lista de métodos aceptados
- Íconos de tarjetas
- Badge "Pago seguro"

#### Contenido del Producto
- Características técnicas (tabla expandible)
- Descripción completa con formato
- Soporte para imágenes adicionales

#### Preguntas y Respuestas
- Formulario para hacer preguntas
- Lista de preguntas con respuestas
- Estados: respondida/pendiente
- Fechas relativas
- Límite de 500 caracteres

#### Productos Relacionados
- Carousel horizontal con Embla
- Cards de productos
- Navegación anterior/siguiente
- Badge de descuento y envío gratis

## 🚀 Inicio Rápido

```bash
# Clonar e instalar
cd meli-frontend
npm install

# Desarrollo
npm run dev

# Abrir navegador en:
# http://localhost:5173/producto/MLC123456789
```

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── atoms/              # Componentes básicos
│   │   ├── MLLogo.tsx
│   │   ├── PriceDisplay.tsx
│   │   ├── ShippingBadge.tsx
│   │   ├── SellerBadge.tsx
│   │   ├── RatingStars.tsx
│   │   └── PaymentIcon.tsx
│   ├── molecules/          # Componentes compuestos
│   │   ├── MLSearchBar.tsx
│   │   ├── ProductImage.tsx
│   │   ├── QuantitySelector.tsx
│   │   ├── SellerInfo.tsx
│   │   └── QuestionItem.tsx
│   ├── organisms/          # Componentes complejos
│   │   ├── MLHeader.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── PurchaseBox.tsx
│   │   ├── SellerCard.tsx
│   │   ├── ShippingInfo.tsx
│   │   ├── PaymentMethods.tsx
│   │   ├── ProductCharacteristics.tsx
│   │   ├── ProductDescription.tsx
│   │   ├── QuestionsSection.tsx
│   │   └── RelatedProducts.tsx
│   └── templates/          # Layouts de página
│       └── ProductDetailLayout.tsx
├── pages/
│   └── ProductDetailPage.tsx    # Página principal
└── styles/
    └── index.css               # Colores y utilities ML
```

## 🎨 Uso de Colores

Los colores de Mercado Libre están disponibles como clases Tailwind:

```tsx
// Fondo amarillo ML
<div className="bg-ml-yellow">

// Texto azul ML
<span className="text-ml-blue">

// Botón verde ML
<button className="bg-ml-green text-white">

// Clases utilitarias
<button className="btn-ml-primary">    {/* Botón azul ML */}
<button className="btn-ml-buy">        {/* Botón de compra */}
<div className="ml-container">         {/* Contenedor 1200px */}
<span className="ml-price">            {/* Formato de precio */}
```

## 🧩 Componentes Reutilizables

### PriceDisplay

```tsx
<PriceDisplay
  amount={1299990}
  originalPrice={1499990}
  discount={13}
  size="lg"
/>
```

### RatingStars

```tsx
<RatingStars
  rating={4.8}
  reviewCount={3241}
  size="md"
/>
```

### QuantitySelector

```tsx
<QuantitySelector
  quantity={quantity}
  onChange={setQuantity}
  availableStock={15}
/>
```

### SellerCard

```tsx
<SellerCard
  name="iShop Chile Oficial"
  level="platinum"
  location="Santiago"
  positiveRating={99}
  totalSales={45230}
  rating={4.8}
/>
```

## 🔌 Integración con API (Pendiente - Fase 12)

Para conectar con la API real de Mercado Libre:

### 1. Crear Servicio de API

```typescript
// src/services/mercadolibre.service.ts
export const getProduct = async (id: string) => {
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  return response.json();
};

export const searchProducts = async (query: string) => {
  const response = await fetch(
    `https://api.mercadolibre.com/sites/MLC/search?q=${query}`
  );
  return response.json();
};
```

### 2. Crear Hook Personalizado

```typescript
// src/hooks/useMLProduct.ts
export const useMLProduct = (productId: string) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProduct(productId)
      .then(setProduct)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [productId]);

  return { product, loading, error };
};
```

### 3. Usar en ProductDetailPage

```typescript
const ProductDetailPage = () => {
  const { productId } = useParams();
  const { product, loading, error } = useMLProduct(productId);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return <ProductDetailLayout>{/* ... */}</ProductDetailLayout>;
};
```

## 📱 Responsive Design

El layout se adapta automáticamente:

- **Desktop** (>1024px): Grid 2/3 + 1/3 (galería + sidebar)
- **Tablet** (768-1023px): Grid 60% + 40%
- **Mobile** (<768px): Stack vertical

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén implementados)
npm run test

# Linting
npm run lint

# Formateo
npm run format
```

## 📝 Datos Mock

Actualmente la aplicación usa datos mock en `ProductDetailPage.tsx`. Incluye:

- Información del producto (título, precio, stock, imágenes)
- Datos del vendedor (nombre, reputación, ventas)
- Características técnicas (12 items)
- Descripción del producto
- Preguntas y respuestas (3 ejemplos)
- Productos relacionados (4 items)

## 🎯 Roadmap

### Fase 12: Integración con API Real ⏳
- [ ] Servicio de API de Mercado Libre
- [ ] Tipos TypeScript para respuestas
- [ ] Adaptador de datos
- [ ] Hook personalizado `useMLProduct`
- [ ] Estados de carga y error
- [ ] Búsqueda funcional

### Mejoras Futuras 🚀
- [ ] Skeleton loaders
- [ ] Optimización de imágenes (lazy loading)
- [ ] Caché de productos
- [ ] SEO optimization
- [ ] Analytics
- [ ] A/B testing
- [ ] Internacionalización (i18n)

## 🤝 Contribuir

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

## 📄 Licencia

MIT License - ver archivo `LICENSE` para detalles

## 🙏 Agradecimientos

- Diseño inspirado en [Mercado Libre Chile](https://mercadolibre.cl)
- [Shadcn/ui](https://ui.shadcn.com) por componentes base
- [Tailwind CSS](https://tailwindcss.com) por utilidades de estilo
- [Embla Carousel](https://www.embla-carousel.com) por el carousel

---

**Desarrollado con ❤️ usando React 19, TypeScript y Tailwind CSS**
