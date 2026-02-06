import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductImage } from '../ProductImage';

describe('ProductImage', () => {
  const mockProps = {
    src: '/test-product.jpg',
    alt: 'Producto de prueba',
  };

  it('debe renderizar correctamente', () => {
    const { container } = render(<ProductImage {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('debe mostrar la imagen', () => {
    render(<ProductImage {...mockProps} />);
    const img = screen.getByAltText('Producto de prueba');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test-product.jpg');
  });

  it('debe manejar click cuando onClick está definido', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const { container } = render(<ProductImage {...mockProps} onClick={handleClick} />);

    await user.click(container.firstChild as Element);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('debe mostrar ícono de zoom por defecto', async () => {
    const { container } = render(<ProductImage {...mockProps} />);

    // Simular carga de imagen
    const img = screen.getByAltText('Producto de prueba');
    img.dispatchEvent(new Event('load'));

    await waitFor(() => {
      const zoomIcon = container.querySelector('svg');
      expect(zoomIcon).toBeInTheDocument();
    });
  });

  it('no debe mostrar ícono de zoom cuando showZoomIcon es false', () => {
    render(<ProductImage {...mockProps} showZoomIcon={false} />);

    // Simular carga de imagen
    const img = screen.getByAltText('Producto de prueba');
    img.dispatchEvent(new Event('load'));

    // No debería haber ícono de zoom
    const zoomIcon = screen.queryByText('ZoomIn');
    expect(zoomIcon).not.toBeInTheDocument();
  });

  it('debe mostrar loader mientras carga', () => {
    const { container } = render(<ProductImage {...mockProps} />);
    const loader = container.querySelector('.animate-pulse');
    expect(loader).toBeInTheDocument();
  });

  it('debe ocultar loader después de cargar', async () => {
    const { container } = render(<ProductImage {...mockProps} />);

    const img = screen.getByAltText('Producto de prueba');
    img.dispatchEvent(new Event('load'));

    await waitFor(() => {
      const loader = container.querySelector('.animate-pulse');
      expect(loader).not.toBeInTheDocument();
    });
  });

  it('debe tener cursor pointer', () => {
    const { container } = render(<ProductImage {...mockProps} />);
    expect(container.firstChild).toHaveClass('cursor-pointer');
  });

  it('debe tener efecto hover scale', () => {
    render(<ProductImage {...mockProps} />);
    const img = screen.getByAltText('Producto de prueba');
    expect(img).toHaveClass('group-hover:scale-105');
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<ProductImage {...mockProps} className="custom-image" />);
    expect(container.firstChild).toHaveClass('custom-image');
  });

  it('debe tener fondo blanco', () => {
    const { container } = render(<ProductImage {...mockProps} />);
    expect(container.firstChild).toHaveClass('bg-white');
  });

  it('debe tener esquinas redondeadas', () => {
    const { container } = render(<ProductImage {...mockProps} />);
    expect(container.firstChild).toHaveClass('rounded-lg');
  });
});
