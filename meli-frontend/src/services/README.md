# Arquitectura de Servicios - Product Service

Esta carpeta contiene la arquitectura intercambiable para consultar productos. Permite cambiar fácilmente entre datos mock y una API real sin modificar el código de los componentes.

## 📁 Estructura

```
services/
├── IProductService.ts                    # Interfaz del servicio
├── ProductServiceFactory.ts              # Factory para crear instancias
├── implementations/
│   ├── MockProductService.ts            # Implementación con datos mock
│   └── ApiProductService.ts             # Implementación con API real
└── README.md                            # Este archivo
```

## 🔧 Configuración

### Usando Mock (Datos estáticos)

En tu archivo `.env`:

```env
VITE_PRODUCT_SERVICE=mock
```

El servicio usará los datos del archivo `src/data/mockProduct.json`.

### Usando API Real

En tu archivo `.env`:

```env
VITE_PRODUCT_SERVICE=api
VITE_API_URL=http://localhost:3000/api
```

El servicio se conectará al backend en la URL especificada.

## 💻 Uso en Componentes

### Opción 1: Usando el Hook `useProduct` (Recomendado)

```tsx
import { useProduct } from '@/hooks/useProduct';

function ProductDetailPage() {
  const { product, loading, error, refetch } = useProduct('MLC123456789');

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return null;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>${product.price}</p>
      <button onClick={refetch}>Recargar</button>
    </div>
  );
}
```

### Opción 2: Usando el Servicio Directamente

```tsx
import { getProductService } from '@/services/ProductServiceFactory';
import { useEffect, useState } from 'react';

function ProductDetailPage() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const service = getProductService();
      const data = await service.getProductById('MLC123456789');
      setProduct(data);
    };
    loadProduct();
  }, []);

  // ...
}
```

## 🔄 Cambiar entre Mock y API

### Durante Desarrollo

Simplemente cambia la variable de entorno en `.env`:

```env
# Desarrollo con mock
VITE_PRODUCT_SERVICE=mock

# Desarrollo con API local
VITE_PRODUCT_SERVICE=api
VITE_API_URL=http://localhost:3000/api
```

### En Producción

Configura las variables de entorno en tu plataforma de deployment:

```env
VITE_PRODUCT_SERVICE=api
VITE_API_URL=https://api.mibackend.com
```

## 🛠️ Crear una Nueva Implementación

Si necesitas agregar una nueva implementación (ej: GraphQL, Firebase, etc.):

1. **Crear la clase de implementación** en `implementations/`:

```typescript
// implementations/GraphQLProductService.ts
import type { IProductService } from '../IProductService';
import type { ProductDetail } from '../../types/product';

export class GraphQLProductService implements IProductService {
  async getProductById(productId: string): Promise<ProductDetail> {
    // Tu implementación GraphQL aquí
  }
}
```

2. **Actualizar el Factory**:

```typescript
// En ProductServiceFactory.ts
import { GraphQLProductService } from './implementations/GraphQLProductService';

// Agregar nuevo tipo
export type ServiceType = 'mock' | 'api' | 'graphql';

// Agregar case en createService
case 'graphql':
  return new GraphQLProductService();
```

3. **Actualizar `.env.example`**:

```env
VITE_PRODUCT_SERVICE=graphql
VITE_GRAPHQL_URL=https://api.mibackend.com/graphql
```

## 📝 Contrato del Backend (Schema esperado)

El backend debe devolver un JSON con el siguiente schema:

```json
{
  "id": "string",
  "title": "string",
  "price": "number",
  "originalPrice": "number | undefined",
  "discount": "number | undefined",
  "condition": "'new' | 'used' | 'refurbished'",
  "soldCount": "number",
  "availableStock": "number",
  "productRating": "number",
  "reviewCount": "number",
  "categoryPath": [
    {
      "label": "string",
      "href": "string"
    }
  ],
  "images": ["string[]"],
  "seller": { "..." },
  "shipping": { "..." },
  "characteristics": [ "..." ],
  "description": "string",
  "descriptionImages": ["string[]"],
  "questions": [ "..." ],
  "relatedProducts": [ "..." ],
  "variants": { "..." },
  "highlights": ["string[]"],
  "paymentMethods": [ "..." ],
  "maxInstallments": "number",
  "availableRatingCategories": [ "..." ],
  "reviews": [ "..." ],
  "averageRating": "number",
  "totalReviews": "number",
  "ratingDistribution": { "..." },
  "averageCategoryRatings": { "..." }
}
```

Ver el archivo `src/data/mockProduct.json` para un ejemplo completo.

Ver el tipo `ProductDetail` en `src/types/product.ts` para la definición TypeScript completa.

## 🧪 Testing

Para testing, puedes forzar el uso de mock:

```typescript
import { ProductServiceFactory } from '@/services/ProductServiceFactory';

beforeEach(() => {
  ProductServiceFactory.reset();
  ProductServiceFactory.getInstance({ type: 'mock' });
});
```

## ✅ Ventajas de esta Arquitectura

- ✨ **Intercambiable**: Cambia entre mock y API sin tocar código
- 🔒 **Type-safe**: TypeScript garantiza el contrato
- 🧪 **Testeable**: Fácil de mockear en tests
- 📦 **Modular**: Cada implementación es independiente
- 🚀 **Escalable**: Fácil agregar nuevas implementaciones
- 🎯 **Single Responsibility**: Cada clase tiene una sola responsabilidad
