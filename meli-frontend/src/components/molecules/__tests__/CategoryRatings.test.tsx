import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CategoryRatings } from '../CategoryRatings';

describe('CategoryRatings', () => {
  const mockCategories = [
    { id: '1', name: 'Durabilidad', rating: 4.5 },
    { id: '2', name: 'Batería', rating: 4.2 },
    { id: '3', name: 'Calidad precio', rating: 4.8 },
  ];

  it('debe renderizar correctamente', () => {
    const { container } = render(<CategoryRatings categories={mockCategories} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('debe renderizar todas las categorías', () => {
    render(<CategoryRatings categories={mockCategories} />);
    expect(screen.getByText('Durabilidad')).toBeInTheDocument();
    expect(screen.getByText('Batería')).toBeInTheDocument();
    expect(screen.getByText('Calidad precio')).toBeInTheDocument();
  });

  it('debe renderizar estrellas para cada categoría', () => {
    const { container } = render(<CategoryRatings categories={mockCategories} />);
    const stars = container.querySelectorAll('svg');
    // 3 categorías x 5 estrellas = 15 estrellas
    expect(stars.length).toBe(15);
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(
      <CategoryRatings categories={mockCategories} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe renderizar sin error cuando no hay categorías', () => {
    const { container } = render(<CategoryRatings categories={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('debe tener espaciado entre categorías', () => {
    const { container } = render(<CategoryRatings categories={mockCategories} />);
    expect(container.firstChild).toHaveClass('space-y-3');
  });

  it('debe renderizar nombre de categoría con estilo correcto', () => {
    render(<CategoryRatings categories={mockCategories} />);
    const categoryName = screen.getByText('Durabilidad');
    expect(categoryName).toHaveClass('text-sm', 'text-ml-gray-dark');
  });
});
