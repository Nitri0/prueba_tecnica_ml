import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CharacteristicCategory } from '../CharacteristicCategory';

describe('CharacteristicCategory', () => {
  const mockCharacteristics = [
    { name: 'Procesador', value: 'Snapdragon 8 Gen 2' },
    { name: 'RAM', value: '12 GB' },
    { name: 'Almacenamiento', value: '256 GB' },
  ];

  it('debe renderizar correctamente', () => {
    const { container } = render(
      <CharacteristicCategory categoryName="Especificaciones" characteristics={mockCharacteristics} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('debe mostrar el nombre de la categoría', () => {
    render(
      <CharacteristicCategory categoryName="Hardware" characteristics={mockCharacteristics} />
    );
    expect(screen.getByText('Hardware')).toBeInTheDocument();
  });

  it('debe renderizar todas las características', () => {
    render(
      <CharacteristicCategory categoryName="Specs" characteristics={mockCharacteristics} />
    );

    expect(screen.getByText('Procesador')).toBeInTheDocument();
    expect(screen.getByText('Snapdragon 8 Gen 2')).toBeInTheDocument();
    expect(screen.getByText('RAM')).toBeInTheDocument();
    expect(screen.getByText('12 GB')).toBeInTheDocument();
    expect(screen.getByText('Almacenamiento')).toBeInTheDocument();
    expect(screen.getByText('256 GB')).toBeInTheDocument();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(
      <CharacteristicCategory
        categoryName="Test"
        characteristics={mockCharacteristics}
        className="custom-category"
      />
    );
    expect(container.firstChild).toHaveClass('custom-category');
  });

  it('debe tener borde y esquinas redondeadas en la lista', () => {
    const { container } = render(
      <CharacteristicCategory categoryName="Test" characteristics={mockCharacteristics} />
    );
    const list = container.querySelector('.border.rounded');
    expect(list).toBeInTheDocument();
  });

  it('debe alternar colores de fondo en características', () => {
    const { container } = render(
      <CharacteristicCategory categoryName="Test" characteristics={mockCharacteristics} />
    );

    const items = container.querySelectorAll('.grid.grid-cols-2');
    expect(items[0]).toHaveClass('bg-ml-gray-light');
    expect(items[1]).toHaveClass('bg-white');
    expect(items[2]).toHaveClass('bg-ml-gray-light');
  });

  it('debe usar grid de 2 columnas para cada característica', () => {
    const { container } = render(
      <CharacteristicCategory categoryName="Test" characteristics={mockCharacteristics} />
    );

    const gridItems = container.querySelectorAll('.grid-cols-2');
    expect(gridItems.length).toBe(3);
  });

  it('debe renderizar sin error cuando no hay características', () => {
    const { container } = render(
      <CharacteristicCategory categoryName="Empty" characteristics={[]} />
    );
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });

  it('debe tener texto en tamaño xs', () => {
    render(
      <CharacteristicCategory categoryName="Test" characteristics={mockCharacteristics} />
    );

    const processorName = screen.getByText('Procesador');
    expect(processorName).toHaveClass('text-xs');
  });

  it('debe tener nombre de característica en negrita', () => {
    render(
      <CharacteristicCategory categoryName="Test" characteristics={mockCharacteristics} />
    );

    const processorName = screen.getByText('Procesador');
    expect(processorName).toHaveClass('font-medium');
  });
});
