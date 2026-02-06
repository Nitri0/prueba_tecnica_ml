import { api } from './api';
import { type Product } from '@/types/product';

export const productsService = {
  getAll: async (): Promise<Product[]> => {
    return api.get<Product[]>('/products');
  },

  getById: async (id: string): Promise<Product> => {
    return api.get<Product>(`/products/${id}`);
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    return api.get<Product[]>(`/products/category/${category}`);
  },

  getCategories: async (): Promise<string[]> => {
    return api.get<string[]>('/products/categories');
  },

  search: async (query: string): Promise<Product[]> => {
    const products = await api.get<Product[]>('/products');
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    );
  },
};
