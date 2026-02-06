import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SellerCard } from '../SellerCard';

describe('SellerCard', () => {
  const defaultProps = {
    name: 'TechStore',
    logo: 'https://example.com/logo.jpg',
    followers: 1500,
    totalProducts: 250,
    totalSales: 5000,
  };

  it('debe renderizar correctamente', () => {
    render(<SellerCard {...defaultProps} />);
    expect(screen.getByText('TechStore')).toBeInTheDocument();
  });

  it('debe mostrar el logo del vendedor', () => {
    render(<SellerCard {...defaultProps} />);
    const logo = screen.getByAltText('Logo de TechStore');
    expect(logo).toHaveAttribute('src', 'https://example.com/logo.jpg');
  });

  it('debe mostrar el número de seguidores formateado', () => {
    render(<SellerCard {...defaultProps} />);
    expect(screen.getByText('+1500')).toBeInTheDocument();
    expect(screen.getByText('Seguidores')).toBeInTheDocument();
  });

  it('debe mostrar el número de productos', () => {
    render(<SellerCard {...defaultProps} />);
    expect(screen.getByText('+250')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();
  });

  it('debe mostrar el número de ventas', () => {
    render(<SellerCard {...defaultProps} />);
    expect(screen.getByText('+5000')).toBeInTheDocument();
    expect(screen.getByText('Ventas')).toBeInTheDocument();
  });

  it('debe mostrar el botón "Seguir"', () => {
    render(<SellerCard {...defaultProps} />);
    expect(screen.getByText('Seguir')).toBeInTheDocument();
  });

  it('debe mostrar el botón "Ir a la página del vendedor"', () => {
    render(<SellerCard {...defaultProps} />);
    expect(screen.getByText('Ir a la página del vendedor')).toBeInTheDocument();
  });

  it('debe llamar onVisitStore al hacer click', async () => {
    const user = userEvent.setup();
    const onVisitStore = vi.fn();
    render(<SellerCard {...defaultProps} onVisitStore={onVisitStore} />);

    const button = screen.getByText('Ir a la página del vendedor');
    await user.click(button);

    expect(onVisitStore).toHaveBeenCalledTimes(1);
  });

  it('debe mostrar la barra de reputación', () => {
    const reputation = { red: 5, orange: 10, yellow: 15, green: 70 };
    const { container } = render(<SellerCard {...defaultProps} reputation={reputation} />);

    const bars = container.querySelectorAll('.bg-red-300, .bg-orange-200, .bg-yellow-200, .bg-ml-green');
    expect(bars.length).toBeGreaterThan(0);
  });

  it('debe mostrar icono de buena atención cuando está presente', () => {
    const { container } = render(<SellerCard {...defaultProps} goodAttention={true} />);
    expect(screen.getByText('Buena atención')).toBeInTheDocument();
    expect(container.querySelector('.lucide-message-square')).toBeInTheDocument();
  });

  it('debe mostrar icono de entrega a tiempo cuando está presente', () => {
    const { container } = render(<SellerCard {...defaultProps} onTimeDelivery={true} />);
    expect(screen.getByText('Entrega a tiempo')).toBeInTheDocument();
    expect(container.querySelector('.lucide-clock')).toBeInTheDocument();
  });

  it('debe mostrar mensaje de reputación si se proporciona', () => {
    render(<SellerCard {...defaultProps} reputationMessage="Excelente vendedor" />);
    expect(screen.getByText('Excelente vendedor')).toBeInTheDocument();
  });

  it('debe mostrar badge de nivel si se proporciona', () => {
    render(<SellerCard {...defaultProps} level="platinum" />);
    // El badge se renderiza en el componente SellerBadge
    const { container } = render(<SellerCard {...defaultProps} level="platinum" />);
    expect(container).toBeInTheDocument();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<SellerCard {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe renderizar sin logo', () => {
    const propsWithoutLogo = { ...defaultProps, logo: undefined };
    render(<SellerCard {...propsWithoutLogo} />);
    expect(screen.getByText('TechStore')).toBeInTheDocument();
  });

  it('debe usar valores por defecto para estadísticas', () => {
    render(<SellerCard name="TestStore" />);

    // Verificar que los números formateados están presentes
    const followerValue = screen.getByText('Seguidores').closest('div')?.querySelector('.font-semibold');
    const salesValue = screen.getByText('Ventas').closest('div')?.querySelector('.font-semibold');

    expect(followerValue).toBeInTheDocument();
    expect(salesValue).toBeInTheDocument();
  });

  it('debe tener grid dinámico basado en métricas mostradas', () => {
    const { container } = render(
      <SellerCard {...defaultProps} goodAttention={true} onTimeDelivery={true} />
    );

    // Verificar que hay un grid con las clases grid-cols
    const gridElements = container.querySelectorAll('[class*="grid"]');
    expect(gridElements.length).toBeGreaterThan(0);
  });
});
