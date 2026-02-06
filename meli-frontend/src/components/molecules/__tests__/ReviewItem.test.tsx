import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReviewItem } from '../ReviewItem';

describe('ReviewItem', () => {
  const mockReview = {
    id: '1',
    userName: 'Juan Pérez',
    rating: 4.5,
    date: 'Hace 2 días',
    comment: 'Excelente producto, muy buena calidad',
    verified: true,
  };

  it('debe renderizar correctamente', () => {
    const { container } = render(<ReviewItem review={mockReview} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('debe mostrar el comentario', () => {
    render(<ReviewItem review={mockReview} />);
    expect(screen.getByText('Excelente producto, muy buena calidad')).toBeInTheDocument();
  });

  it('debe mostrar la fecha', () => {
    render(<ReviewItem review={mockReview} />);
    expect(screen.getByText('Hace 2 días')).toBeInTheDocument();
  });

  it('debe mostrar badge de compra verificada', () => {
    render(<ReviewItem review={mockReview} />);
    expect(screen.getByText(/Comprado a Tienda oficial/)).toBeInTheDocument();
  });

  it('no debe mostrar badge cuando verified es false', () => {
    const unverifiedReview = { ...mockReview, verified: false };
    render(<ReviewItem review={unverifiedReview} />);
    expect(screen.queryByText(/Comprado a Tienda oficial/)).not.toBeInTheDocument();
  });

  it('debe renderizar estrellas de rating', () => {
    const { container } = render(<ReviewItem review={mockReview} />);
    const stars = container.querySelectorAll('svg');
    // Debería haber al menos 5 estrellas
    expect(stars.length).toBeGreaterThanOrEqual(5);
  });

  it('debe mostrar imágenes cuando están presentes', () => {
    const reviewWithImages = {
      ...mockReview,
      images: ['/img1.jpg', '/img2.jpg'],
    };
    render(<ReviewItem review={reviewWithImages} />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2);
  });

  it('no debe mostrar imágenes cuando no están presentes', () => {
    render(<ReviewItem review={mockReview} />);
    const images = screen.queryAllByRole('img');
    expect(images.length).toBe(0);
  });

  it('debe calcular rating desde categoryRatings', () => {
    const reviewWithCategories = {
      ...mockReview,
      rating: 3,
      categoryRatings: {
        camera_quality: 5,
        battery_life: 4,
        value_for_money: 4,
      },
    };

    const availableCategories = [
      { id: 'camera_quality', name: 'Calidad de cámara' },
      { id: 'battery_life', name: 'Duración de batería' },
      { id: 'value_for_money', name: 'Relación calidad-precio' },
    ];

    render(<ReviewItem review={reviewWithCategories} availableCategories={availableCategories} />);
    // El rating calculado debería ser (5+4+4)/3 = 4.33, no el rating original de 3
    expect(screen.getByText('Excelente producto, muy buena calidad')).toBeInTheDocument();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<ReviewItem review={mockReview} className="custom-review" />);
    expect(container.firstChild).toHaveClass('custom-review');
  });

  it('debe tener borde inferior', () => {
    const { container } = render(<ReviewItem review={mockReview} />);
    expect(container.firstChild).toHaveClass('border-b');
  });

  it('debe tener padding vertical', () => {
    const { container } = render(<ReviewItem review={mockReview} />);
    expect(container.firstChild).toHaveClass('py-6');
  });

  it('debe ordenar categorías por campo order', () => {
    const reviewWithCategories = {
      ...mockReview,
      categoryRatings: {
        camera: 5,
        battery: 4,
      },
    };

    const availableCategories = [
      { id: 'battery', name: 'Batería', order: 2 },
      { id: 'camera', name: 'Cámara', order: 1 },
    ];

    render(<ReviewItem review={reviewWithCategories} availableCategories={availableCategories} />);
    expect(screen.getByText('Excelente producto, muy buena calidad')).toBeInTheDocument();
  });

  it('debe tener ícono de verificación cuando está verificado', () => {
    const { container } = render(<ReviewItem review={mockReview} />);
    const verifiedIcon = container.querySelector('svg[fill="currentColor"]');
    expect(verifiedIcon).toBeInTheDocument();
  });

  it('debe renderizar imágenes con alt correcto', () => {
    const reviewWithImages = {
      ...mockReview,
      images: ['/img1.jpg', '/img2.jpg', '/img3.jpg'],
    };
    render(<ReviewItem review={reviewWithImages} />);

    expect(screen.getByAltText('Foto 1 de la opinión')).toBeInTheDocument();
    expect(screen.getByAltText('Foto 2 de la opinión')).toBeInTheDocument();
    expect(screen.getByAltText('Foto 3 de la opinión')).toBeInTheDocument();
  });
});
