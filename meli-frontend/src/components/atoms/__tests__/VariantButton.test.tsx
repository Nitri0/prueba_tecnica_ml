import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VariantButton } from '../VariantButton';

describe('VariantButton', () => {
  const mockVariant = {
    id: '1',
    label: 'Rojo',
    available: true,
  };

  it('debe renderizar correctamente', () => {
    const onClick = vi.fn();
    render(<VariantButton variant={mockVariant} isSelected={false} onClick={onClick} />);
    expect(screen.getByText('Rojo')).toBeInTheDocument();
  });

  it('debe aplicar estilos cuando no está seleccionado', () => {
    const onClick = vi.fn();
    render(<VariantButton variant={mockVariant} isSelected={false} onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-ml-gray-border', 'text-ml-gray-dark');
  });

  it('debe aplicar estilos cuando está seleccionado', () => {
    const onClick = vi.fn();
    render(<VariantButton variant={mockVariant} isSelected={true} onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-ml-blue', 'bg-ml-blue-light', 'text-ml-blue');
  });

  it('debe mostrar check icon cuando está seleccionado', () => {
    const onClick = vi.fn();
    const { container } = render(
      <VariantButton variant={mockVariant} isSelected={true} onClick={onClick} />
    );
    // Check icon se renderiza dentro de un div con bg-ml-blue
    const checkContainer = container.querySelector('.bg-ml-blue.rounded-full');
    expect(checkContainer).toBeInTheDocument();
  });

  it('no debe mostrar check icon cuando no está seleccionado', () => {
    const onClick = vi.fn();
    const { container } = render(
      <VariantButton variant={mockVariant} isSelected={false} onClick={onClick} />
    );
    const checkContainer = container.querySelector('.bg-ml-blue.rounded-full');
    expect(checkContainer).toBeNull();
  });

  it('debe manejar click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<VariantButton variant={mockVariant} isSelected={false} onClick={onClick} />);

    await user.click(screen.getByText('Rojo'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('debe estar deshabilitado cuando available es false', () => {
    const onClick = vi.fn();
    const unavailableVariant = { ...mockVariant, available: false };
    render(<VariantButton variant={unavailableVariant} isSelected={false} onClick={onClick} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed', 'line-through');
  });

  it('debe tener aria-pressed cuando está seleccionado', () => {
    const onClick = vi.fn();
    render(<VariantButton variant={mockVariant} isSelected={true} onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('debe tener title con label', () => {
    const onClick = vi.fn();
    render(<VariantButton variant={mockVariant} isSelected={false} onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Rojo');
  });

  it('debe mostrar "No disponible" en title cuando available es false', () => {
    const onClick = vi.fn();
    const unavailableVariant = { ...mockVariant, available: false };
    render(<VariantButton variant={unavailableVariant} isSelected={false} onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'No disponible');
  });

  it('debe renderizar imagen cuando showImage es true y variant tiene imagen', () => {
    const onClick = vi.fn();
    const variantWithImage = { ...mockVariant, image: '/test-image.jpg' };
    render(
      <VariantButton variant={variantWithImage} isSelected={false} onClick={onClick} showImage={true} />
    );

    const img = screen.getByAltText('Rojo');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test-image.jpg');
  });

  it('no debe renderizar imagen cuando showImage es false', () => {
    const onClick = vi.fn();
    const variantWithImage = { ...mockVariant, image: '/test-image.jpg' };
    render(
      <VariantButton variant={variantWithImage} isSelected={false} onClick={onClick} showImage={false} />
    );

    const img = screen.queryByAltText('Rojo');
    expect(img).toBeNull();
  });

  it('debe aplicar className personalizado', () => {
    const onClick = vi.fn();
    render(
      <VariantButton variant={mockVariant} isSelected={false} onClick={onClick} className="custom-variant" />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-variant');
  });

  it('debe tener clases base', () => {
    const onClick = vi.fn();
    render(<VariantButton variant={mockVariant} isSelected={false} onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('relative', 'min-w-[80px]', 'border-2', 'rounded-md');
  });

  it('no debe mostrar check cuando variante no está disponible aunque esté seleccionada', () => {
    const onClick = vi.fn();
    const unavailableVariant = { ...mockVariant, available: false };
    const { container } = render(
      <VariantButton variant={unavailableVariant} isSelected={true} onClick={onClick} />
    );
    const checkContainer = container.querySelector('.bg-ml-blue.rounded-full');
    expect(checkContainer).toBeNull();
  });
});
