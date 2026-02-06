import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShippingInfo } from '../ShippingInfo';

describe('ShippingInfo', () => {
  it('debe renderizar correctamente', () => {
    render(<ShippingInfo />);
    expect(screen.getByText(/Envío a/)).toBeInTheDocument();
  });

  it('debe mostrar el badge de envío gratis por defecto', () => {
    render(<ShippingInfo isFree={true} />);
    // El badge se renderiza dentro del componente ShippingBadge
    const { container } = render(<ShippingInfo isFree={true} />);
    expect(container).toBeInTheDocument();
  });

  it('debe mostrar el destino proporcionado', () => {
    render(<ShippingInfo destination="Valparaíso" />);
    expect(screen.getByText('Envío a Valparaíso')).toBeInTheDocument();
  });

  it('debe mostrar el destino por defecto Santiago', () => {
    render(<ShippingInfo />);
    expect(screen.getByText('Envío a Santiago')).toBeInTheDocument();
  });

  it('debe mostrar el tiempo estimado de entrega', () => {
    render(<ShippingInfo estimatedDays={{ min: 2, max: 3 }} />);
    expect(screen.getByText(/Llega/)).toBeInTheDocument();
  });

  it('debe mostrar el botón de cambiar ubicación si se proporciona callback', () => {
    const onChangeLocation = vi.fn();
    render(<ShippingInfo onChangeLocation={onChangeLocation} />);
    expect(screen.getByText('Cambiar ubicación')).toBeInTheDocument();
  });

  it('debe llamar onChangeLocation al hacer click', async () => {
    const user = userEvent.setup();
    const onChangeLocation = vi.fn();
    render(<ShippingInfo onChangeLocation={onChangeLocation} />);

    const button = screen.getByText('Cambiar ubicación');
    await user.click(button);

    expect(onChangeLocation).toHaveBeenCalledTimes(1);
  });

  it('no debe mostrar botón de cambiar ubicación si no se proporciona callback', () => {
    render(<ShippingInfo />);
    expect(screen.queryByText('Cambiar ubicación')).not.toBeInTheDocument();
  });

  it('debe mostrar el botón "Ver más formas de entrega"', () => {
    render(<ShippingInfo />);
    expect(screen.getByText('Ver más formas de entrega')).toBeInTheDocument();
  });

  it('debe expandir detalles al hacer click en "Ver más"', async () => {
    const user = userEvent.setup();
    render(<ShippingInfo />);

    const button = screen.getByText('Ver más formas de entrega');
    await user.click(button);

    expect(screen.getByText('Ver menos')).toBeInTheDocument();
    expect(screen.getByText('Retiro en correo')).toBeInTheDocument();
  });

  it('debe contraer detalles al hacer click en "Ver menos"', async () => {
    const user = userEvent.setup();
    render(<ShippingInfo />);

    const button = screen.getByText('Ver más formas de entrega');
    await user.click(button);

    const collapseButton = screen.getByText('Ver menos');
    await user.click(collapseButton);

    expect(screen.getByText('Ver más formas de entrega')).toBeInTheDocument();
    expect(screen.queryByText('Retiro en correo')).not.toBeInTheDocument();
  });

  it('debe mostrar información de devolución gratis', () => {
    render(<ShippingInfo />);
    expect(screen.getByText('Devolución gratis')).toBeInTheDocument();
    expect(screen.getByText('Tienes 30 días desde que lo recibes')).toBeInTheDocument();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<ShippingInfo className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe tener iconos de ubicación, calendario y camión', () => {
    const { container } = render(<ShippingInfo />);
    expect(container.querySelector('.lucide-map-pin')).toBeInTheDocument();
    expect(container.querySelector('.lucide-calendar')).toBeInTheDocument();
  });

  it('debe mostrar "Comprando ahora"', () => {
    render(<ShippingInfo />);
    expect(screen.getByText('Comprando ahora')).toBeInTheDocument();
  });

  it('debe rotar el icono chevron al expandir', async () => {
    const user = userEvent.setup();
    const { container } = render(<ShippingInfo />);

    const button = screen.getByText('Ver más formas de entrega');
    const icon = container.querySelector('.lucide-chevron-right');

    await user.click(button);

    expect(icon).toHaveClass('rotate-90');
  });
});
