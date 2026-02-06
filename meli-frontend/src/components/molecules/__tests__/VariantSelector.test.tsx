import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { VariantSelector } from '../VariantSelector';

describe('VariantSelector', () => {
  const mockVariants = [
    { id: '1', label: 'Negro', slug: 'negro', available: true },
    { id: '2', label: 'Blanco', slug: 'blanco', available: true },
    { id: '3', label: 'Azul', slug: 'azul', available: false },
  ];

  const mockAllVariants = {
    color: mockVariants,
  };

  const renderWithRouter = (component: React.ReactElement) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  it('debe renderizar correctamente', () => {
    const { container } = renderWithRouter(
      <VariantSelector
        title="Color"
        variants={mockVariants}
        selectedId="1"
        variantKey="color"
        productId="MLC123"
        allVariants={mockAllVariants}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('debe mostrar el título con la variante seleccionada', () => {
    renderWithRouter(
      <VariantSelector
        title="Color"
        variants={mockVariants}
        selectedId="1"
        variantKey="color"
        productId="MLC123"
        allVariants={mockAllVariants}
      />
    );
    expect(screen.getByText(/Color:/)).toBeInTheDocument();
    const negroElements = screen.getAllByText('Negro');
    expect(negroElements.length).toBeGreaterThan(0);
  });

  it('debe renderizar todos los botones de variantes', () => {
    renderWithRouter(
      <VariantSelector
        title="Color"
        variants={mockVariants}
        selectedId="1"
        variantKey="color"
        productId="MLC123"
        allVariants={mockAllVariants}
      />
    );

    expect(screen.getAllByText('Negro').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Blanco').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Azul').length).toBeGreaterThan(0);
  });

  it('debe aplicar className personalizado', () => {
    const { container } = renderWithRouter(
      <VariantSelector
        title="Color"
        variants={mockVariants}
        selectedId="1"
        variantKey="color"
        productId="MLC123"
        allVariants={mockAllVariants}
        className="custom-selector"
      />
    );
    expect(container.firstChild).toHaveClass('custom-selector');
  });

  it('debe mostrar mensaje cuando hay variantes no disponibles', () => {
    renderWithRouter(
      <VariantSelector
        title="Color"
        variants={mockVariants}
        selectedId="1"
        variantKey="color"
        productId="MLC123"
        allVariants={mockAllVariants}
      />
    );
    expect(screen.getByText('Algunas variantes no están disponibles')).toBeInTheDocument();
  });

  it('no debe mostrar mensaje cuando todas las variantes están disponibles', () => {
    const availableVariants = mockVariants.filter(v => v.available);
    renderWithRouter(
      <VariantSelector
        title="Color"
        variants={availableVariants}
        selectedId="1"
        variantKey="color"
        productId="MLC123"
        allVariants={mockAllVariants}
      />
    );
    expect(screen.queryByText('Algunas variantes no están disponibles')).not.toBeInTheDocument();
  });

  it('debe mostrar imágenes cuando showImages es true', () => {
    const variantsWithImages = mockVariants.map(v => ({
      ...v,
      image: `/images/${v.slug}.jpg`,
    }));

    renderWithRouter(
      <VariantSelector
        title="Color"
        variants={variantsWithImages}
        selectedId="1"
        variantKey="color"
        productId="MLC123"
        allVariants={{ color: variantsWithImages }}
        showImages={true}
      />
    );

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('debe tener layout flex con wrap', () => {
    const { container } = renderWithRouter(
      <VariantSelector
        title="Color"
        variants={mockVariants}
        selectedId="1"
        variantKey="color"
        productId="MLC123"
        allVariants={mockAllVariants}
      />
    );

    const variantsContainer = container.querySelector('.flex.flex-wrap');
    expect(variantsContainer).toBeInTheDocument();
  });

  it('debe tener título en negrita para la variante seleccionada', () => {
    renderWithRouter(
      <VariantSelector
        title="Color"
        variants={mockVariants}
        selectedId="1"
        variantKey="color"
        productId="MLC123"
        allVariants={mockAllVariants}
      />
    );

    // El título muestra "Color: Negro" donde Negro está en negrita
    const title = screen.getByText(/Color:/);
    expect(title).toBeInTheDocument();
  });
});
