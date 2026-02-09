import type { ProductDetail } from '../types/product';

/**
 * Interfaz para el servicio de productos
 * Permite implementaciones intercambiables (mock, API real, etc.)
 */
export interface IProductService {
  /**
   * Obtiene el detalle completo de un producto por su ID
   * @param productId - ID del producto
   * @returns Promise con el detalle del producto
   * @throws Error si el producto no existe o hay un error de conexión
   */
  getProductById(productId: string): Promise<ProductDetail>;

  /**
   * Resuelve el product ID específico basado en variantes seleccionadas
   * @param baseProductId - ID del producto base
   * @param variantSlugs - Diccionario con variantes seleccionadas
   * @returns Promise con el product ID de la variante
   */
  resolveVariantProductId(
    baseProductId: string,
    variantSlugs: Record<string, string>
  ): Promise<string>;

  /**
   * Busca productos por término de búsqueda (opcional para futuras implementaciones)
   * @param query - Término de búsqueda
   * @returns Promise con array de productos
   */
  searchProducts?(query: string): Promise<ProductDetail[]>;
}
