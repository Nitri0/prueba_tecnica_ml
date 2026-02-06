import { type ProductVariants } from '../types/product';

/**
 * Construye una URL de producto combinando múltiples variantes
 * @param productId - ID del producto (ej: "MLC123456789")
 * @param variantSlugs - Objeto con slugs de variantes (ej: { color: "titanio-azul", capacidad: "256gb" })
 * @param variants - Configuración de variantes para obtener el orden
 * @returns URL completa (ej: "/producto/MLC123456789-titanio-azul-256gb")
 */
export const buildProductUrl = (
  productId: string,
  variantSlugs: Record<string, string>,
  variants: ProductVariants
): string => {
  // Ordenar los slugs según el order de cada VariantGroup
  const orderedSlugs = Object.entries(variants)
    .sort(([, a], [, b]) => (a.order || 0) - (b.order || 0))
    .map(([key]) => variantSlugs[key])
    .filter(Boolean)
    .join('-');

  return `/producto/${productId}${orderedSlugs ? `-${orderedSlugs}` : ''}`;
};

/**
 * Parsea una URL de producto y extrae las variantes seleccionadas
 * @param url - URL completa (ej: "/producto/MLC123456789-titanio-azul-256gb")
 * @param variants - Configuración de variantes
 * @returns Objeto con las variantes encontradas o null si la URL no es válida
 */
export const parseProductUrl = (
  url: string,
  variants: ProductVariants
): Record<string, string> | null => {
  // Extraer la parte después de /producto/
  const match = url.match(/^\/producto\/([^/]+)$/);
  if (!match) return null;

  const fullSlug = match[1];

  // Separar por guiones
  const parts = fullSlug.split('-');

  // El resto son slugs de variantes (el primero es el ID del producto)
  const slugParts = parts.slice(1);

  if (slugParts.length === 0) {
    // URL sin variantes, usar defaults
    return Object.entries(variants).reduce((acc, [key, variantGroup]) => {
      acc[key] = variantGroup.selectedId;
      return acc;
    }, {} as Record<string, string>);
  }

  // Mapear cada slug a su tipo de variante correspondiente
  const result: Record<string, string> = {};

  // Crear un mapa de slug -> variant info
  const slugMap = new Map<string, { key: string; id: string }>();

  Object.entries(variants).forEach(([key, variantGroup]) => {
    variantGroup.options.forEach(option => {
      slugMap.set(option.slug, { key, id: option.id });
    });
  });

  // Mapear cada slug de la URL a su variante
  slugParts.forEach(slug => {
    const variantInfo = slugMap.get(slug);
    if (variantInfo) {
      result[variantInfo.key] = variantInfo.id;
    }
  });

  // Completar con defaults para variantes no especificadas
  Object.entries(variants).forEach(([key, variantGroup]) => {
    if (!result[key]) {
      result[key] = variantGroup.selectedId;
    }
  });

  return result;
};

/**
 * Obtiene los slugs de las variantes actuales desde la URL
 * @param pathname - Pathname actual (location.pathname)
 * @param variants - Configuración de variantes
 * @returns Objeto con los slugs actuales de cada tipo de variante
 */
export const getCurrentVariantSlugs = (
  pathname: string,
  variants: ProductVariants
): Record<string, string> => {
  const variantIds = parseProductUrl(pathname, variants);

  if (!variantIds) {
    // Si no se puede parsear, usar defaults
    return Object.entries(variants).reduce((acc, [key, variantGroup]) => {
      const defaultOption = variantGroup.options.find(opt => opt.id === variantGroup.selectedId);
      acc[key] = defaultOption?.slug || variantGroup.options[0]?.slug || '';
      return acc;
    }, {} as Record<string, string>);
  }

  // Convertir IDs a slugs
  const result: Record<string, string> = {};

  Object.entries(variants).forEach(([key, variantGroup]) => {
    const variantId = variantIds[key];
    const option = variantGroup.options.find(opt => opt.id === variantId);
    result[key] = option?.slug || variantGroup.options[0]?.slug || '';
  });

  return result;
};
