import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ApiProductService } from '../ApiProductService';
import type { ProductDetail } from '../../../types/product';

describe('ApiProductService', () => {
  let service: ApiProductService;
  let fetchMock: ReturnType<typeof vi.fn>;

  const mockProductResponse = {
    basics: {
      id: 'MLC123456789',
      title: 'iPhone 15 Pro Max',
      price: 1299990,
      originalPrice: 1499990,
      discount: 13,
      condition: 'new',
      soldCount: 127,
      availableStock: 8,
      description: 'iPhone 15 Pro Max descripción',
    },
    media: {
      images: ['https://example.com/image1.jpg'],
      descriptionImages: [],
    },
    averageRating: 4.5,
    reviewCount: 100,
    categoryPath: [
      { label: 'Electrónica', href: '/categoria/electronica' },
    ],
    seller: {
      name: 'Apple Store',
      logo: 'https://example.com/logo.jpg',
      isOfficialStore: true,
      followers: 10000,
      totalProducts: 500,
      level: 5,
      totalSales: 50000,
      reputation: 100,
      reputationMessage: 'Excelente vendedor',
      goodAttention: 98,
      onTimeDelivery: 99,
    },
    shipping: {
      type: 'fulfillment',
      estimatedDays: { min: 1, max: 3 },
      freeShipping: true,
    },
    characteristics: [],
    highlights: ['Chip A17 Pro', 'Cámara 48MP'],
    questions: [],
    relatedProducts: [],
    variants: {},
    paymentMethods: [],
    maxInstallments: 12,
    availableRatingCategories: [],
    reviews: [],
    totalReviews: 100,
    ratingDistribution: { 5: 80, 4: 15, 3: 3, 2: 1, 1: 1 },
    averageCategoryRatings: {},
  };

  beforeEach(() => {
    // Mock de console.log para evitar ruido en los tests
    vi.spyOn(console, 'log').mockImplementation(() => {});

    // Crear mock de fetch
    fetchMock = vi.fn();
    global.fetch = fetchMock;

    // Crear instancia del servicio
    service = new ApiProductService('http://localhost:8001/api');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('debe usar la URL base proporcionada', () => {
      const customService = new ApiProductService('http://custom-url.com/api');
      expect(customService).toBeDefined();
    });

    it('debe usar la URL por defecto si no se proporciona', () => {
      const defaultService = new ApiProductService();
      expect(defaultService).toBeDefined();
    });
  });

  describe('getProductById', () => {
    it('debe obtener un producto exitosamente', async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockProductResponse,
      });

      // Act
      const result = await service.getProductById('MLC123456789');

      // Assert
      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:8001/api/products/MLC123456789',
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );
      expect(result).toBeDefined();
      expect(result.basics.id).toBe('MLC123456789');
      expect(result.basics.title).toBe('iPhone 15 Pro Max');
      expect(result.averageRating).toBe(4.5);
    });

    it('debe lanzar error cuando el producto no existe (404)', async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      // Act & Assert
      await expect(service.getProductById('INVALID_ID')).rejects.toThrow(
        'Producto INVALID_ID no encontrado'
      );
    });

    it('debe lanzar error cuando hay un error del servidor (500)', async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      // Act & Assert
      await expect(service.getProductById('MLC123456789')).rejects.toThrow(
        'Error al obtener producto: Internal Server Error'
      );
    });

    it('debe manejar errores de red', async () => {
      // Arrange
      fetchMock.mockRejectedValueOnce(new Error('Network error'));

      // Act & Assert
      await expect(service.getProductById('MLC123456789')).rejects.toThrow(
        'Network error'
      );
    });

    it('debe manejar errores desconocidos', async () => {
      // Arrange
      fetchMock.mockRejectedValueOnce('Unknown error');

      // Act & Assert
      await expect(service.getProductById('MLC123456789')).rejects.toThrow(
        'Error desconocido al obtener el producto'
      );
    });

    it('debe mapear correctamente las fechas en questions', async () => {
      // Arrange
      const responseWithQuestions = {
        ...mockProductResponse,
        questions: [
          {
            id: 'q1',
            text: '¿Tiene garantía?',
            askedAt: '2024-01-01T10:00:00Z',
            answeredAt: '2024-01-02T10:00:00Z',
            answer: 'Sí, 1 año',
          },
        ],
      };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => responseWithQuestions,
      });

      // Act
      const result = await service.getProductById('MLC123456789');

      // Assert
      expect(result.questions).toHaveLength(1);
      expect(result.questions[0].askedAt).toBeInstanceOf(Date);
      expect(result.questions[0].answeredAt).toBeInstanceOf(Date);
    });
  });

  describe('resolveVariantProductId', () => {
    it('debe resolver el ID de variante correctamente', async () => {
      // Arrange
      const mockResolveResponse = {
        baseProductId: 'MLC123456789',
        variantCombination: { color: 'azul', capacidad: '256gb' },
        productVariantId: 'MLC928744140',
      };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResolveResponse,
      });

      // Act
      const result = await service.resolveVariantProductId('MLC123456789', {
        color: 'azul',
        capacidad: '256gb',
      });

      // Assert
      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:8001/api/products/MLC123456789/resolve-variant?variants=color:azul,capacidad:256gb',
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );
      expect(result).toBe('MLC928744140');
    });

    it('debe construir correctamente el query string con múltiples variantes', async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ productVariantId: 'MLC928744140' }),
      });

      // Act
      await service.resolveVariantProductId('MLC123456789', {
        color: 'negro',
        capacidad: '512gb',
        material: 'titanio',
      });

      // Assert
      const callUrl = fetchMock.mock.calls[0][0] as string;
      expect(callUrl).toContain('color:negro');
      expect(callUrl).toContain('capacidad:512gb');
      expect(callUrl).toContain('material:titanio');
    });

    it('debe lanzar error cuando la resolución falla', async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        ok: false,
        statusText: 'Bad Request',
      });

      // Act & Assert
      await expect(
        service.resolveVariantProductId('MLC123456789', { color: 'rojo' })
      ).rejects.toThrow('Error al resolver variante: Bad Request');
    });

    it('debe manejar errores de red en resolución', async () => {
      // Arrange
      fetchMock.mockRejectedValueOnce(new Error('Connection timeout'));

      // Act & Assert
      await expect(
        service.resolveVariantProductId('MLC123456789', { color: 'azul' })
      ).rejects.toThrow('Connection timeout');
    });

    it('debe manejar errores desconocidos en resolución', async () => {
      // Arrange
      fetchMock.mockRejectedValueOnce(null);

      // Act & Assert
      await expect(
        service.resolveVariantProductId('MLC123456789', { color: 'azul' })
      ).rejects.toThrow('Error desconocido al resolver variante');
    });
  });

  describe('searchProducts', () => {
    it('debe buscar productos exitosamente', async () => {
      // Arrange
      const mockSearchResponse = [mockProductResponse];

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSearchResponse,
      });

      // Act
      const result = await service.searchProducts('iPhone');

      // Assert
      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:8001/api/products/search?q=iPhone',
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );
      expect(result).toHaveLength(1);
      expect(result[0].basics.title).toBe('iPhone 15 Pro Max');
    });

    it('debe encodear correctamente caracteres especiales en la búsqueda', async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      // Act
      await service.searchProducts('iPhone & iPad');

      // Assert
      const callUrl = fetchMock.mock.calls[0][0] as string;
      expect(callUrl).toContain(encodeURIComponent('iPhone & iPad'));
    });

    it('debe retornar array vacío cuando no hay resultados', async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      // Act
      const result = await service.searchProducts('producto inexistente');

      // Assert
      expect(result).toEqual([]);
    });

    it('debe lanzar error cuando la búsqueda falla', async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      });

      // Act & Assert
      await expect(service.searchProducts('iPhone')).rejects.toThrow(
        'Error en búsqueda: Internal Server Error'
      );
    });

    it('debe manejar errores de red en búsqueda', async () => {
      // Arrange
      fetchMock.mockRejectedValueOnce(new Error('Network failed'));

      // Act & Assert
      await expect(service.searchProducts('iPhone')).rejects.toThrow(
        'Network failed'
      );
    });

    it('debe manejar errores desconocidos en búsqueda', async () => {
      // Arrange
      fetchMock.mockRejectedValueOnce(undefined);

      // Act & Assert
      await expect(service.searchProducts('iPhone')).rejects.toThrow(
        'Error desconocido en la búsqueda'
      );
    });

    it('debe mapear múltiples productos correctamente', async () => {
      // Arrange
      const mockMultipleProducts = [
        { ...mockProductResponse, basics: { ...mockProductResponse.basics, id: 'PROD1' } },
        { ...mockProductResponse, basics: { ...mockProductResponse.basics, id: 'PROD2' } },
        { ...mockProductResponse, basics: { ...mockProductResponse.basics, id: 'PROD3' } },
      ];

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockMultipleProducts,
      });

      // Act
      const result = await service.searchProducts('iPhone');

      // Assert
      expect(result).toHaveLength(3);
      expect(result[0].basics.id).toBe('PROD1');
      expect(result[1].basics.id).toBe('PROD2');
      expect(result[2].basics.id).toBe('PROD3');
    });
  });

  describe('mapApiResponseToProductDetail', () => {
    it('debe mapear correctamente todos los campos del producto', async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProductResponse,
      });

      // Act
      const result = await service.getProductById('MLC123456789');

      // Assert
      expect(result.basics).toBeDefined();
      expect(result.media).toBeDefined();
      expect(result.averageRating).toBe(4.5);
      expect(result.reviewCount).toBe(100);
      expect(result.categoryPath).toBeDefined();
      expect(result.seller).toBeDefined();
      expect(result.shipping).toBeDefined();
      expect(result.characteristics).toBeDefined();
      expect(result.highlights).toBeDefined();
      expect(result.questions).toBeDefined();
      expect(result.relatedProducts).toBeDefined();
      expect(result.variants).toBeDefined();
      expect(result.paymentMethods).toBeDefined();
      expect(result.maxInstallments).toBe(12);
      expect(result.availableRatingCategories).toBeDefined();
      expect(result.reviews).toBeDefined();
      expect(result.totalReviews).toBe(100);
      expect(result.ratingDistribution).toBeDefined();
      expect(result.averageCategoryRatings).toBeDefined();
    });

    it('debe manejar questions undefined o null', async () => {
      // Arrange
      const responseWithoutQuestions = {
        ...mockProductResponse,
        questions: undefined,
      };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => responseWithoutQuestions,
      });

      // Act
      const result = await service.getProductById('MLC123456789');

      // Assert
      expect(result.questions).toEqual([]);
    });
  });

  describe('integración', () => {
    it('debe realizar múltiples llamadas de forma independiente', async () => {
      // Arrange
      fetchMock
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockProductResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ productVariantId: 'MLC928744140' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => [mockProductResponse],
        });

      // Act
      const product = await service.getProductById('MLC123456789');
      const variantId = await service.resolveVariantProductId('MLC123456789', {
        color: 'azul',
      });
      const searchResults = await service.searchProducts('iPhone');

      // Assert
      expect(product.basics.id).toBe('MLC123456789');
      expect(variantId).toBe('MLC928744140');
      expect(searchResults).toHaveLength(1);
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });
  });
});
