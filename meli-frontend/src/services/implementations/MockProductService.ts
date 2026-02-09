import type { IProductService } from '../IProductService';
import type { ProductDetail } from '../../types/product';
import mockProductData from '../../data/mockProduct.json';
import { getVariantIdFromMapping } from '../../utils/variantIdMapping';

/**
 * Implementación mock del servicio de productos
 * Utiliza datos estáticos del archivo JSON
 */
export class MockProductService implements IProductService {
  private mockData: ProductDetail;

  constructor() {
    console.log("por aqui activando el servicio MOCK");
    // Convertir fechas de string a Date en questions
    this.mockData = {
      ...mockProductData,
      questions: mockProductData.questions.map(q => ({
        ...q,
        askedAt: new Date(q.askedAt),
        answeredAt: new Date(q.answeredAt),
      })),
    } as ProductDetail;
  }

  /**
   * Obtiene el detalle del producto
   * Simula una llamada asíncrona con delay
   */
  async getProductById(productId: string): Promise<ProductDetail> {
    // Simular delay de red
    await this.simulateNetworkDelay();

    // Por ahora siempre devuelve el mismo producto mock
    // En el futuro se podría tener múltiples productos mock
    if (productId === this.mockData.basics.id || productId === 'mock') {
      return this.mockData;
    }

    // Si el ID no coincide, igual devolvemos el mock
    // (útil para desarrollo)
    console.warn(`Producto ${productId} no encontrado en mock, devolviendo producto por defecto`);
    return this.mockData;
  }

  /**
   * Simula delay de red (100-300ms)
   */
  private async simulateNetworkDelay(): Promise<void> {
    const delay = Math.random() * 200 + 100; // 100-300ms
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Resuelve el product ID específico basado en variantes (mock)
   */
  async resolveVariantProductId(
    baseProductId: string,
    variantSlugs: Record<string, string>
  ): Promise<string> {
    await this.simulateNetworkDelay();

    // Intentar obtener del mapping local
    const mappedId = getVariantIdFromMapping(variantSlugs);
    if (mappedId) {
      return mappedId;
    }

    // Fallback: retornar base ID
    console.warn(`No se encontró mapping para variantes ${JSON.stringify(variantSlugs)}`);
    return baseProductId;
  }

  /**
   * Búsqueda de productos (no implementado en mock)
   */
  async searchProducts(query: string): Promise<ProductDetail[]> {
    await this.simulateNetworkDelay();
    console.log('Búsqueda mock:', query);

    // Devolver array con el único producto mock
    return [this.mockData];
  }
}
