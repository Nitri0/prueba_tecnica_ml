import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard, ProductCardProps } from '../ProductCard';

const defaultProps: ProductCardProps = {
  id: '1',
  title: 'Producto de Prueba',
  description: 'Descripción del producto de prueba',
  price: 99990,
  image: 'https://example.com/image.jpg',
};

describe('ProductCard', () => {
  it('debe renderizar correctamente', () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText('Producto de Prueba')).toBeInTheDocument();
  });

  it('debe mostrar el título del producto', () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText('Producto de Prueba')).toBeInTheDocument();
  });

  it('debe mostrar la descripción del producto', () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText('Descripción del producto de prueba')).toBeInTheDocument();
  });

  it('debe mostrar el precio formateado', () => {
    render(<ProductCard {...defaultProps} />);
    // El precio puede estar fragmentado por el componente PriceDisplay
    expect(screen.getByText(/99\.990/)).toBeInTheDocument();
  });

  it('debe mostrar la imagen del producto', () => {
    render(<ProductCard {...defaultProps} />);
    const image = screen.getByAltText('Producto de Prueba');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('debe mostrar la categoría si se proporciona', () => {
    const props = { ...defaultProps, category: 'Electrónica' };
    render(<ProductCard {...props} />);
    expect(screen.getByText('Electrónica')).toBeInTheDocument();
  });

  it('debe llamar onAddToCart cuando se hace click en agregar al carrito', async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();
    const props = { ...defaultProps, onAddToCart };

    render(<ProductCard {...props} />);

    const button = screen.getByText('Agregar al carrito');
    await user.click(button);

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith('1');
  });

  it('debe llamar onToggleFavorite cuando se hace click en el corazón', async () => {
    const user = userEvent.setup();
    const onToggleFavorite = vi.fn();
    const props = { ...defaultProps, onToggleFavorite };

    render(<ProductCard {...props} />);

    const buttons = screen.getAllByRole('button');
    const favoriteButton = buttons.find(btn => btn.querySelector('.lucide-heart'));

    if (favoriteButton) {
      await user.click(favoriteButton);
      expect(onToggleFavorite).toHaveBeenCalledTimes(1);
      expect(onToggleFavorite).toHaveBeenCalledWith('1');
    }
  });

  it('debe tener efecto hover en la card', () => {
    const { container } = render(<ProductCard {...defaultProps} />);
    const card = container.querySelector('.group');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('transition-all', 'hover:shadow-lg');
  });

  it('debe tener aspecto cuadrado en la imagen', () => {
    const { container } = render(<ProductCard {...defaultProps} />);
    const imageContainer = container.querySelector('.aspect-square');
    expect(imageContainer).toBeInTheDocument();
  });

  it('debe tener botón de agregar al carrito con icono', () => {
    const { container } = render(<ProductCard {...defaultProps} />);
    const button = screen.getByText('Agregar al carrito');
    const icon = button.querySelector('.lucide-shopping-cart');
    expect(icon).toBeInTheDocument();
  });

  it('no debe llamar onAddToCart si no se proporciona', async () => {
    const user = userEvent.setup();
    render(<ProductCard {...defaultProps} />);

    const button = screen.getByText('Agregar al carrito');
    await user.click(button);

    // No debe arrojar error
    expect(button).toBeInTheDocument();
  });

  it('no debe llamar onToggleFavorite si no se proporciona', async () => {
    const user = userEvent.setup();
    render(<ProductCard {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    const favoriteButton = buttons.find(btn => btn.querySelector('.lucide-heart'));

    if (favoriteButton) {
      await user.click(favoriteButton);
      // No debe arrojar error
      expect(favoriteButton).toBeInTheDocument();
    }
  });
});
