import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CharacteristicHighlight } from '../CharacteristicHighlight';

describe('CharacteristicHighlight', () => {
  const mockProps = {
    name: 'Pantalla',
    value: '6.7 pulgadas',
    icon: 'Monitor',
  };

  it('debe renderizar correctamente', () => {
    const { container } = render(<CharacteristicHighlight {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('debe mostrar el nombre de la característica', () => {
    render(<CharacteristicHighlight {...mockProps} />);
    expect(screen.getByText(/Pantalla:/)).toBeInTheDocument();
  });

  it('debe mostrar el valor de la característica', () => {
    render(<CharacteristicHighlight {...mockProps} />);
    expect(screen.getByText('6.7 pulgadas')).toBeInTheDocument();
  });

  it('debe renderizar ícono cuando se proporciona', () => {
    const { container } = render(<CharacteristicHighlight {...mockProps} />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<CharacteristicHighlight {...mockProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe tener estructura flex con gap', () => {
    const { container } = render(<CharacteristicHighlight {...mockProps} />);
    expect(container.firstChild).toHaveClass('flex', 'items-center', 'gap-3');
  });

  it('debe tener valor en negrita', () => {
    render(<CharacteristicHighlight {...mockProps} />);
    const value = screen.getByText('6.7 pulgadas');
    expect(value).toHaveClass('font-bold');
  });

  it('debe tener tamaño de texto xs', () => {
    render(<CharacteristicHighlight {...mockProps} />);
    const value = screen.getByText('6.7 pulgadas');
    expect(value).toHaveClass('text-xs');
  });
});
