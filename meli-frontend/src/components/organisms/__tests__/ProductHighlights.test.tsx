import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductHighlights } from '../ProductHighlights';

const mockHighlights = [
  'Pantalla AMOLED de 6.5 pulgadas',
  'Procesador Snapdragon 888',
  '8GB de RAM',
  'Cámara principal de 108MP',
];

describe('ProductHighlights', () => {
  it('debe renderizar correctamente con highlights', () => {
    render(<ProductHighlights highlights={mockHighlights} />);
    expect(screen.getByText('Lo que tienes que saber de este producto')).toBeInTheDocument();
  });

  it('debe mostrar todos los highlights proporcionados', () => {
    render(<ProductHighlights highlights={mockHighlights} />);
    expect(screen.getByText('Pantalla AMOLED de 6.5 pulgadas')).toBeInTheDocument();
    expect(screen.getByText('Procesador Snapdragon 888')).toBeInTheDocument();
    expect(screen.getByText('8GB de RAM')).toBeInTheDocument();
    expect(screen.getByText('Cámara principal de 108MP')).toBeInTheDocument();
  });

  it('debe usar título personalizado', () => {
    render(<ProductHighlights highlights={mockHighlights} title="Características principales" />);
    expect(screen.getByText('Características principales')).toBeInTheDocument();
  });

  it('no debe renderizar nada si no hay highlights', () => {
    const { container } = render(<ProductHighlights highlights={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(
      <ProductHighlights highlights={mockHighlights} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe renderizar highlights en una lista', () => {
    const { container } = render(<ProductHighlights highlights={mockHighlights} />);
    const list = container.querySelector('ul');
    expect(list).toBeInTheDocument();
  });

  it('debe renderizar cada highlight como un list item', () => {
    const { container } = render(<ProductHighlights highlights={mockHighlights} />);
    const listItems = container.querySelectorAll('li');
    expect(listItems.length).toBe(mockHighlights.length);
  });

  it('debe tener bullet point para cada highlight', () => {
    render(<ProductHighlights highlights={mockHighlights} />);
    const { container } = render(<ProductHighlights highlights={mockHighlights} />);
    const bullets = Array.from(container.querySelectorAll('li span')).filter(
      span => span.textContent === '•'
    );
    expect(bullets.length).toBe(mockHighlights.length);
  });

  it('debe tener un solo highlight', () => {
    const singleHighlight = ['Solo una característica'];
    render(<ProductHighlights highlights={singleHighlight} />);
    expect(screen.getByText('Solo una característica')).toBeInTheDocument();
  });
});
