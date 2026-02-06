import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductGallery } from '../ProductGallery';

describe('ProductGallery', () => {
  const mockImages = [
    '/image1.jpg',
    '/image2.jpg',
    '/image3.jpg',
  ];

  const mockProps = {
    images: mockImages,
    productName: 'Producto de prueba',
  };

  it('debe renderizar correctamente', () => {
    const { container } = render(<ProductGallery {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('debe mostrar la primera imagen por defecto', () => {
    render(<ProductGallery {...mockProps} />);
    const images = screen.getAllByAltText('Producto de prueba');
    const hasFirstImage = images.some(img => img.getAttribute('src') === '/image1.jpg');
    expect(hasFirstImage).toBe(true);
  });

  it('debe mostrar thumbnails en desktop', () => {
    render(<ProductGallery {...mockProps} />);
    const thumbnails = screen.getAllByRole('button').filter(btn =>
      btn.querySelector('img')
    );
    expect(thumbnails.length).toBeGreaterThanOrEqual(3);
  });

  it('debe aplicar borde azul al thumbnail seleccionado', () => {
    render(<ProductGallery {...mockProps} />);

    const thumbnails = screen.getAllByRole('button').filter(btn =>
      btn.querySelector('img')
    );

    expect(thumbnails[0]).toHaveClass('border-ml-blue');
  });

  it('debe mostrar contador de imágenes en mobile', () => {
    render(<ProductGallery {...mockProps} />);
    expect(screen.getByText('1/3')).toBeInTheDocument();
  });

  it('debe mostrar botones de navegación en mobile cuando hay múltiples imágenes', () => {
    render(<ProductGallery {...mockProps} />);

    const prevButton = screen.getByLabelText('Imagen anterior');
    const nextButton = screen.getByLabelText('Siguiente imagen');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('debe mostrar indicadores de puntos en mobile', () => {
    const { container } = render(<ProductGallery {...mockProps} />);

    const indicators = container.querySelectorAll('[aria-label^="Ir a imagen"]');
    expect(indicators.length).toBe(3);
  });

  it('debe navegar a siguiente imagen', async () => {
    const user = userEvent.setup();
    render(<ProductGallery {...mockProps} />);

    const nextButtons = screen.getAllByLabelText('Siguiente imagen');
    await user.click(nextButtons[0]);

    const mainImages = screen.getAllByAltText('Producto de prueba');
    const hasImage2 = mainImages.some(img => img.getAttribute('src') === '/image2.jpg');
    expect(hasImage2).toBe(true);
  });

  it('debe navegar a imagen anterior', async () => {
    const user = userEvent.setup();
    render(<ProductGallery {...mockProps} />);

    const prevButtons = screen.getAllByLabelText('Imagen anterior');
    await user.click(prevButtons[0]);

    // Debería ir a la última imagen (comportamiento circular)
    const mainImages = screen.getAllByAltText('Producto de prueba');
    const hasImage3 = mainImages.some(img => img.getAttribute('src') === '/image3.jpg');
    expect(hasImage3).toBe(true);
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<ProductGallery {...mockProps} className="custom-gallery" />);
    const gallery = container.querySelector('.custom-gallery');
    expect(gallery).toBeInTheDocument();
  });

  it('debe renderizar con una sola imagen', () => {
    render(<ProductGallery images={['/single.jpg']} productName="Single" />);
    const images = screen.getAllByAltText('Single');
    expect(images.length).toBeGreaterThan(0);
  });

  it('debe tener alt correcto en thumbnails', () => {
    render(<ProductGallery {...mockProps} />);

    expect(screen.getByAltText('Producto de prueba - vista 1')).toBeInTheDocument();
    expect(screen.getByAltText('Producto de prueba - vista 2')).toBeInTheDocument();
    expect(screen.getByAltText('Producto de prueba - vista 3')).toBeInTheDocument();
  });

  it('debe tener layout hidden en mobile para desktop', () => {
    const { container } = render(<ProductGallery {...mockProps} />);
    const desktopLayout = container.querySelector('.hidden.lg\\:flex');
    expect(desktopLayout).toBeInTheDocument();
  });

  it('debe tener layout hidden en desktop para mobile', () => {
    const { container } = render(<ProductGallery {...mockProps} />);
    const mobileLayout = container.querySelector('.lg\\:hidden');
    expect(mobileLayout).toBeInTheDocument();
  });

  it('debe cambiar imagen al hacer click en thumbnail', async () => {
    const user = userEvent.setup();
    render(<ProductGallery {...mockProps} />);

    const thumbnails = screen.getAllByRole('button').filter(btn =>
      btn.querySelector('img')
    );

    await user.click(thumbnails[1]);

    const mainImages = screen.getAllByAltText('Producto de prueba');
    // Verificar que al menos una imagen tenga src de image2
    const hasImage2 = mainImages.some(img => img.getAttribute('src') === '/image2.jpg');
    expect(hasImage2).toBe(true);
  });
});
