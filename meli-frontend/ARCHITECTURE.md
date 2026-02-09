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
