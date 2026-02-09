/**
 * Mapper para convertir slugs de variantes a códigos de SKU
 * Este mapper mantiene la convención del backend para construir product IDs
 */

/**
 * Mapeo de slugs a códigos de SKU por tipo de variante
 */
const VARIANT_SKU_MAPPING: Record<string, Record<string, string>> = {
  // Colores: slug → código SKU
  color: {
    azul: 'AZU',
    natural: 'NAT',
    negro: 'NEG',
    blanco: 'BLA',
  },

  // Capacidades: slug → código SKU
  capacidad: {
    '128gb': '128',
    '256gb': '256',
    '512gb': '512',
    '1tb': '1TB',
  },

  // Agregar más tipos de variantes aquí según se necesiten
  // talla: { s: 'S', m: 'M', l: 'L', xl: 'XL' },
  // material: { algodon: 'ALG', poliester: 'POL' },
};

/**
 * Orden de las variantes en el SKU
 * Define en qué orden se concatenan los códigos para formar el SKU
 */
const VARIANT_ORDER = ['color', 'capacidad'];

/**
 * Construye el product ID específico (SKU) basado en variantes
 *
 * @param baseProductId - ID del producto base (ej: "MLC123456789")
 * @param variantSlugs - Slugs de variantes seleccionadas (ej: {color: "azul", capacidad: "256gb"})
 * @returns Product ID completo (ej: "MLC123456789-AZU-256")
 *
 * @example
 * buildVariantProductId("MLC123456789", {color: "azul", capacidad: "256gb"})
 * // Returns: "MLC123456789-AZU-256"
 *
 * buildVariantProductId("MLC123456789", {color: "negro", capacidad: "512gb"})
 * // Returns: "MLC123456789-NEG-512"
 */
export function buildVariantProductId(
  baseProductId: string,
  variantSlugs: Record<string, string>
): string {
  // Si no hay variantes, retornar el ID base
  if (!variantSlugs || Object.keys(variantSlugs).length === 0) {
    return baseProductId;
  }

  // Construir códigos SKU en el orden correcto
  const skuParts: string[] = [];

  for (const variantType of VARIANT_ORDER) {
    const slug = variantSlugs[variantType];

    if (slug) {
      // Obtener el código SKU para este slug
      const skuCode = VARIANT_SKU_MAPPING[variantType]?.[slug];

      if (skuCode) {
        skuParts.push(skuCode);
      } else {
        console.warn(
          `No se encontró mapping SKU para ${variantType}:${slug}. Usando slug original.`
        );
        skuParts.push(slug.toUpperCase());
      }
    }
  }

  // Si no se pudo construir ningún código, retornar ID base
  if (skuParts.length === 0) {
    console.warn(
      'No se pudieron construir códigos SKU para las variantes:',
      variantSlugs
    );
    return baseProductId;
  }

  // Construir ID completo: BASE-CODE1-CODE2-...
  return `${baseProductId}-${skuParts.join('-')}`;
}

/**
 * Verifica si un conjunto de variantes tiene mapping definido
 *
 * @param variantSlugs - Slugs de variantes a verificar
 * @returns true si todas las variantes tienen mapping, false si alguna no
 */
export function hasVariantMapping(variantSlugs: Record<string, string>): boolean {
  for (const [variantType, slug] of Object.entries(variantSlugs)) {
    if (!VARIANT_SKU_MAPPING[variantType]?.[slug]) {
      return false;
    }
  }
  return true;
}

/**
 * Agrega un nuevo mapping de variante (útil para extender dinámicamente)
 *
 * @param variantType - Tipo de variante (ej: "color", "capacidad")
 * @param slug - Slug de la variante (ej: "azul")
 * @param skuCode - Código SKU correspondiente (ej: "AZU")
 */
export function addVariantMapping(
  variantType: string,
  slug: string,
  skuCode: string
): void {
  if (!VARIANT_SKU_MAPPING[variantType]) {
    VARIANT_SKU_MAPPING[variantType] = {};
  }
  VARIANT_SKU_MAPPING[variantType][slug] = skuCode;
}
