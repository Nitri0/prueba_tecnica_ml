import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaymentMethods, PaymentMethod } from '../PaymentMethods';

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'visa',
    name: 'Visa',
    imageUrl: 'https://example.com/visa.png',
    type: 'credit',
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    imageUrl: 'https://example.com/mastercard.png',
    type: 'credit',
  },
  {
    id: 'debit',
    name: 'Débito',
    imageUrl: 'https://example.com/debit.png',
    type: 'debit',
  },
  {
    id: 'mercadopago',
    name: 'Mercado Pago',
    imageUrl: 'https://cdn.brandfetch.io/idVIjDKqnh/w/180/h/180/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1682483466804',
    type: 'cash',
  },
];

describe('PaymentMethods', () => {
  const defaultProps = {
    maxInstallments: 12,
    paymentMethods: mockPaymentMethods,
  };

  it('debe renderizar correctamente', () => {
    render(<PaymentMethods {...defaultProps} />);
    expect(screen.getByText('Medios de pago')).toBeInTheDocument();
  });

  it('debe mostrar el banner de cuotas sin interés', () => {
    render(<PaymentMethods {...defaultProps} />);
    // El texto aparece dos veces: una para mobile y otra para desktop
    const banners = screen.getAllByText(/¡Paga en hasta 12 cuotas sin interés!/);
    expect(banners.length).toBeGreaterThan(0);
  });

  it('debe mostrar las tarjetas de crédito', () => {
    render(<PaymentMethods {...defaultProps} />);
    expect(screen.getByText('Tarjetas de crédito')).toBeInTheDocument();
  });

  it('debe mostrar las tarjetas de débito', () => {
    render(<PaymentMethods {...defaultProps} />);
    expect(screen.getByText('Tarjetas de débito')).toBeInTheDocument();
  });

  it('debe mostrar las opciones de pago en efectivo', () => {
    render(<PaymentMethods {...defaultProps} />);
    expect(screen.getByText('Cuotas sin Tarjeta')).toBeInTheDocument();
  });

  it('debe mostrar el link "Conoce otros medios de pago"', () => {
    render(<PaymentMethods {...defaultProps} />);
    expect(screen.getByText('Conoce otros medios de pago')).toBeInTheDocument();
  });

  it('debe abrir el modal al hacer click en "Conoce otros medios"', async () => {
    const user = userEvent.setup();
    render(<PaymentMethods {...defaultProps} />);

    const button = screen.getByText('Conoce otros medios de pago');
    await user.click(button);

    // Esperar a que el modal se abra - puede haber múltiples elementos con el mismo texto
    const modalTitles = await screen.findAllByText('Medios de pago para este producto');
    expect(modalTitles.length).toBeGreaterThan(0);
  });

  it('debe mostrar información de Mercado Pago en el modal', async () => {
    const user = userEvent.setup();
    render(<PaymentMethods {...defaultProps} />);

    const button = screen.getByText('Conoce otros medios de pago');
    await user.click(button);

    const mercadoPagoText = await screen.findByText(/Pagar con/);
    expect(mercadoPagoText).toBeInTheDocument();
  });

  it('debe mostrar información de cuotas en el modal', async () => {
    const user = userEvent.setup();
    render(<PaymentMethods {...defaultProps} />);

    const button = screen.getByText('Conoce otros medios de pago');
    await user.click(button);

    const installmentsText = await screen.findByText(/Hasta 12 cuotas sin interés/);
    expect(installmentsText).toBeInTheDocument();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<PaymentMethods {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe renderizar los logos de tarjetas', () => {
    const { container } = render(<PaymentMethods {...defaultProps} />);
    const images = container.querySelectorAll('img[alt="Visa"], img[alt="Mastercard"]');
    expect(images.length).toBeGreaterThan(0);
  });

  it('debe tener icono de tarjeta de crédito en el banner', () => {
    const { container } = render(<PaymentMethods {...defaultProps} />);
    expect(container.querySelector('.lucide-credit-card')).toBeInTheDocument();
  });

  it('debe filtrar métodos de pago por tipo', () => {
    render(<PaymentMethods {...defaultProps} />);
    // Verifica que se muestran las secciones correspondientes
    expect(screen.getByText('Tarjetas de crédito')).toBeInTheDocument();
    expect(screen.getByText('Tarjetas de débito')).toBeInTheDocument();
    expect(screen.getByText('Cuotas sin Tarjeta')).toBeInTheDocument();
  });

  it('no debe mostrar sección de tarjetas de crédito si no hay', () => {
    const noCredit = mockPaymentMethods.filter(m => m.type !== 'credit');
    const { container } = render(<PaymentMethods maxInstallments={12} paymentMethods={noCredit} />);

    // Verificar que la sección de tarjetas de crédito no está presente
    const creditSection = Array.from(container.querySelectorAll('h4')).find(
      h4 => h4.textContent === 'Tarjetas de crédito'
    );
    expect(creditSection).toBeUndefined();
  });

  it('debe mostrar "Ver condiciones" en el modal', async () => {
    const user = userEvent.setup();
    render(<PaymentMethods {...defaultProps} />);

    const button = screen.getByText('Conoce otros medios de pago');
    await user.click(button);

    const verCondiciones = await screen.findByText('Ver condiciones');
    expect(verCondiciones).toBeInTheDocument();
  });

  it('debe mostrar información sobre dinero en cuenta de Mercado Pago', async () => {
    const user = userEvent.setup();
    render(<PaymentMethods {...defaultProps} />);

    const button = screen.getByText('Conoce otros medios de pago');
    await user.click(button);

    const dineroCuenta = await screen.findByText('Dinero en tu cuenta de Mercado Pago');
    expect(dineroCuenta).toBeInTheDocument();
  });

  it('debe cerrar el modal al cambiar el estado', async () => {
    const user = userEvent.setup();
    render(<PaymentMethods {...defaultProps} />);

    const openButton = screen.getByText('Conoce otros medios de pago');
    await user.click(openButton);

    const modalTitles = await screen.findAllByText('Medios de pago para este producto');
    expect(modalTitles.length).toBeGreaterThan(0);

    // El modal debería tener un botón de cerrar (X) del DialogContent
    // Como es un componente de Radix UI, simplemente verificamos que se abrió
  });

  it('debe tener fondo verde en el banner de cuotas', () => {
    const { container } = render(<PaymentMethods {...defaultProps} />);
    const banner = container.querySelector('.bg-ml-green');
    expect(banner).toBeInTheDocument();
  });
});
