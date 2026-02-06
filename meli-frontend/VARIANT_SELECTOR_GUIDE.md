# 🎨 Guía del Selector de Variantes

## Descripción

El **Selector de Variantes** es un componente que permite a los usuarios seleccionar diferentes opciones de un producto (color, tamaño, capacidad, etc.) al estilo de Mercado Libre.

---

## 📦 Componentes Creados

### 1. **VariantButton** (Atom)
Botón individual para cada variante.

**Ubicación:** `src/components/atoms/VariantButton.tsx`

**Características:**
- Muestra el nombre de la variante
- Opción de mostrar imagen (para colores)
- Indicador visual de selección (check azul)
- Estado deshabilitado para variantes no disponibles
- Efecto de línea tachada cuando no está disponible

### 2. **VariantSelector** (Molecule)
Selector completo con título y grupo de botones.

**Ubicación:** `src/components/molecules/VariantSelector.tsx`

**Características:**
- Título con variante seleccionada
- Grid de botones de variantes
- Mensaje cuando hay variantes no disponibles

### 3. **PurchaseBox actualizado** (Organism)
Integra los selectores de variantes en la caja de compra.

**Ubicación:** `src/components/organisms/PurchaseBox.tsx`

---

## 🎯 Uso Básico

### Definir Variantes

```typescript
import { type ProductVariants } from '../components/organisms/PurchaseBox';

const productVariants: ProductVariants = {
  colors: {
    title: 'Color',
    options: [
      {
        id: 'negro',
        label: 'Negro',
        value: 'Negro',
        image: 'url-imagen-negro.jpg',
        available: true,
      },
      {
        id: 'blanco',
        label: 'Blanco',
        value: 'Blanco',
        image: 'url-imagen-blanco.jpg',
        available: true,
      },
      {
        id: 'rojo',
        label: 'Rojo',
        value: 'Rojo',
        image: 'url-imagen-rojo.jpg',
        available: false, // No disponible
      },
    ],
    selectedId: 'negro',
  },
  sizes: {
    title: 'Capacidad',
    options: [
      {
        id: '128gb',
        label: '128 GB',
        value: '128 GB',
        available: true,
      },
      {
        id: '256gb',
        label: '256 GB',
        value: '256 GB',
        available: true,
      },
      {
        id: '512gb',
        label: '512 GB',
        value: '512 GB',
        available: false,
      },
    ],
    selectedId: '256gb',
  },
};
```

### Usar en PurchaseBox

```typescript
const [selectedColor, setSelectedColor] = useState('negro');
const [selectedSize, setSelectedSize] = useState('256gb');

const handleVariantChange = (type: 'color' | 'size', variantId: string) => {
  if (type === 'color') {
    setSelectedColor(variantId);
  } else {
    setSelectedSize(variantId);
  }
};

const currentVariants: ProductVariants = {
  colors: {
    title: 'Color',
    options: colorOptions,
    selectedId: selectedColor,
  },
  sizes: {
    title: 'Capacidad',
    options: sizeOptions,
    selectedId: selectedSize,
  },
};

return (
  <PurchaseBox
    price={price}
    variants={currentVariants}
    onVariantChange={handleVariantChange}
    // ... otras props
  />
);
```

---

## 🎨 Ejemplo Visual

### Con Imágenes (Colores)

```
┌─────────────────────────────────────────┐
│ Color: Negro                            │
│                                         │
│ ┌────────┐  ┌────────┐  ┌────────┐    │
│ │ [IMG]  │  │ [IMG]  │  │ [IMG]  │    │
│ │ Negro ✓│  │ Blanco │  │ Rojo   │    │
│ └────────┘  └────────┘  └────────┘    │
│   Azul                                  │
└─────────────────────────────────────────┘
```

### Sin Imágenes (Capacidad/Tamaño)

```
┌─────────────────────────────────────────┐
│ Capacidad: 256 GB                       │
│                                         │
│ ┌────────┐  ┌────────┐  ┌────────┐    │
│ │128 GB  │  │256 GB✓ │  │512 GB  │    │
│ └────────┘  └────────┘  └────────┘    │
└─────────────────────────────────────────┘
```

---

## 📐 Interfaz de Tipos

### Variant

```typescript
interface Variant {
  id: string;           // Identificador único
  label: string;        // Texto mostrado
  value: string;        // Valor de la variante
  image?: string;       // URL de imagen (opcional)
  available?: boolean;  // Disponibilidad (default: true)
}
```

