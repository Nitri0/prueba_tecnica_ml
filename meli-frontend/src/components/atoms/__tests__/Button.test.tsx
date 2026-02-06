import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  it('debe renderizar correctamente con contenido', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('debe aplicar la variante default por defecto', () => {
    render(<Button>Default</Button>);
    const button = screen.getByText('Default');
    expect(button).toHaveClass('bg-primary');
  });

  it('debe aplicar la variante destructive', () => {
    render(<Button variant="destructive">Destructive</Button>);
    const button = screen.getByText('Destructive');
    expect(button).toHaveClass('bg-destructive');
  });

  it('debe aplicar la variante outline', () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByText('Outline');
    expect(button).toHaveClass('border', 'border-input');
  });

  it('debe aplicar la variante secondary', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByText('Secondary');
    expect(button).toHaveClass('bg-secondary');
  });

  it('debe aplicar la variante ghost', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByText('Ghost');
    expect(button).toHaveClass('hover:bg-accent');
  });

  it('debe aplicar la variante link', () => {
    render(<Button variant="link">Link</Button>);
    const button = screen.getByText('Link');
    expect(button).toHaveClass('text-primary', 'underline-offset-4');
  });

  it('debe aplicar tamaño default por defecto', () => {
    render(<Button>Default Size</Button>);
    const button = screen.getByText('Default Size');
    expect(button).toHaveClass('h-10', 'px-4', 'py-2');
  });

  it('debe aplicar tamaño small', () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByText('Small');
    expect(button).toHaveClass('h-9', 'px-3');
  });

  it('debe aplicar tamaño large', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByText('Large');
    expect(button).toHaveClass('h-11', 'px-8');
  });

  it('debe aplicar tamaño icon', () => {
    render(<Button size="icon">🔍</Button>);
    const button = screen.getByText('🔍');
    expect(button).toHaveClass('h-10', 'w-10');
  });

  it('debe aplicar className personalizado', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByText('Custom');
    expect(button).toHaveClass('custom-class');
  });

  it('debe manejar evento onClick', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('debe estar deshabilitado cuando disabled es true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });

  it('debe tener type button por defecto', () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button');
    expect(button.tagName).toBe('BUTTON');
  });

  it('debe aceptar type submit', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByText('Submit');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('debe tener clases base comunes', () => {
    render(<Button>Base Classes</Button>);
    const button = screen.getByText('Base Classes');
    expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center', 'rounded-md');
  });
});
