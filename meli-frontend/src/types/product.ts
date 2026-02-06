export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: {
    rate: number;
    count: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export type SortOrder = 'asc' | 'desc';

export interface ProductSort {
  field: keyof Product;
  order: SortOrder;
}

// Tipos para características de producto (Mercado Libre)

// Característica con rango visual (ej: tamaño de pantalla)
export interface RangeCharacteristic {
  type: 'range';
  name: string;
  value: string | number;
  current: number;      // Posición en la barra (0-100)
  min: number;          // Valor mínimo
  max: number;          // Valor máximo
  minLabel: string;     // "PEQUEÑO"
  maxLabel: string;     // "GRANDE"
  icon?: string;        // Nombre del ícono (lucide-react)
  segments?: number;    // Número de secciones en la barra (default: 5)
}

// Característica destacada con ícono
export interface HighlightCharacteristic {
  type: 'highlight';
  name: string;
  value: string;
  icon: string;         // Nombre del ícono (lucide-react)
}

// Grupo de características por categoría
export interface CategoryGroup {
  type: 'category';
  categoryName: string;
  characteristics: Array<{
    name: string;
    value: string;
  }>;
}

// Unión de todos los tipos de características
export type ProductCharacteristic =
  | RangeCharacteristic
  | HighlightCharacteristic
  | CategoryGroup;

// Tipos para variantes de producto (Mercado Libre)
export interface Variant {
  id: string;
  label: string;
  value: string;
  image?: string;
  slug: string;  // Slug para construir URL multi-variante (ej: "titanio-azul", "256gb")
  available?: boolean;
}

// Grupo de variantes (color, talla, material, etc.)
export interface VariantGroup {
  title: string;
  options: Variant[];
  selectedId: string;
  showImages?: boolean;  // Controla si muestra imágenes (default: false)
  order?: number;        // Controla el orden de renderizado
}

// Variantes dinámicas - puede tener cualquier key (color, size, material, sabor, etc.)
export type ProductVariants = Record<string, VariantGroup>;

// Tipos para ratings de opiniones (Mercado Libre)

/**
 * Categoría de rating para opiniones de productos
 * Permite que cada producto defina sus propias categorías de evaluación
 */
export interface RatingCategory {
  /** Identificador único de la categoría (ej: "camera_quality") */
  id: string;

  /** Nombre legible para mostrar al usuario (ej: "Calidad de la cámara") */
  name: string;

  /** Orden de visualización (opcional, menor número = mayor prioridad) */
  order?: number;
}

/**
 * Ratings por categoría en formato clave-valor genérico
 * Permite cualquier categoría definida en availableRatingCategories
 *
 * @example
 * {
 *   "camera_quality": 5,
 *   "battery_life": 4.5,
 *   "durability": 4
 * }
 */
export type CategoryRatings = {
  [categoryId: string]: number;
};

// Tipos adicionales para ProductDetail (Mercado Libre)

export interface CategoryPathItem {
  label: string;
  href: string;
}

export interface Seller {
  name: string;
  logo: string;
  isOfficialStore: boolean;
  followers: number;
  totalProducts: number;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  location: string;
  positiveRating: number;
  totalSales: number;
  rating: number;
  reviewCount: number;
  reputation: {
    red: number;
    orange: number;
    yellow: number;
    green: number;
  };
  reputationMessage: string;
  goodAttention: boolean;
  onTimeDelivery: boolean;
}

export interface Shipping {
  isFree: boolean;
  estimatedDays: {
    min: number;
    max: number;
  };
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  askedAt: string | Date;
  answeredAt: string | Date;
  status: 'answered' | 'pending';
}

export interface RelatedProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
  installments: number;
  installmentAmount: number;
  isFreeShipping: boolean;
  isFirstPurchaseFreeShipping: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  imageUrl: string;
  type: 'credit' | 'debit' | 'cash';
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
  verified: boolean;
  images?: string[];
  categoryRatings?: CategoryRatings;
}

export interface RatingDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

/**
 * Tipo completo para el detalle de producto (Mercado Libre)
 * Incluye toda la información necesaria para la página de detalle
 */
export interface ProductDetail {
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
  categoryPath: CategoryPathItem[];
  images: string[];
  seller: Seller;
  shipping: Shipping;
  characteristics: ProductCharacteristic[];
  description: string;
  descriptionImages: string[];
  questions: Question[];
  relatedProducts: RelatedProduct[];
  variants: ProductVariants;
  highlights: string[];
  paymentMethods: PaymentMethod[];
  maxInstallments: number;
  availableRatingCategories: RatingCategory[];
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingDistribution: RatingDistribution;
  averageCategoryRatings: CategoryRatings;
}
