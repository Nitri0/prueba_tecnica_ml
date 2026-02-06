import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PaymentIcon } from '../PaymentIcon';

describe('PaymentIcon', () => {
  it('debe renderizar correctamente', () => {
    const { container } = render(<PaymentIcon method="credit-card" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('debe aplicar tamaño medium por defecto', () => {
    const { container } = render(<PaymentIcon method="credit-card" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('w-8', 'h-8');
  });

  it('debe aplicar tamaño small', () => {
    const { container } = render(<PaymentIcon method="credit-card" size="sm" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('w-6', 'h-6');
  });

  it('debe aplicar tamaño large', () => {
    const { container } = render(<PaymentIcon method="credit-card" size="lg" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('w-10', 'h-10');
  });

  it('debe renderizar ícono de tarjeta de crédito', () => {
    const { container } = render(<PaymentIcon method="credit-card" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-ml-gray-dark');
  });

  it('debe renderizar ícono de tarjeta de débito', () => {
    const { container } = render(<PaymentIcon method="debit-card" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('debe renderizar ícono de Mercado Pago con color azul', () => {
    const { container } = render(<PaymentIcon method="mercado-pago" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('text-ml-blue');
  });

  it('debe renderizar ícono de transferencia bancaria', () => {
    const { container } = render(<PaymentIcon method="bank-transfer" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-ml-gray-dark');
  });

  it('debe renderizar ícono de Visa', () => {
    const { container } = render(<PaymentIcon method="visa" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('debe renderizar ícono de Mastercard', () => {
    const { container } = render(<PaymentIcon method="mastercard" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('debe renderizar ícono de American Express', () => {
    const { container } = render(<PaymentIcon method="amex" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<PaymentIcon method="credit-card" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe tener contenedor flex centrado', () => {
    const { container } = render(<PaymentIcon method="credit-card" />);
    expect(container.firstChild).toHaveClass('flex', 'items-center', 'justify-center');
  });
});
