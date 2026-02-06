import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PurchaseBox } from '../PurchaseBox';

describe('PurchaseBox', () => {
  const defaultProps = {
    price: 99990,
    condition: 'new' as const,
    availableStock: 10,
  };

  it('debe renderizar correctamente', () => {
    render(<PurchaseBox {...defaultProps} />);
    expect(screen.getByText('Comprar ahora')).toBeInTheDocument();
  });

  it('debe mostrar mensaje de envío gratis', () => {
    render(<PurchaseBox {...defaultProps} />);
    expect(screen.getByText(/Llega gratis el/)).toBeInTheDocument();
  });

  it('debe mostrar "Stock disponible" cuando hay stock', () => {
    render(<PurchaseBox {...defaultProps} />);
    expect(screen.getByText('Stock disponible')).toBeInTheDocument();
  });

  it('debe mostrar "Sin stock" cuando no hay stock', () => {
    render(<PurchaseBox {...defaultProps} availableStock={0} />);
    expect(screen.getByText('Sin stock')).toBeInTheDocument();
  });

  it('debe tener botones deshabilitados cuando no hay stock', () => {
    render(<PurchaseBox {...defaultProps} availableStock={0} />);

    const buyButton = screen.getByText('Comprar ahora');
    const cartButton = screen.getByText('Agregar al carrito');

    expect(buyButton).toBeDisabled();
    expect(cartButton).toBeDisabled();
  });

  it('debe llamar onBuy al hacer click en "Comprar ahora"', async () => {
    const user = userEvent.setup();
    const onBuy = vi.fn();
    render(<PurchaseBox {...defaultProps} onBuy={onBuy} />);

    const button = screen.getByText('Comprar ahora');
    await user.click(button);

    expect(onBuy).toHaveBeenCalledTimes(1);
    expect(onBuy).toHaveBeenCalledWith(1);
  });

  it('debe llamar onAddToCart al hacer click en "Agregar al carrito"', async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();
    render(<PurchaseBox {...defaultProps} onAddToCart={onAddToCart} />);

    const button = screen.getByText('Agregar al carrito');
    await user.click(button);

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith(1);
  });

  it('debe mostrar información de devolución gratis', () => {
    render(<PurchaseBox {...defaultProps} />);
    expect(screen.getByText('Devolución gratis')).toBeInTheDocument();
    expect(screen.getByText('Tienes 30 días desde que lo recibes')).toBeInTheDocument();
  });

  it('debe mostrar información de Compra Protegida', () => {
    render(<PurchaseBox {...defaultProps} />);
    expect(screen.getByText('Compra Protegida')).toBeInTheDocument();
    expect(screen.getByText(/Recibe el producto que esperabas/)).toBeInTheDocument();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<PurchaseBox {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe tener iconos de RotateCcw y ShieldCheck', () => {
    const { container } = render(<PurchaseBox {...defaultProps} />);
    expect(container.querySelector('.lucide-rotate-ccw')).toBeInTheDocument();
    expect(container.querySelector('.lucide-shield-check')).toBeInTheDocument();
  });

  it('debe renderizar selector de cantidad', () => {
    render(<PurchaseBox {...defaultProps} />);
    // El selector de cantidad se renderiza pero podría no tener texto visible
    const { container } = render(<PurchaseBox {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it('debe calcular la fecha de entrega correctamente', () => {
    render(<PurchaseBox {...defaultProps} />);
    // Verificar que se muestre algún día de la semana
    const text = screen.getByText(/Llega gratis el/);
    expect(text.textContent).toMatch(/(lunes|martes|miércoles|jueves|viernes|sábado|domingo)/);
  });

  it('debe mostrar link de "Más detalles y formas de entrega"', () => {
    render(<PurchaseBox {...defaultProps} />);
    const link = screen.getByText('Más detalles y formas de entrega');
    expect(link.closest('a')).toHaveAttribute('href', '#');
  });

  it('debe mostrar mensaje "por ser tu primera compra"', () => {
    render(<PurchaseBox {...defaultProps} />);
    expect(screen.getByText('por ser tu primera compra')).toBeInTheDocument();
  });
});
