import type { IProductService } from '../IProductService';
import type { ProductDetail } from '../../types/product';

/**
 * Implementación real del servicio de productos
 * Conecta con el backend para obtener datos reales
 */
export class ApiProductService implements IProductService {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    // URL base del API - puede venir de variable de entorno
    console.log("por aqui activando el servicio API");
    this.baseUrl = baseUrl || import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  }

  /**
   * Obtiene el detalle del producto desde el backend
   */
  async getProductById(productId: string): Promise<ProductDetail> {
    try {
      const response = await fetch(`${this.baseUrl}/products/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Producto ${productId} no encontrado`);
        }
        throw new Error(`Error al obtener producto: ${response.statusText}`);
      }

      const data = await response.json();
      return this.mapApiResponseToProductDetail(data);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error desconocido al obtener el producto');
    }
  }

  /**
   * Resuelve el product ID específico basado en variantes
   */
  async resolveVariantProductId(
    baseProductId: string,
    variantSlugs: Record<string, string>
  ): Promise<string> {
    try {
      // Construir query string: color:azul,capacidad:256gb
      const variantsParam = Object.entries(variantSlugs)
        .map(([key, value]) => `${key}:${value}`)
        .join(',');

      const response = await fetch(
        `${this.baseUrl}/products/${baseProductId}/resolve-variant?variants=${variantsParam}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error al resolver variante: ${response.statusText}`);
      }

      const data = await response.json();
      return data.productVariantId;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error desconocido al resolver variante');
    }
  }

  /**
   * Busca productos por término
   */
  async searchProducts(query: string): Promise<ProductDetail[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/products/search?q=${encodeURIComponent(query)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error en búsqueda: ${response.statusText}`);
      }

      const data = await response.json();
      return data.map((item: any) => this.mapApiResponseToProductDetail(item));
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error desconocido en la búsqueda');
    }
  }

  /**
   * Mapea la respuesta del API al tipo ProductDetail
   * El backend envía datos en camelCase gracias al serializer
   */
  private mapApiResponseToProductDetail(data: any): ProductDetail {
    return {
      // Básicos del producto (agrupados en basics)
      basics: data.basics,

      // Media (imágenes agrupadas)
      media: data.media,

      // Métricas
      averageRating: data.averageRating,
      reviewCount: data.reviewCount,

      // Navegación
      categoryPath: data.categoryPath,

      // Vendedor y envío
      seller: data.seller,
      shipping: data.shipping,

      // Características y destacados
      characteristics: data.characteristics,
      highlights: data.highlights,

      // Interacción y variantes
      questions: data.questions?.map((q: any) => ({
        ...q,
        askedAt: new Date(q.askedAt),
        answeredAt: new Date(q.answeredAt),
      })) || [],
      relatedProducts: data.relatedProducts,
      variants: data.variants,

      // Pagos
      paymentMethods: data.paymentMethods,
      maxInstallments: data.maxInstallments,

      // Reviews y estadísticas
      availableRatingCategories: data.availableRatingCategories,
      reviews: data.reviews,
      totalReviews: data.totalReviews,
      ratingDistribution: data.ratingDistribution,
      averageCategoryRatings: data.averageCategoryRatings,
    } as ProductDetail;
  }
}
