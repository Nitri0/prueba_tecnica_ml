import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from '../Label';

describe('Label', () => {
  it('debe renderizar correctamente', () => {
    render(<Label>Label text</Label>);
    expect(screen.getByText('Label text')).toBeInTheDocument();
  });

  it('debe aplicar clases base', () => {
    render(<Label>Label</Label>);
    const label = screen.getByText('Label');
    expect(label).toHaveClass('text-sm', 'font-medium', 'leading-none');
  });

  it('debe aplicar className personalizado', () => {
    render(<Label className="custom-label">Label</Label>);
    const label = screen.getByText('Label');
    expect(label).toHaveClass('custom-label');
  });

  it('debe aceptar htmlFor attribute', () => {
    render(<Label htmlFor="input-id">Label</Label>);
    const label = screen.getByText('Label');
    expect(label).toHaveAttribute('for', 'input-id');
  });

  it('debe tener estilos de peer-disabled', () => {
    render(<Label>Label</Label>);
    const label = screen.getByText('Label');
    expect(label).toHaveClass('peer-disabled:cursor-not-allowed', 'peer-disabled:opacity-70');
  });

  it('debe renderizar con múltiples children', () => {
    render(
      <Label>
        Label <span>with extra</span>
      </Label>
    );
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('with extra')).toBeInTheDocument();
  });
});
