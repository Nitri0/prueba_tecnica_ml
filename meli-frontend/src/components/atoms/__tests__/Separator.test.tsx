import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Separator } from '../Separator';

describe('Separator', () => {
  it('debe renderizar correctamente', () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector('[role="separator"]');
    expect(separator).toBeInTheDocument();
  });

  it('debe aplicar orientación horizontal por defecto', () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector('[role="separator"]');
    expect(separator).toHaveClass('w-full', 'h-px');
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('debe aplicar orientación vertical', () => {
    const { container } = render(<Separator orientation="vertical" />);
    const separator = container.querySelector('[role="separator"]');
    expect(separator).toHaveClass('h-full', 'w-px');
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('debe tener color de fondo gris border', () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector('[role="separator"]');
    expect(separator).toHaveClass('bg-ml-gray-border');
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<Separator className="custom-class" />);
    const separator = container.querySelector('[role="separator"]');
    expect(separator).toHaveClass('custom-class');
  });

  it('debe tener role separator para accesibilidad', () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector('[role="separator"]');
    expect(separator).toHaveAttribute('role', 'separator');
  });
});
