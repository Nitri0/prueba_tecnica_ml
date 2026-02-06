# 🏗️ Arquitectura del Servicio de Productos

## 📋 Resumen

Se ha implementado una **arquitectura de servicios intercambiable** que permite cambiar entre datos mock y una API real sin modificar el código de los componentes. Esta arquitectura sigue los principios de:

- **Dependency Inversion Principle (DIP)**: Los componentes dependen de abstracciones, no de implementaciones concretas
- **Strategy Pattern**: Diferentes estrategias para obtener datos (mock vs API)
- **Factory Pattern**: Creación centralizada de servicios
- **Single Responsibility**: Cada clase tiene una única responsabilidad

## 📁 Archivos Creados

### 1. Tipos y Datos

| Archivo | Descripción |
|---------|-------------|
| `src/types/product.ts` | ✅ Actualizado con tipos completos para `ProductDetail` |
| `src/data/mockProduct.json` | 📄 Datos mock en formato JSON |

### 2. Servicios

| Archivo | Descripción |
|---------|-------------|
| `src/services/IProductService.ts` | 🔌 Interfaz del servicio (contrato) |
| `src/services/implementations/MockProductService.ts` | 🎭 Implementación con datos mock |
| `src/services/implementations/ApiProductService.ts` | 🌐 Implementación para API real |
| `src/services/ProductServiceFactory.ts` | 🏭 Factory para crear instancias |
| `src/services/README.md` | 📚 Documentación completa |

### 3. Hooks

| Archivo | Descripción |
|---------|-------------|
| `src/hooks/useProduct.ts` | 🪝 Hook para usar en componentes React |

### 4. Páginas de Ejemplo

| Archivo | Descripción |
|---------|-------------|
| `src/pages/ProductDetailPageWithService.tsx` | 📄 Ejemplo usando el servicio |

### 5. Configuración

| Archivo | Descripción |
|---------|-------------|
| `.env` | ⚙️ Variables de entorno (creado) |
| `.env.example` | 📋 Ejemplo de configuración (actualizado) |
| `ARCHITECTURE.md` | 📖 Este documento |

## 🚀 Cómo Usar

### Paso 1: Configurar Variables de Entorno

En tu archivo `.env`:

```env
# Para usar datos mock (desarrollo)
VITE_PRODUCT_SERVICE=mock

# Para usar API real (producción)
VITE_PRODUCT_SERVICE=api
VITE_API_URL=https://api.tubackend.com
```

### Paso 2: Usar en Componentes

#### Opción A: Hook `useProduct` (Recomendado)

```tsx
import { useProduct } from '@/hooks/useProduct';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const { productId } = useParams();
  const { product, loading, error, refetch } = useProduct(productId);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;
  if (!product) return <NotFound />;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>${product.price}</p>
      {/* ... resto del componente */}
    </div>
  );
}
```

#### Opción B: Servicio Directo

```tsx
import { getProductService } from '@/services/ProductServiceFactory';

async function loadProduct(id: string) {
  const service = getProductService();
  const product = await service.getProductById(id);
  return product;
}
```

### Paso 3: Actualizar Routing (Opcional)

Si quieres usar la nueva página con servicio, actualiza tu router:

```tsx
// src/App.tsx
import ProductDetailPageWithService from './pages/ProductDetailPageWithService';

<Route path="/producto/:productId" element={<ProductDetailPageWithService />} />
```

## 🔄 Cambiar entre Mock y API

### Durante Desarrollo Local

1. **Usar Mock** (datos estáticos para desarrollo sin backend):
   ```env
   VITE_PRODUCT_SERVICE=mock
   ```

2. **Usar API Local** (conectar con backend local):
   ```env
   VITE_PRODUCT_SERVICE=api
   VITE_API_URL=http://localhost:3000/api
   ```

3. **Reiniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

### En Producción

Configura las variables en tu plataforma (Vercel, Netlify, etc.):

```env
VITE_PRODUCT_SERVICE=api
VITE_API_URL=https://api.produccion.com
```

## 📝 Contrato del Backend

Tu backend debe devolver un JSON con este schema en el endpoint `GET /products/:id`:

```typescript
{
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  condition: 'new' | 'used' | 'refurbished';
  soldCount: number;
  availableStock: number;
  productRating: number;
  reviewCount: number;
  categoryPath: Array<{ label: string; href: string }>;
  images: string[];
  seller: { /* ver tipo Seller */ };
  shipping: { /* ver tipo Shipping */ };
  characteristics: Array</* ver tipo ProductCharacteristic */>;
  description: string;
  descriptionImages: string[];
  questions: Array</* ver tipo Question */>;
  relatedProducts: Array</* ver tipo RelatedProduct */>;
  variants: { /* ver tipo ProductVariants */ };
  highlights: string[];
  paymentMethods: Array</* ver tipo PaymentMethod */>;
  maxInstallments: number;
  availableRatingCategories: Array</* ver tipo RatingCategory */>;
  reviews: Array</* ver tipo Review */>;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { 5: number; 4: number; 3: number; 2: number; 1: number };
  averageCategoryRatings: { [categoryId: string]: number };
}
```

