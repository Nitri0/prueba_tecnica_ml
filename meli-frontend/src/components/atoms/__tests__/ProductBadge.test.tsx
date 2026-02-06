import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductBadge } from '../ProductBadge';

describe('ProductBadge', () => {
  it('debe renderizar correctamente con texto', () => {
    render(<ProductBadge text="Nuevo" />);
    expect(screen.getByText('Nuevo')).toBeInTheDocument();
  });

  it('debe aplicar variante new por defecto', () => {
    render(<ProductBadge text="Nuevo" />);
    const badge = screen.getByText('Nuevo');
    expect(badge).toHaveClass('bg-transparent', 'text-ml-gray-medium', 'text-sm');
  });

  it('debe aplicar variante used', () => {
    render(<ProductBadge text="Usado" variant="used" />);
    const badge = screen.getByText('Usado');
    expect(badge).toHaveClass('bg-ml-gray-light', 'text-ml-gray-dark', 'text-xs', 'rounded');
  });

  it('debe aplicar variante official', () => {
    render(<ProductBadge text="Oficial" variant="official" />);
    const badge = screen.getByText('Oficial');
    expect(badge).toHaveClass('bg-red-500', 'text-white', 'font-semibold');
  });

  it('debe aplicar variante bestseller', () => {
    render(<ProductBadge text="Más vendido" variant="bestseller" />);
    const badge = screen.getByText('Más vendido');
    expect(badge).toHaveClass('bg-orange-500', 'text-white', 'uppercase');
  });

  it('debe aplicar className personalizado', () => {
    render(<ProductBadge text="Badge" className="custom-badge" />);
    const badge = screen.getByText('Badge');
    expect(badge).toHaveClass('custom-badge');
  });

  it('debe ser inline-block', () => {
    render(<ProductBadge text="Badge" />);
    const badge = screen.getByText('Badge');
    expect(badge).toHaveClass('inline-block');
  });

  it('debe renderizar como span', () => {
    render(<ProductBadge text="Badge" />);
    const badge = screen.getByText('Badge');
    expect(badge.tagName).toBe('SPAN');
  });
});
