import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge', () => {
  it('debe renderizar correctamente con contenido', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('debe aplicar la variante por defecto', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge).toHaveClass('bg-primary');
  });

  it('debe aplicar la variante secondary', () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    const badge = screen.getByText('Secondary');
    expect(badge).toHaveClass('bg-secondary');
  });

  it('debe aplicar la variante destructive', () => {
    render(<Badge variant="destructive">Destructive</Badge>);
    const badge = screen.getByText('Destructive');
    expect(badge).toHaveClass('bg-destructive');
  });

  it('debe aplicar la variante outline', () => {
    render(<Badge variant="outline">Outline</Badge>);
    const badge = screen.getByText('Outline');
    expect(badge).toHaveClass('text-foreground');
  });

  it('debe aplicar className personalizado', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    const badge = screen.getByText('Custom');
    expect(badge).toHaveClass('custom-class');
  });

  it('debe tener clases base comunes', () => {
    render(<Badge>Base Classes</Badge>);
    const badge = screen.getByText('Base Classes');
    expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full', 'text-xs');
  });

  it('debe aceptar props HTML estándar', () => {
    render(<Badge data-testid="test-badge" title="Test Title">Props Test</Badge>);
    const badge = screen.getByTestId('test-badge');
    expect(badge).toHaveAttribute('title', 'Test Title');
  });
});
