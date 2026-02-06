import { useState, useEffect } from 'react';
import type { ProductDetail } from '../types/product';
import { getProductService } from '../services/ProductServiceFactory';

/**
 * Estado del hook useProduct
 */
export interface UseProductState {
  product: ProductDetail | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook personalizado para obtener el detalle de un producto
 * Maneja loading, error y datos automáticamente
 *
 * @param productId - ID del producto a obtener
 * @returns Estado del producto con loading, error y función refetch
 *
 * @example
 * ```tsx
 * function ProductPage() {
 *   const { product, loading, error, refetch } = useProduct('MLC123456789');
 *
 *   if (loading) return <div>Cargando...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   if (!product) return null;
 *
 *   return <div>{product.title}</div>;
 * }
 * ```
 */
export function useProduct(productId: string | undefined): UseProductState {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!productId) {
      setLoading(false);
      setError('ID de producto no proporcionado');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const productService = getProductService();
      const data = await productService.getProductById(productId);

      setProduct(data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setProduct(null);
      console.error('Error al obtener producto:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
}

/**
 * Hook para buscar productos
 * @param query - Término de búsqueda
 * @returns Estado de la búsqueda con productos, loading y error
 */
export interface UseProductSearchState {
  products: ProductDetail[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
}

export function useProductSearch(): UseProductSearchState {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const productService = getProductService();

      if (productService.searchProducts) {
        const data = await productService.searchProducts(query);
        setProducts(data);
      } else {
        setError('Búsqueda no soportada en este servicio');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setProducts([]);
      console.error('Error en búsqueda:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    search,
  };
}
