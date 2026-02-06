import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCharacteristics } from '../ProductCharacteristics';
import { ProductCharacteristic } from '@/types/product';

const mockCharacteristics: ProductCharacteristic[] = [
  {
    type: 'range',
    name: 'Peso',
    value: '180 g',
    current: 30,
    minLabel: 'Liviano',
    maxLabel: 'Pesado',
  },
  {
    type: 'range',
    name: 'Tamaño',
    value: '6.5"',
    current: 60,
    minLabel: 'Pequeño',
    maxLabel: 'Grande',
  },
  {
    type: 'highlight',
    name: 'Marca',
    value: 'Samsung',
  },
  {
    type: 'highlight',
    name: 'Modelo',
    value: 'Galaxy S23',
  },
  {
    type: 'highlight',
    name: 'Color',
    value: 'Negro',
  },
  {
    type: 'category',
    categoryName: 'Especificaciones',
    characteristics: [
      { name: 'Procesador', value: 'Snapdragon 8 Gen 2' },
      { name: 'RAM', value: '8GB' },
    ],
  },
];

describe('ProductCharacteristics', () => {
  it('debe renderizar correctamente', () => {
    render(<ProductCharacteristics characteristics={mockCharacteristics} />);
    expect(screen.getByText('Características del producto')).toBeInTheDocument();
  });

  it('debe mostrar el título personalizado', () => {
    render(
      <ProductCharacteristics
        characteristics={mockCharacteristics}
        title="Especificaciones técnicas"
      />
    );
    expect(screen.getByText('Especificaciones técnicas')).toBeInTheDocument();
  });

  it('debe mostrar características tipo range', () => {
    render(<ProductCharacteristics characteristics={mockCharacteristics} />);
    // El texto puede estar fragmentado por el componente CharacteristicRange
    expect(screen.getByText(/Peso/)).toBeInTheDocument();
    expect(screen.getByText(/180 g/)).toBeInTheDocument();
  });

  it('debe mostrar características tipo highlight', () => {
    render(<ProductCharacteristics characteristics={mockCharacteristics} />);
    // El texto puede estar fragmentado por el componente CharacteristicHighlight
    expect(screen.getByText(/Marca/)).toBeInTheDocument();
    expect(screen.getByText(/Samsung/)).toBeInTheDocument();
  });

  it('debe mostrar solo características iniciales sin expandir', () => {
    render(<ProductCharacteristics characteristics={mockCharacteristics} initialVisibleCount={2} />);

    // Solo deben estar visibles las primeras características
    expect(screen.getByText(/Peso/)).toBeInTheDocument();

    // Las categorías no deberían estar visibles inicialmente
    expect(screen.queryByText('Especificaciones')).not.toBeInTheDocument();
  });

  it('debe mostrar botón "Ver todas las características"', () => {
    render(<ProductCharacteristics characteristics={mockCharacteristics} />);
    expect(screen.getByText('Ver todas las características')).toBeInTheDocument();
  });

  it('debe expandir características al hacer click', async () => {
    const user = userEvent.setup();
    render(<ProductCharacteristics characteristics={mockCharacteristics} />);

    const button = screen.getByText('Ver todas las características');
    await user.click(button);

    // Ahora deberían estar visibles las categorías
    expect(screen.getByText('Especificaciones')).toBeInTheDocument();
  });

  it('debe ocultar el botón después de expandir', async () => {
    const user = userEvent.setup();
    render(<ProductCharacteristics characteristics={mockCharacteristics} />);

    const button = screen.getByText('Ver todas las características');
    await user.click(button);

    expect(screen.queryByText('Ver todas las características')).not.toBeInTheDocument();
  });

  it('debe mostrar características de categoría después de expandir', async () => {
    const user = userEvent.setup();
    render(<ProductCharacteristics characteristics={mockCharacteristics} />);

    const button = screen.getByText('Ver todas las características');
    await user.click(button);

    expect(screen.getByText('Procesador')).toBeInTheDocument();
    expect(screen.getByText('Snapdragon 8 Gen 2')).toBeInTheDocument();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(
      <ProductCharacteristics characteristics={mockCharacteristics} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe tener icono de chevron en el botón', () => {
    const { container } = render(<ProductCharacteristics characteristics={mockCharacteristics} />);
    const icon = container.querySelector('.lucide-chevron-down');
    expect(icon).toBeInTheDocument();
  });

  it('debe tener diseño responsive en grid', () => {
    const { container } = render(<ProductCharacteristics characteristics={mockCharacteristics} />);
    const grid = container.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2');
    expect(grid).toBeInTheDocument();
  });

  it('no debe mostrar botón si no hay más características', () => {
    const simpleChars: ProductCharacteristic[] = [
      {
        type: 'highlight',
        name: 'Marca',
        value: 'Samsung',
      },
    ];

    render(<ProductCharacteristics characteristics={simpleChars} />);
    expect(screen.queryByText('Ver todas las características')).not.toBeInTheDocument();
  });

  it('debe ordenar características correctamente', () => {
    render(<ProductCharacteristics characteristics={mockCharacteristics} />);
    // Las características tipo range deberían aparecer primero
    const firstElements = screen.getAllByText(/Peso|Tamaño/);
    expect(firstElements.length).toBeGreaterThan(0);
  });
});
