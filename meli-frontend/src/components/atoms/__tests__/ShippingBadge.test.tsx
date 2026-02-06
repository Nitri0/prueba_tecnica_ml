import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ShippingBadge } from '../ShippingBadge';

describe('ShippingBadge', () => {
  it('debe renderizar correctamente cuando isFree es true', () => {
    render(<ShippingBadge isFree={true} />);
    expect(screen.getByText('Envío gratis')).toBeInTheDocument();
  });

  it('debe mostrar envío gratis por defecto', () => {
    render(<ShippingBadge />);
    expect(screen.getByText('Envío gratis')).toBeInTheDocument();
  });

  it('no debe renderizar cuando isFree es false', () => {
    const { container } = render(<ShippingBadge isFree={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('debe aplicar tamaño medium por defecto', () => {
    const { container } = render(<ShippingBadge />);
    expect(container.firstChild).toHaveClass('px-2.5', 'py-1.5', 'text-sm');
  });

  it('debe aplicar tamaño small', () => {
    const { container } = render(<ShippingBadge size="sm" />);
    expect(container.firstChild).toHaveClass('px-2', 'py-1', 'text-xs');
  });

  it('debe aplicar tamaño large', () => {
    const { container } = render(<ShippingBadge size="lg" />);
    expect(container.firstChild).toHaveClass('px-3', 'py-2', 'text-base');
  });

  it('debe mostrar ícono de camión con tamaño correcto (md)', () => {
    const { container } = render(<ShippingBadge size="md" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('w-4', 'h-4');
  });

  it('debe mostrar ícono de camión con tamaño correcto (sm)', () => {
    const { container } = render(<ShippingBadge size="sm" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('w-3', 'h-3');
  });

  it('debe mostrar ícono de camión con tamaño correcto (lg)', () => {
    const { container } = render(<ShippingBadge size="lg" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('w-5', 'h-5');
  });

  it('debe aplicar colores de Mercado Libre (verde)', () => {
    const { container } = render(<ShippingBadge />);
    expect(container.firstChild).toHaveClass('bg-ml-green-light', 'text-ml-green');
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<ShippingBadge className="custom-shipping" />);
    expect(container.firstChild).toHaveClass('custom-shipping');
  });

  it('debe tener estructura inline-flex con gap', () => {
    const { container } = render(<ShippingBadge />);
    expect(container.firstChild).toHaveClass('inline-flex', 'items-center', 'gap-1.5');
  });

  it('debe tener esquinas redondeadas', () => {
    const { container } = render(<ShippingBadge />);
    expect(container.firstChild).toHaveClass('rounded-md');
  });

  it('debe ser font-semibold', () => {
    const { container } = render(<ShippingBadge />);
    expect(container.firstChild).toHaveClass('font-semibold');
  });
});