### ProductVariants

```typescript
interface ProductVariants {
  colors?: {
    title: string;
    options: Variant[];
    selectedId: string;
  };
  sizes?: {
    title: string;
    options: Variant[];
    selectedId: string;
  };
}
```

---

## 🎨 Estilos y Estados

### Estados Visuales

1. **Normal (No seleccionado, disponible)**
   - Borde gris claro
   - Texto gris oscuro
   - Hover: borde gris medio

2. **Seleccionado (Disponible)**
   - Borde azul ML (#3483FA)
   - Fondo azul claro ML
   - Texto azul ML
   - Check azul en esquina superior derecha

3. **No disponible**
   - Borde gris claro
   - Texto gris medio
   - Opacidad 50%
   - Texto tachado
   - Cursor no permitido

---

## 🔧 Personalización

### Cambiar Título

```typescript
const variants = {
  colors: {
    title: 'Elige tu color favorito', // Título personalizado
    options: colorOptions,
    selectedId: 'negro',
  },
};
```

### Solo Colores (Sin Tamaño)

```typescript
const variants = {
  colors: {
    title: 'Color',
    options: colorOptions,
    selectedId: 'negro',
  },
  // No incluir sizes
};
```

### Solo Tamaño (Sin Colores)

```typescript
const variants = {
  // No incluir colors
  sizes: {
    title: 'Talla',
    options: sizeOptions,
    selectedId: 'M',
  },
};
```

---

## 💡 Casos de Uso Comunes

### Escritorio con Dimensiones

```typescript
{
  sizes: {
    title: 'Dimensiones',
    options: [
      { id: '100x75', label: '100 cm x 75 cm x 100 cm', value: '100x75', available: true },
      { id: '120x75', label: '120 cm x 75 cm x 140 cm', value: '120x75', available: true },
    ],
    selectedId: '120x75',
  }
}
```

### Ropa con Color y Talla

```typescript
{
  colors: {
    title: 'Color',
    options: [
      { id: 'rojo', label: 'Rojo', value: 'Rojo', image: 'rojo.jpg', available: true },
      { id: 'azul', label: 'Azul', value: 'Azul', image: 'azul.jpg', available: true },
    ],
    selectedId: 'rojo',
  },
  sizes: {
    title: 'Talla',
    options: [
      { id: 'S', label: 'S', value: 'S', available: false },
      { id: 'M', label: 'M', value: 'M', available: true },
      { id: 'L', label: 'L', value: 'L', available: true },
      { id: 'XL', label: 'XL', value: 'XL', available: true },
    ],
    selectedId: 'M',
  },
}
```

### Electrónica con Capacidad y Color

```typescript
{
  colors: {
    title: 'Color',
    options: [
      { id: 'space-gray', label: 'Gris Espacial', value: 'Gris Espacial', image: 'gray.jpg', available: true },
      { id: 'silver', label: 'Plateado', value: 'Plateado', image: 'silver.jpg', available: true },
    ],
    selectedId: 'space-gray',
  },
  sizes: {
    title: 'Almacenamiento',
    options: [
      { id: '64gb', label: '64 GB', value: '64 GB', available: false },
      { id: '128gb', label: '128 GB', value: '128 GB', available: true },
      { id: '256gb', label: '256 GB', value: '256 GB', available: true },
    ],
    selectedId: '128gb',
  },
}
```

---

## 🐛 Solución de Problemas

### El check no aparece
- Verificar que `isSelected={true}` esté configurado correctamente
- Verificar que `available !== false`

### Imagen no se muestra
- Verificar que `showImages={true}` esté en VariantSelector
- Verificar que la URL de la imagen sea válida

### Botón no responde al click
- Verificar que `available !== false`
- Verificar que `onClick` esté definido

---

## 📊 Datos Mock de Ejemplo

Consulta `src/pages/ProductDetailPage.tsx` líneas 136-200 para ver un ejemplo completo de datos mock con variantes.

---

## 🎯 Próximas Mejoras Posibles

- [ ] Tooltips con información adicional
- [ ] Animaciones de transición al seleccionar
- [ ] Validación de combinaciones (ej: rojo + XL no disponible)
- [ ] Precio variable según variante seleccionada
- [ ] Zoom de imagen al hover en variantes con imagen
- [ ] Sincronización con URL (query params)

---

**Creado:** 4 de Febrero de 2026
**Versión:** 1.0
**Componentes:** VariantButton, VariantSelector, PurchaseBox
