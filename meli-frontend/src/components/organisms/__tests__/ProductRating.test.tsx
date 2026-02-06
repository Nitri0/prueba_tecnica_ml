import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductRating } from '../ProductRating';

describe('ProductRating', () => {
  it('debe renderizar correctamente', () => {
    render(<ProductRating rating={4.5} reviewCount={1234} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('debe mostrar el rating con un decimal', () => {
    render(<ProductRating rating={4.7} reviewCount={100} />);
    expect(screen.getByText('4.7')).toBeInTheDocument();
  });

  it('debe mostrar el número de reviews formateado', () => {
    render(<ProductRating rating={4.5} reviewCount={1234} />);
    expect(screen.getByText('(1,234)')).toBeInTheDocument();
  });

  it('debe renderizar en modo compacto', () => {
    render(<ProductRating rating={4.5} reviewCount={100} compact={true} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(100)')).toBeInTheDocument();
  });

  it('debe tener enlace a reviews en modo normal', () => {
    render(<ProductRating rating={4.5} reviewCount={100} />);
    const link = screen.getByText('(100)').closest('a');
    expect(link).toHaveAttribute('href', '#reviews');
  });

  it('no debe tener enlace en modo compacto', () => {
    render(<ProductRating rating={4.5} reviewCount={100} compact={true} />);
    const reviewText = screen.getByText('(100)');
    expect(reviewText.tagName).toBe('SPAN');
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(
      <ProductRating rating={4.5} reviewCount={100} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe renderizar con rating de 5.0', () => {
    render(<ProductRating rating={5.0} reviewCount={50} />);
    expect(screen.getByText('5.0')).toBeInTheDocument();
  });

  it('debe renderizar con rating bajo', () => {
    render(<ProductRating rating={2.3} reviewCount={10} />);
    expect(screen.getByText('2.3')).toBeInTheDocument();
  });

  it('debe formatear números grandes de reviews', () => {
    render(<ProductRating rating={4.8} reviewCount={123456} />);
    expect(screen.getByText('(123,456)')).toBeInTheDocument();
  });

  it('debe renderizar con un solo review', () => {
    render(<ProductRating rating={5.0} reviewCount={1} />);
    expect(screen.getByText('(1)')).toBeInTheDocument();
  });

  it('debe tener tamaño xs en modo compacto', () => {
    const { container } = render(<ProductRating rating={4.5} reviewCount={100} compact={true} />);
    const wrapper = container.querySelector('.flex.items-center');
    expect(wrapper).toBeInTheDocument();
  });

  it('debe tener tamaño sm en modo normal', () => {
    const { container } = render(<ProductRating rating={4.5} reviewCount={100} />);
    const wrapper = container.querySelector('.flex.items-center');
    expect(wrapper).toBeInTheDocument();
  });
});
