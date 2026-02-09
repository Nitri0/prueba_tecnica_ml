import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// Mock de getImageUrl para tests
// En tests, las imágenes deben retornar la ruta original sin transformar
vi.mock('../utils/imageUrl', () => ({
  getImageUrl: (path: string) => path,
  getApiBaseUrl: () => 'http://localhost:8001',
}));

// Cleanup después de cada test
afterEach(() => {
  cleanup();
});
