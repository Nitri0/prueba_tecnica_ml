import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReviewPhotoCard } from '../ReviewPhotoCard';

describe('ReviewPhotoCard', () => {
  const mockProps = {
    imageUrl: '/test-image.jpg',
    rating: 4.5,
  };

  it('debe renderizar correctamente', () => {
    const { container } = render(<ReviewPhotoCard {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('debe mostrar la imagen', () => {
    render(<ReviewPhotoCard {...mockProps} />);
    const img = screen.getByAltText('Foto de opinión');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test-image.jpg');
  });

  it('debe mostrar el rating', () => {
    render(<ReviewPhotoCard {...mockProps} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('debe mostrar ícono de estrella', () => {
    const { container } = render(<ReviewPhotoCard {...mockProps} />);
    const starIcon = container.querySelector('svg');
    expect(starIcon).toBeInTheDocument();
  });

  it('debe manejar click cuando onClick está definido', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const { container } = render(<ReviewPhotoCard {...mockProps} onClick={handleClick} />);

    await user.click(container.firstChild as Element);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('debe tener cursor pointer', () => {
    const { container } = render(<ReviewPhotoCard {...mockProps} />);
    expect(container.firstChild).toHaveClass('cursor-pointer');
  });

  it('debe tener efecto hover scale', () => {
    const { container } = render(<ReviewPhotoCard {...mockProps} />);
    expect(container.firstChild).toHaveClass('hover:scale-105');
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<ReviewPhotoCard {...mockProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe tener aspecto cuadrado', () => {
    const { container } = render(<ReviewPhotoCard {...mockProps} />);
    expect(container.firstChild).toHaveClass('aspect-square');
  });

  it('debe tener esquinas redondeadas', () => {
    const { container } = render(<ReviewPhotoCard {...mockProps} />);
    expect(container.firstChild).toHaveClass('rounded-lg');
  });

  it('debe tener overlay con gradiente', () => {
    const { container } = render(<ReviewPhotoCard {...mockProps} />);
    const overlay = container.querySelector('.bg-gradient-to-t');
    expect(overlay).toBeInTheDocument();
  });
});
