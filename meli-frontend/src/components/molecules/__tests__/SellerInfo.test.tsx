import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SellerInfo } from '../SellerInfo';

describe('SellerInfo', () => {
  it('debe renderizar correctamente', () => {
    render(<SellerInfo name="Tienda Oficial" />);
    expect(screen.getByText('Tienda Oficial')).toBeInTheDocument();
  });

  it('debe mostrar el nombre del vendedor', () => {
    render(<SellerInfo name="Vendedor Premium" />);
    expect(screen.getByText('Vendedor Premium')).toBeInTheDocument();
  });

  it('debe mostrar ubicación cuando se proporciona', () => {
    render(<SellerInfo name="Vendedor" location="Santiago, Chile" />);
    expect(screen.getByText('Santiago, Chile')).toBeInTheDocument();
  });

  it('debe mostrar ícono de ubicación cuando hay location', () => {
    const { container } = render(<SellerInfo name="Vendedor" location="Santiago" />);
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('no debe mostrar ubicación cuando no se proporciona', () => {
    const { container } = render(<SellerInfo name="Vendedor" />);
    expect(screen.queryByText(/Santiago/)).not.toBeInTheDocument();
  });

  it('debe mostrar rating con estrellas cuando se proporciona', () => {
    const { container } = render(<SellerInfo name="Vendedor" rating={4.5} />);
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBeGreaterThan(0);
  });

  it('debe mostrar reviewCount cuando se proporciona', () => {
    render(<SellerInfo name="Vendedor" rating={4.5} reviewCount={1500} />);
    expect(screen.getByText('(1,500)')).toBeInTheDocument();
  });

  it('debe mostrar calificación positiva cuando se proporciona', () => {
    render(<SellerInfo name="Vendedor" positiveRating={98} />);
    expect(screen.getByText('98% positivas')).toBeInTheDocument();
  });

  it('debe mostrar ícono de thumbs up con calificación positiva', () => {
    const { container } = render(<SellerInfo name="Vendedor" positiveRating={98} />);
    // Debe haber al menos un ícono (thumbs up)
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('debe mostrar total de ventas cuando se proporciona', () => {
    render(<SellerInfo name="Vendedor" totalSales={5000} />);
    expect(screen.getByText('5,000 ventas')).toBeInTheDocument();
  });

  it('debe formatear números grandes en ventas', () => {
    render(<SellerInfo name="Vendedor" totalSales={125000} />);
    expect(screen.getByText('125,000 ventas')).toBeInTheDocument();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<SellerInfo name="Vendedor" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe mostrar toda la información cuando está completa', () => {
    render(
      <SellerInfo
        name="Tienda Oficial"
        location="Santiago"
        rating={4.8}
        reviewCount={2500}
        positiveRating={99}
        totalSales={10000}
      />
    );

    expect(screen.getByText('Tienda Oficial')).toBeInTheDocument();
    expect(screen.getByText('Santiago')).toBeInTheDocument();
    expect(screen.getByText('(2,500)')).toBeInTheDocument();
    expect(screen.getByText('99% positivas')).toBeInTheDocument();
    expect(screen.getByText('10,000 ventas')).toBeInTheDocument();
  });

  it('debe tener estilos correctos en el nombre', () => {
    render(<SellerInfo name="Vendedor" />);
    const name = screen.getByText('Vendedor');
    expect(name).toHaveClass('text-base', 'font-medium');
  });

  it('debe aplicar color verde a calificación positiva', () => {
    const { container } = render(<SellerInfo name="Vendedor" positiveRating={98} />);
    const positiveContainer = container.querySelector('.text-ml-green');
    expect(positiveContainer).toBeInTheDocument();
  });
});