**Referencia completa**: Ver `src/data/mockProduct.json` para ejemplo completo.

**Tipos TypeScript**: Ver `src/types/product.ts` para definiciones completas.

## 🎯 Ventajas de esta Arquitectura

| Ventaja | Descripción |
|---------|-------------|
| ✅ **Intercambiable** | Cambia entre mock y API en segundos |
| 🔒 **Type-safe** | TypeScript garantiza el contrato |
| 🧪 **Testeable** | Fácil mockear en tests unitarios |
| 📦 **Modular** | Cada implementación es independiente |
| 🚀 **Escalable** | Fácil agregar GraphQL, Firebase, etc. |
| 🎨 **Clean Code** | Sigue principios SOLID |
| 🔧 **Mantenible** | Cambios centralizados en servicios |
| 📱 **Agnóstico** | No depende del framework de UI |

## 🛠️ Agregar Nueva Implementación

Para agregar soporte a GraphQL, Firebase, u otro:

1. **Crear implementación**:
   ```typescript
   // src/services/implementations/GraphQLProductService.ts
   import type { IProductService } from '../IProductService';

   export class GraphQLProductService implements IProductService {
     async getProductById(id: string) {
       // Tu lógica GraphQL
     }
   }
   ```

2. **Actualizar Factory**:
   ```typescript
   // src/services/ProductServiceFactory.ts
   export type ServiceType = 'mock' | 'api' | 'graphql';

   case 'graphql':
     return new GraphQLProductService();
   ```

3. **Configurar**:
   ```env
   VITE_PRODUCT_SERVICE=graphql
   VITE_GRAPHQL_URL=https://api.graphql.com
   ```

## 🧪 Testing

### Mock en Tests

```typescript
import { ProductServiceFactory } from '@/services/ProductServiceFactory';

beforeEach(() => {
  ProductServiceFactory.reset();
  ProductServiceFactory.getInstance({ type: 'mock' });
});
```

### Test del Hook

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useProduct } from '@/hooks/useProduct';

test('debe cargar producto', async () => {
  const { result } = renderHook(() => useProduct('MLC123456789'));

  expect(result.current.loading).toBe(true);

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
    expect(result.current.product).toBeTruthy();
  });
});
```

## 📊 Diagrama de Arquitectura

```
┌─────────────────────────────────────────┐
│          React Components                │
│   (ProductDetailPage, etc.)              │
└──────────────┬──────────────────────────┘
               │
               │ usa
               ▼
┌─────────────────────────────────────────┐
│         useProduct Hook                  │
│   (maneja loading, error, data)          │
└──────────────┬──────────────────────────┘
               │
               │ llama
               ▼
┌─────────────────────────────────────────┐
│     ProductServiceFactory                │
│   (crea instancia según config)          │
└──────────────┬──────────────────────────┘
               │
               │ devuelve
               ▼
┌─────────────────────────────────────────┐
│       IProductService                    │
│         (interfaz)                       │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
┌─────────────┐  ┌─────────────┐
│MockProduct  │  │ApiProduct   │
│Service      │  │Service      │
└─────┬───────┘  └──────┬──────┘
      │                 │
      ▼                 ▼
┌──────────┐    ┌───────────┐
│mockData  │    │  Backend  │
│   .json  │    │    API    │
└──────────┘    └───────────┘
```

## 📚 Recursos

- **Documentación completa**: `src/services/README.md`
- **Ejemplo de uso**: `src/pages/ProductDetailPageWithService.tsx`
- **Tipos TypeScript**: `src/types/product.ts`
- **Datos de ejemplo**: `src/data/mockProduct.json`

## ✅ Checklist de Migración

- [ ] Configurar `.env` con `VITE_PRODUCT_SERVICE=mock`
- [ ] Verificar que los tipos en `product.ts` coinciden con tu backend
- [ ] Actualizar componentes para usar `useProduct` hook
- [ ] Actualizar routing si es necesario
- [ ] Ejecutar tests: `npm test`
- [ ] Verificar que funciona con mock: `npm run dev`
- [ ] Configurar backend real
- [ ] Cambiar a `VITE_PRODUCT_SERVICE=api`
- [ ] Probar con API real
- [ ] Deploy a producción

---

**Última actualización**: 6 Feb 2026
**Versión**: 1.0.0
**Autor**: Arquitectura de Servicios Intercambiable
