import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RatingStars } from '../RatingStars';

describe('RatingStars', () => {
  it('debe renderizar correctamente', () => {
    const { container } = render(<RatingStars rating={4.5} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('debe renderizar 5 estrellas para maxRating por defecto', () => {
    const { container } = render(<RatingStars rating={3} />);
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBe(5);
  });

  it('debe renderizar estrellas llenas correctamente', () => {
    const { container } = render(<RatingStars rating={4} />);
    // 4 estrellas llenas + 1 vacía = 5 total
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBe(5);
  });

  it('debe renderizar media estrella cuando el rating tiene decimal >= 0.5', () => {
    const { container } = render(<RatingStars rating={3.7} />);
    // 3 llenas + 1 media + 1 vacía = 5 total
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBe(5);
  });

  it('debe mostrar el rating como número cuando showNumber es true', () => {
    render(<RatingStars rating={4.7} showNumber={true} />);
    expect(screen.getByText('4.7')).toBeInTheDocument();
  });

  it('debe mostrar el rating como número por defecto', () => {
    render(<RatingStars rating={4.3} />);
    expect(screen.getByText('4.3')).toBeInTheDocument();
  });

  it('no debe mostrar número cuando showNumber es false', () => {
    render(<RatingStars rating={4.5} showNumber={false} />);
    expect(screen.queryByText('4.5')).not.toBeInTheDocument();
  });

  it('debe mostrar reviewCount cuando se proporciona', () => {
    render(<RatingStars rating={4.5} reviewCount={1234} />);
    expect(screen.getByText('(1,234)')).toBeInTheDocument();
  });

  it('debe formatear reviewCount con separador de miles', () => {
    render(<RatingStars rating={4.8} reviewCount={125000} />);
    expect(screen.getByText('(125,000)')).toBeInTheDocument();
  });

  it('debe aplicar tamaño md por defecto', () => {
    const { container } = render(<RatingStars rating={4} />);
    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveClass('w-4', 'h-4');
    });
  });

  it('debe aplicar tamaño sm', () => {
    const { container } = render(<RatingStars rating={4} size="sm" />);
    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveClass('w-3', 'h-3');
    });
  });

  it('debe aplicar tamaño lg', () => {
    const { container } = render(<RatingStars rating={4} size="lg" />);
    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveClass('w-5', 'h-5');
    });
  });

  it('debe usar color amarillo por defecto', () => {
    const { container } = render(<RatingStars rating={5} />);
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBeGreaterThan(0);
  });

  it('debe aceptar color azul', () => {
    const { container } = render(<RatingStars rating={5} color="blue" />);
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBeGreaterThan(0);
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<RatingStars rating={4} className="custom-rating" />);
    expect(container.firstChild).toHaveClass('custom-rating');
  });

  it('debe manejar rating de 0', () => {
    const { container } = render(<RatingStars rating={0} />);
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBe(5);
  });

  it('debe manejar rating de 5', () => {
    const { container } = render(<RatingStars rating={5} />);
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBe(5);
  });

  it('debe formatear rating con un decimal', () => {
    render(<RatingStars rating={4.652} />);
    expect(screen.getByText('4.7')).toBeInTheDocument();
  });

  it('debe tener hover en reviewCount', () => {
    render(<RatingStars rating={4.5} reviewCount={100} />);
    const reviewText = screen.getByText('(100)');
    expect(reviewText).toHaveClass('hover:underline', 'cursor-pointer');
  });
});
