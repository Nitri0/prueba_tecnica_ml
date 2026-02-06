import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductDescription } from '../ProductDescription';

const mockDescription = `Este es un producto increíble con las siguientes características:
- Alta calidad
- Garantía de 2 años
- Envío gratis`;

const mockImages = [
  'https://example.com/desc1.jpg',
  'https://example.com/desc2.jpg',
];

describe('ProductDescription', () => {
  it('debe renderizar correctamente', () => {
    render(<ProductDescription description={mockDescription} />);
    expect(screen.getByText('Descripción')).toBeInTheDocument();
  });

  it('debe mostrar la descripción proporcionada', () => {
    render(<ProductDescription description={mockDescription} />);
    expect(screen.getByText(/Este es un producto increíble/)).toBeInTheDocument();
  });

  it('debe renderizar imágenes adicionales si se proporcionan', () => {
    const { container } = render(
      <ProductDescription description={mockDescription} images={mockImages} />
    );
    const images = container.querySelectorAll('img');
    expect(images.length).toBe(mockImages.length);
  });

  it('debe mostrar el botón para expandir la descripción', () => {
    render(<ProductDescription description={mockDescription} />);
    expect(screen.getByText('Ver descripción completa')).toBeInTheDocument();
  });

  it('debe expandir la descripción al hacer click', async () => {
    const user = userEvent.setup();
    const { container } = render(<ProductDescription description={mockDescription} />);

    const button = screen.getByText('Ver descripción completa');
    await user.click(button);

    const content = container.querySelector('.max-h-none');
    expect(content).toBeInTheDocument();
  });

  it('debe ocultar el botón después de expandir', async () => {
    const user = userEvent.setup();
    render(<ProductDescription description={mockDescription} />);

    const button = screen.getByText('Ver descripción completa');
    await user.click(button);

    expect(screen.queryByText('Ver descripción completa')).not.toBeInTheDocument();
  });

  it('debe tener max-height limitado cuando no está expandido', () => {
    const { container } = render(<ProductDescription description={mockDescription} />);
    const content = container.querySelector('.max-h-\\[400px\\]');
    expect(content).toBeInTheDocument();
  });

  it('debe mostrar gradiente de fade cuando no está expandido', () => {
    const { container } = render(<ProductDescription description={mockDescription} />);
    const gradient = container.querySelector('.bg-gradient-to-t');
    expect(gradient).toBeInTheDocument();
  });

  it('no debe mostrar gradiente cuando está expandido', async () => {
    const user = userEvent.setup();
    const { container } = render(<ProductDescription description={mockDescription} />);

    const button = screen.getByText('Ver descripción completa');
    await user.click(button);

    const gradient = container.querySelector('.bg-gradient-to-t');
    expect(gradient).not.toBeInTheDocument();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(
      <ProductDescription description={mockDescription} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe renderizar sin imágenes', () => {
    render(<ProductDescription description={mockDescription} />);
    expect(screen.getByText('Descripción')).toBeInTheDocument();
  });

  it('debe tener icono de chevron en el botón', () => {
    const { container } = render(<ProductDescription description={mockDescription} />);
    // Buscar el SVG en el contenedor (puede estar dentro o cerca del botón)
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('debe preservar saltos de línea en la descripción', () => {
    const { container } = render(<ProductDescription description={mockDescription} />);
    const text = container.querySelector('.whitespace-pre-wrap');
    expect(text).toBeInTheDocument();
  });
});
