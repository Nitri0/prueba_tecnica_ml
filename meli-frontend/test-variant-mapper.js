/**
 * Test simple del variant mapper (Node.js)
 * Ejecutar con: node test-variant-mapper.js
 */

// Simulación del mapper (versión Node.js)
const VARIANT_SKU_MAPPING = {
  color: {
    azul: 'AZU',
    natural: 'NAT',
    negro: 'NEG',
    blanco: 'BLA',
  },
  capacidad: {
    '128gb': '128',
    '256gb': '256',
    '512gb': '512',
    '1tb': '1TB',
  },
};

const VARIANT_ORDER = ['color', 'capacidad'];

function buildVariantProductId(baseProductId, variantSlugs) {
  if (!variantSlugs || Object.keys(variantSlugs).length === 0) {
    return baseProductId;
  }

  const skuParts = [];

  for (const variantType of VARIANT_ORDER) {
    const slug = variantSlugs[variantType];

    if (slug) {
      const skuCode = VARIANT_SKU_MAPPING[variantType]?.[slug];

      if (skuCode) {
        skuParts.push(skuCode);
      } else {
        console.warn(
          `No se encontró mapping SKU para ${variantType}:${slug}`
        );
        skuParts.push(slug.toUpperCase());
      }
    }
  }

  if (skuParts.length === 0) {
    return baseProductId;
  }

  return `${baseProductId}-${skuParts.join('-')}`;
}

// TESTS
console.log('🧪 Test del Variant Mapper\n');
console.log('=' .repeat(50));

const tests = [
  {
    name: 'Test 1: Azul + 256GB',
    base: 'MLC123456789',
    variants: { color: 'azul', capacidad: '256gb' },
    expected: 'MLC123456789-AZU-256',
  },
  {
    name: 'Test 2: Negro + 512GB',
    base: 'MLC123456789',
    variants: { color: 'negro', capacidad: '512gb' },
    expected: 'MLC123456789-NEG-512',
  },
  {
    name: 'Test 3: Natural + 128GB',
    base: 'MLC123456789',
    variants: { color: 'natural', capacidad: '128gb' },
    expected: 'MLC123456789-NAT-128',
  },
  {
    name: 'Test 4: Sin variantes',
    base: 'MLC123456789',
    variants: {},
    expected: 'MLC123456789',
  },
  {
    name: 'Test 5: Solo color (parcial)',
    base: 'MLC123456789',
    variants: { color: 'azul' },
    expected: 'MLC123456789-AZU',
  },
];

let passed = 0;
let failed = 0;

tests.forEach((test) => {
  const result = buildVariantProductId(test.base, test.variants);
  const success = result === test.expected;

  console.log(`\n${test.name}`);
  console.log(`  Input: ${test.base} + ${JSON.stringify(test.variants)}`);
  console.log(`  Expected: ${test.expected}`);
  console.log(`  Got: ${result}`);
  console.log(`  ${success ? '✅ PASSED' : '❌ FAILED'}`);

  if (success) {
    passed++;
  } else {
    failed++;
  }
});

console.log('\n' + '='.repeat(50));
console.log(`\n📊 Resultados: ${passed} pasados, ${failed} fallidos`);

if (failed === 0) {
  console.log('✅ TODOS LOS TESTS PASARON!\n');
  process.exit(0);
} else {
  console.log('❌ Algunos tests fallaron\n');
  process.exit(1);
}
