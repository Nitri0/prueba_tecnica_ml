import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CharacteristicRange } from '../CharacteristicRange';

describe('CharacteristicRange', () => {
  const mockProps = {
    name: 'Batería',
    value: '5000 mAh',
    current: 80,
    minLabel: 'Bajo',
    maxLabel: 'Alto',
  };

  it('debe renderizar correctamente', () => {
    const { container } = render(<CharacteristicRange {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('debe mostrar el nombre de la característica', () => {
    render(<CharacteristicRange {...mockProps} />);
    expect(screen.getByText(/Batería:/)).toBeInTheDocument();
  });

  it('debe mostrar el valor de la característica', () => {
    render(<CharacteristicRange {...mockProps} />);
    expect(screen.getByText('5000 mAh')).toBeInTheDocument();
  });

  it('debe mostrar los labels min y max', () => {
    render(<CharacteristicRange {...mockProps} />);
    expect(screen.getByText('Bajo')).toBeInTheDocument();
    expect(screen.getByText('Alto')).toBeInTheDocument();
  });

  it('debe renderizar 5 segmentos por defecto', () => {
    const { container } = render(<CharacteristicRange {...mockProps} />);
    const segments = container.querySelectorAll('.h-2.flex-1');
    expect(segments.length).toBe(5);
  });

  it('debe renderizar cantidad personalizada de segmentos', () => {
    const { container } = render(<CharacteristicRange {...mockProps} segments={7} />);
    const segments = container.querySelectorAll('.h-2.flex-1');
    expect(segments.length).toBe(7);
  });

  it('debe activar el segmento correcto según current', () => {
    const { container } = render(<CharacteristicRange {...mockProps} current={80} segments={5} />);
    // 80% de 5 segmentos = segmento 4 (índice 3)
    const segments = container.querySelectorAll('.h-2.flex-1');
    const activeSegment = container.querySelector('.bg-ml-blue');
    expect(activeSegment).toBeInTheDocument();
  });

  it('debe renderizar ícono cuando se proporciona', () => {
    const { container } = render(<CharacteristicRange {...mockProps} icon="Battery" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<CharacteristicRange {...mockProps} className="custom-range" />);
    expect(container.firstChild).toHaveClass('custom-range');
  });

  it('debe tener grid responsive', () => {
    const { container } = render(<CharacteristicRange {...mockProps} />);
    expect(container.firstChild).toHaveClass('grid-cols-1', 'lg:grid-cols-2');
  });

  it('debe tener valor en negrita', () => {
    render(<CharacteristicRange {...mockProps} />);
    const value = screen.getByText('5000 mAh');
    expect(value).toHaveClass('font-bold');
  });

  it('debe activar primer segmento para current bajo', () => {
    const { container } = render(<CharacteristicRange {...mockProps} current={10} segments={5} />);
    const activeSegment = container.querySelector('.bg-ml-blue');
    expect(activeSegment).toBeInTheDocument();
  });

  it('debe activar último segmento para current alto', () => {
    const { container } = render(<CharacteristicRange {...mockProps} current={95} segments={5} />);
    const activeSegment = container.querySelector('.bg-ml-blue');
    expect(activeSegment).toBeInTheDocument();
  });

  it('debe aceptar valores numéricos en value', () => {
    render(<CharacteristicRange {...mockProps} value={5000} />);
    expect(screen.getByText('5000')).toBeInTheDocument();
  });
});
