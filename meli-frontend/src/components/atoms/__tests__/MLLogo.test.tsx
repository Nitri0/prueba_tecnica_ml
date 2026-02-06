import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MLLogo } from '../MLLogo';

describe('MLLogo', () => {
  it('debe renderizar correctamente', () => {
    const { container } = render(<MLLogo />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
  });

  it('debe aplicar tamaño medium por defecto', () => {
    const { container } = render(<MLLogo />);
    const img = container.querySelector('img');
    expect(img).toHaveClass('h-12');
  });

  it('debe aplicar tamaño small', () => {
    const { container } = render(<MLLogo size="sm" />);
    const img = container.querySelector('img');
    expect(img).toHaveClass('h-8');
  });

  it('debe aplicar tamaño large', () => {
    const { container } = render(<MLLogo size="lg" />);
    const img = container.querySelector('img');
    expect(img).toHaveClass('h-18');
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<MLLogo className="custom-logo" />);
    const img = container.querySelector('img');
    expect(img).toHaveClass('custom-logo');
  });

  it('debe tener src correcto', () => {
    const { container } = render(<MLLogo />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'https://sendu.cl/wp-content/uploads/2024/11/Ico_Mercado-libre.png');
  });

  it('debe tener alt text', () => {
    const { container } = render(<MLLogo />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('alt', 'Mercado Libre');
  });

  it('debe ser una imagen', () => {
    const { container } = render(<MLLogo />);
    const img = container.querySelector('img');
    expect(img?.tagName).toBe('IMG');
  });
});
