import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { StarIcon } from '../StarIcon';

describe('StarIcon', () => {
  it('debe renderizar sin errores', () => {
    const { container } = render(<StarIcon />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('debe aplicar el tamaño correcto por defecto (sm)', () => {
    const { container } = render(<StarIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('w-4', 'h-4');
  });

  it('debe aplicar tamaños personalizados', () => {
    const sizes = {
      xs: ['w-3', 'h-3'],
      sm: ['w-4', 'h-4'],
      md: ['w-5', 'h-5'],
      lg: ['w-6', 'h-6'],
      xl: ['w-8', 'h-8'],
    };

    Object.entries(sizes).forEach(([size, classes]) => {
      const { container } = render(<StarIcon size={size as any} />);
      const svg = container.querySelector('svg');
      classes.forEach(className => {
        expect(svg).toHaveClass(className);
      });
    });
  });

  it('debe mostrar estrella vacía cuando fillPercentage es 0', () => {
    const { container } = render(<StarIcon fillPercentage={0} />);
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('fill', 'none');
  });

  it('debe mostrar estrella llena cuando fillPercentage es 100', () => {
    const { container } = render(<StarIcon fillPercentage={100} />);
    const path = container.querySelector('path');
    // Verifica que use el gradiente URL
    expect(path?.getAttribute('fill')).toContain('url(#star-gradient-');
  });

  it('debe mostrar estrella parcialmente llena con fillPercentage intermedio', () => {
    const { container } = render(<StarIcon fillPercentage={50} />);
    const stop = container.querySelector('stop');
    expect(stop).toHaveAttribute('offset', '50%');
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<StarIcon className="custom-class" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
  });

  it('debe tener stroke azul siempre', () => {
    const { container } = render(<StarIcon />);
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('stroke', 'rgb(52, 131, 250)');
    expect(path).toHaveAttribute('stroke-width', '1.5');
  });

  it('debe generar ID de gradiente único', () => {
    const { container: container1 } = render(<StarIcon fillPercentage={50} />);
    const { container: container2 } = render(<StarIcon fillPercentage={50} />);

    const gradient1 = container1.querySelector('linearGradient');
    const gradient2 = container2.querySelector('linearGradient');

    expect(gradient1?.id).not.toBe(gradient2?.id);
  });
});
