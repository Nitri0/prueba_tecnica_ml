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
   * Útil si el backend devuelve un schema ligeramente diferente
   */
  private mapApiResponseToProductDetail(data: any): ProductDetail {
    // Si el backend devuelve exactamente el mismo schema, simplemente retornar
    // Si necesita transformación, hacerlo aquí

    return {
      ...data,
      // Asegurar que las fechas sean Date objects
      questions: data.questions?.map((q: any) => ({
        ...q,
        askedAt: new Date(q.askedAt),
        answeredAt: new Date(q.answeredAt),
      })) || [],
    } as ProductDetail;
  }
}
