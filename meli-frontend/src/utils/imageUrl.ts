/**
 * Utilidades para manejo de URLs de imágenes
 */

/**
 * Obtiene la URL base del API desde variables de entorno
 */
export const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_URL || 'http://localhost:8001';
};

/**
 * Convierte una ruta de imagen a URL completa del backend
 *
 * @param imagePath - Ruta de la imagen (puede ser relativa o absoluta)
 * @returns URL completa para acceder a la imagen
 *
 * @example
 * getImageUrl('/images/MLC123/product.webp')
 * // => 'http://localhost:8001/static/images/MLC123/product.webp'
 *
 * getImageUrl('http://example.com/image.jpg')
 * // => 'http://example.com/image.jpg' (ya es URL completa)
 */
export const getImageUrl = (imagePath: string): string => {
  // Si ya es una URL completa (empieza con http:// o https://), retornarla tal cual
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  const baseUrl = getApiBaseUrl();

  // Si la ruta empieza con /images/, convertirla a /static/images/
  if (imagePath.startsWith('/images/')) {
    return `${baseUrl}/static${imagePath}`;
  }

  // Si la ruta empieza con images/ (sin /), agregar /static/ al inicio
  if (imagePath.startsWith('images/')) {
    return `${baseUrl}/static/${imagePath}`;
  }

  // Si no empieza con /, agregarla
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${baseUrl}/static${normalizedPath}`;
};

/**
 * Convierte un array de rutas de imágenes a URLs completas
 *
 * @param imagePaths - Array de rutas de imágenes
 * @returns Array de URLs completas
 */
export const getImageUrls = (imagePaths: string[]): string[] => {
  return imagePaths.map(getImageUrl);
};
