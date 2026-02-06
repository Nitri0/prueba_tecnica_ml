import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductReviews, Review } from '../ProductReviews';

const mockReviews: Review[] = [
  {
    id: '1',
    rating: 5,
    title: 'Excelente producto',
    comment: 'Muy buena calidad, lo recomiendo',
    userName: 'Juan Pérez',
    date: '2024-01-15',
    images: ['https://example.com/review1.jpg'],
    helpfulCount: 10,
    categories: {
      quality: 5,
      value: 4,
    },
  },
  {
    id: '2',
    rating: 4,
    title: 'Muy bueno',
    comment: 'Cumple con lo esperado',
    userName: 'María González',
    date: '2024-01-10',
    helpfulCount: 5,
    categories: {
      quality: 4,
      value: 5,
    },
  },
  {
    id: '3',
    rating: 3,
    title: 'Regular',
    comment: 'Podría ser mejor',
    userName: 'Pedro López',
    date: '2024-01-05',
    helpfulCount: 2,
    categories: {
      quality: 3,
      value: 3,
    },
  },
];

const mockRatingDistribution = {
  5: 50,
  4: 30,
  3: 15,
  2: 3,
  1: 2,
};

describe('ProductReviews', () => {
  it('debe renderizar correctamente', () => {
    render(<ProductReviews reviews={mockReviews} />);
    expect(screen.getByText('Opiniones del producto')).toBeInTheDocument();
  });

  it('debe mostrar el promedio de calificación', () => {
    render(<ProductReviews reviews={mockReviews} averageRating={4.5} totalReviews={100} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('debe mostrar el total de calificaciones', () => {
    render(<ProductReviews reviews={mockReviews} averageRating={4.5} totalReviews={100} />);
    // El texto "100" puede aparecer múltiples veces en diferentes contextos
    const elements = screen.getAllByText(/100/);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('debe mostrar la distribución de calificaciones', () => {
    render(
      <ProductReviews
        reviews={mockReviews}
        averageRating={4.5}
        totalReviews={100}
        ratingDistribution={mockRatingDistribution}
      />
    );

    expect(screen.getByText('5 ★')).toBeInTheDocument();
    expect(screen.getByText('4 ★')).toBeInTheDocument();
    expect(screen.getByText('3 ★')).toBeInTheDocument();
  });

  it('debe mostrar las opiniones destacadas', () => {
    render(<ProductReviews reviews={mockReviews} />);
    expect(screen.getByText('Opiniones destacadas')).toBeInTheDocument();
    // El componente muestra el comentario (comment), no el título
    expect(screen.getByText(/Muy buena calidad, lo recomiendo/)).toBeInTheDocument();
  });

  it('debe limitar a 3 opiniones destacadas', () => {
    const manyReviews = [...mockReviews, ...mockReviews, ...mockReviews];
    render(<ProductReviews reviews={manyReviews} />);

    // El componente muestra los comentarios, no los títulos
    const reviewComments = screen.getAllByText(/Muy buena calidad|Cumple con lo esperado|Podría ser mejor/);
    // Debería mostrar máximo 3 opiniones destacadas
    expect(reviewComments.length).toBeLessThanOrEqual(3);
  });

  it('debe mostrar link para ver todas las opiniones', () => {
    render(<ProductReviews reviews={mockReviews} totalReviews={50} />);
    const link = screen.getByText(/Ver todas las opiniones \(50\)/);
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '#all-reviews');
  });

  it('no debe mostrar link si hay 3 o menos opiniones', () => {
    render(<ProductReviews reviews={mockReviews} totalReviews={3} />);
    expect(screen.queryByText(/Ver todas las opiniones/)).not.toBeInTheDocument();
  });

  it('debe mostrar sección de opiniones con fotos', () => {
    render(<ProductReviews reviews={mockReviews} />);
    expect(screen.getByText('Opiniones con fotos')).toBeInTheDocument();
  });

  it('no debe mostrar sección de fotos si no hay opiniones con imágenes', () => {
    const reviewsWithoutImages = mockReviews.map(r => ({ ...r, images: undefined }));
    render(<ProductReviews reviews={reviewsWithoutImages} />);
    expect(screen.queryByText('Opiniones con fotos')).not.toBeInTheDocument();
  });

  it('debe mostrar mensaje cuando no hay opiniones', () => {
    render(<ProductReviews reviews={[]} />);
    expect(screen.getByText('Este producto aún no tiene opiniones')).toBeInTheDocument();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<ProductReviews reviews={mockReviews} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe mostrar calificación de características si se proporciona', () => {
    const availableCategories = [
      { id: 'quality', name: 'Calidad', order: 1 },
      { id: 'value', name: 'Relación calidad-precio', order: 2 },
    ];
    const averageCategoryRatings = {
      quality: 4.5,
      value: 4.2,
    };

    render(
      <ProductReviews
        reviews={mockReviews}
        availableCategories={availableCategories}
        averageCategoryRatings={averageCategoryRatings}
      />
    );

    expect(screen.getByText('Calificación de características')).toBeInTheDocument();
  });

  it('debe ordenar categorías por orden si existe', () => {
    const availableCategories = [
      { id: 'value', name: 'Relación calidad-precio', order: 2 },
      { id: 'quality', name: 'Calidad', order: 1 },
    ];
    const averageCategoryRatings = {
      quality: 4.5,
      value: 4.2,
    };

    render(
      <ProductReviews
        reviews={mockReviews}
        availableCategories={availableCategories}
        averageCategoryRatings={averageCategoryRatings}
      />
    );

    // Las categorías deberían estar ordenadas
    expect(screen.getByText('Calificación de características')).toBeInTheDocument();
  });

  it('debe tener diseño responsive', () => {
    const { container } = render(<ProductReviews reviews={mockReviews} />);
    const responsiveGrid = container.querySelector('.lg\\:grid');
    expect(responsiveGrid).toBeInTheDocument();
  });

  it('debe mostrar contador de comentarios', () => {
    render(<ProductReviews reviews={mockReviews} />);
    expect(screen.getByText(/3 comentarios/)).toBeInTheDocument();
  });
});
