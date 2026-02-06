import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SellerBadge } from '../SellerBadge';

describe('SellerBadge', () => {
  it('debe renderizar correctamente', () => {
    const { container } = render(<SellerBadge />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('debe aplicar nivel gold por defecto', () => {
    render(<SellerBadge />);
    expect(screen.getByText('MercadoLíder Gold')).toBeInTheDocument();
  });

  it('debe renderizar nivel platinum', () => {
    render(<SellerBadge level="platinum" />);
    const badge = screen.getByText('MercadoLíder Platinum');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-purple-600');
  });

  it('debe renderizar nivel gold', () => {
    render(<SellerBadge level="gold" />);
    const badge = screen.getByText('MercadoLíder Gold');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-yellow-600');
  });

  it('debe renderizar nivel silver', () => {
    render(<SellerBadge level="silver" />);
    const badge = screen.getByText('MercadoLíder');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-gray-600');
  });

  it('debe renderizar nivel bronze', () => {
    render(<SellerBadge level="bronze" />);
    const badge = screen.getByText('MercadoLíder');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-orange-600');
  });

  it('debe mostrar ícono de Award', () => {
    const { container } = render(<SellerBadge />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('w-4', 'h-4');
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<SellerBadge className="custom-badge" />);
    expect(container.firstChild).toHaveClass('custom-badge');
  });

  it('debe tener estructura inline-flex con gap', () => {
    const { container } = render(<SellerBadge />);
    expect(container.firstChild).toHaveClass('inline-flex', 'items-center', 'gap-1.5');
  });

  it('debe tener border y rounded', () => {
    const { container } = render(<SellerBadge />);
    expect(container.firstChild).toHaveClass('border', 'rounded-md');
  });

  it('debe aplicar colores de fondo según nivel platinum', () => {
    const { container } = render(<SellerBadge level="platinum" />);
    expect(container.firstChild).toHaveClass('bg-purple-50', 'border-purple-200');
  });

  it('debe aplicar colores de fondo según nivel gold', () => {
    const { container } = render(<SellerBadge level="gold" />);
    expect(container.firstChild).toHaveClass('bg-yellow-50', 'border-yellow-200');
  });
});
