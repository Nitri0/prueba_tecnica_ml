import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PriceDisplay } from '../PriceDisplay';

describe('PriceDisplay', () => {
  it('debe renderizar precio simple correctamente', () => {
    render(<PriceDisplay amount={1299990} />);
    expect(screen.getByText('1.299.990')).toBeInTheDocument();
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('debe formatear números con separador de miles', () => {
    render(<PriceDisplay amount={1500000} />);
    expect(screen.getByText('1.500.000')).toBeInTheDocument();
  });

  it('debe mostrar decimales cuando existen', () => {
    render(<PriceDisplay amount={1299.99} />);
    expect(screen.getByText('1.299')).toBeInTheDocument();
    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('no debe mostrar decimales cuando son 0', () => {
    const { container } = render(<PriceDisplay amount={1299} />);
    expect(screen.getByText('1.299')).toBeInTheDocument();
    // Los decimales no deberían estar presentes
    const decimals = container.querySelector('.align-top');
    expect(decimals).not.toBeInTheDocument();
  });

  it('debe mostrar precio original tachado', () => {
    render(<PriceDisplay amount={999} originalPrice={1499} />);
    const originalPrice = screen.getByText('$1.499');
    expect(originalPrice).toHaveClass('line-through');
  });

  it('debe mostrar badge de descuento', () => {
    render(<PriceDisplay amount={999} discount={25} />);
    expect(screen.getByText('25% OFF')).toBeInTheDocument();
  });

  it('debe ocultar precio original cuando showDiscount es false', () => {
    render(<PriceDisplay amount={999} originalPrice={1499} showDiscount={false} />);
    expect(screen.queryByText('$1.499')).not.toBeInTheDocument();
  });

  it('debe mostrar badge de descuento independientemente de showDiscount', () => {
    // Nota: El badge de descuento no está condicionado por showDiscount en la implementación actual
    render(<PriceDisplay amount={999} discount={25} showDiscount={false} />);
    expect(screen.getByText('25% OFF')).toBeInTheDocument();
  });

  it('debe aceptar moneda personalizada', () => {
    render(<PriceDisplay amount={100} currency="€" />);
    expect(screen.getByText('€')).toBeInTheDocument();
  });

  it('debe aplicar tamaño small', () => {
    const { container } = render(<PriceDisplay amount={999} size="sm" />);
    const priceElement = screen.getByText('999');
    expect(priceElement).toHaveClass('text-xl');
  });

  it('debe aplicar tamaño medium', () => {
    const { container } = render(<PriceDisplay amount={999} size="md" />);
    const priceElement = screen.getByText('999');
    expect(priceElement).toHaveClass('text-3xl');
  });

  it('debe aplicar tamaño large por defecto', () => {
    const { container } = render(<PriceDisplay amount={999} />);
    const priceElement = screen.getByText('999');
    expect(priceElement).toHaveClass('text-4xl');
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<PriceDisplay amount={999} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe mostrar precio con descuento y precio original juntos', () => {
    render(<PriceDisplay amount={750} originalPrice={1000} discount={25} />);
    expect(screen.getByText('750')).toBeInTheDocument();
    expect(screen.getByText('$1.000')).toBeInTheDocument();
    expect(screen.getByText('25% OFF')).toBeInTheDocument();
  });
});
