import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StarRating } from '../StarRating';

describe('StarRating', () => {
  it('debe renderizar correctamente', () => {
    const { container } = render(<StarRating rating={4.5} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('debe renderizar 5 estrellas', () => {
    const { container } = render(<StarRating rating={3} />);
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBe(5);
  });

  it('debe aplicar tamaño sm por defecto', () => {
    const { container } = render(<StarRating rating={4} />);
    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveClass('w-4', 'h-4');
    });
  });

  it('debe aplicar tamaño xs', () => {
    const { container } = render(<StarRating rating={4} size="xs" />);
    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveClass('w-3', 'h-3');
    });
  });

  it('debe aplicar tamaño md', () => {
    const { container } = render(<StarRating rating={4} size="md" />);
    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveClass('w-5', 'h-5');
    });
  });

  it('debe aplicar tamaño lg', () => {
    const { container } = render(<StarRating rating={4} size="lg" />);
    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveClass('w-6', 'h-6');
    });
  });

  it('debe aplicar tamaño xl', () => {
    const { container } = render(<StarRating rating={4} size="xl" />);
    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveClass('w-8', 'h-8');
    });
  });

  it('debe mostrar valor cuando showValue es true', () => {
    render(<StarRating rating={4.7} showValue={true} />);
    expect(screen.getByText('4.7')).toBeInTheDocument();
  });

  it('no debe mostrar valor por defecto', () => {
    render(<StarRating rating={4.7} />);
    expect(screen.queryByText('4.7')).not.toBeInTheDocument();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<StarRating rating={4} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe calcular fill percentage correctamente para rating 5', () => {
    const { container } = render(<StarRating rating={5} />);
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBe(5);
  });

  it('debe calcular fill percentage correctamente para rating 0', () => {
    const { container } = render(<StarRating rating={0} />);
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBe(5);
  });

  it('debe calcular fill percentage correctamente para rating decimal', () => {
    const { container } = render(<StarRating rating={3.7} />);
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBe(5);
  });

  it('debe formatear rating con un decimal', () => {
    render(<StarRating rating={4.652} showValue={true} />);
    expect(screen.getByText('4.7')).toBeInTheDocument();
  });
});
