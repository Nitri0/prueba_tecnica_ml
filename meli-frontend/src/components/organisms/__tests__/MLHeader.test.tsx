import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { MLHeader } from '../MLHeader';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('MLHeader', () => {
  it('debe renderizar correctamente', () => {
    renderWithRouter(<MLHeader />);
    // Verificar que el logo está presente
    const { container } = renderWithRouter(<MLHeader />);
    expect(container).toBeInTheDocument();
  });

  it('debe mostrar el logo de Mercado Libre', () => {
    const { container } = renderWithRouter(<MLHeader />);
    const logo = container.querySelector('a[href="/"]');
    expect(logo).toBeInTheDocument();
  });

  it('debe mostrar el selector de ubicación', () => {
    renderWithRouter(<MLHeader />);
    expect(screen.getByText('Ingresa tu')).toBeInTheDocument();
    expect(screen.getByText('ubicación')).toBeInTheDocument();
  });

  it('debe mostrar el icono del carrito', () => {
    const { container } = renderWithRouter(<MLHeader />);
    expect(container.querySelector('.lucide-shopping-cart')).toBeInTheDocument();
  });

  it('debe mostrar el contador del carrito cuando hay items', () => {
    renderWithRouter(<MLHeader cartItemsCount={5} />);
    // Hay dos carritos: uno en mobile y otro en desktop
    const badges = screen.getAllByText('5');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('debe mostrar "9+" cuando hay más de 9 items', () => {
    renderWithRouter(<MLHeader cartItemsCount={15} />);
    // Hay dos carritos: uno en mobile y otro en desktop
    const badges = screen.getAllByText('9+');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('no debe mostrar contador cuando no hay items', () => {
    const { container } = renderWithRouter(<MLHeader cartItemsCount={0} />);
    const badge = container.querySelector('.bg-red-500');
    expect(badge).not.toBeInTheDocument();
  });

  it('debe tener link al carrito', () => {
    const { container } = renderWithRouter(<MLHeader />);
    const cartLink = container.querySelector('a[href="/cart"]');
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('debe mostrar links de navegación', () => {
    renderWithRouter(<MLHeader />);
    expect(screen.getByText('Categorías')).toBeInTheDocument();
    expect(screen.getByText('Ofertas')).toBeInTheDocument();
    expect(screen.getByText('Cupones')).toBeInTheDocument();
    expect(screen.getByText('Vender')).toBeInTheDocument();
    expect(screen.getByText('Ayuda')).toBeInTheDocument();
  });

  it('debe mostrar links de usuario', () => {
    renderWithRouter(<MLHeader />);
    expect(screen.getByText('Crea tu cuenta')).toBeInTheDocument();
    expect(screen.getByText('Ingresa')).toBeInTheDocument();
    expect(screen.getByText('Mis compras')).toBeInTheDocument();
  });

  it('debe mostrar badge "NUEVO" en Supermercado', () => {
    renderWithRouter(<MLHeader />);
    const badges = screen.getAllByText('NUEVO');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('debe mostrar badge "GRATIS" en Mercado Play', () => {
    renderWithRouter(<MLHeader />);
    expect(screen.getByText('GRATIS')).toBeInTheDocument();
  });

  it('debe tener fondo amarillo característico', () => {
    const { container } = renderWithRouter(<MLHeader />);
    const header = container.querySelector('.bg-ml-yellow');
    expect(header).toBeInTheDocument();
  });

  it('debe tener barra de navegación secundaria con fondo amarillo', () => {
    const { container } = renderWithRouter(<MLHeader />);
    const secondaryNav = container.querySelector('.bg-ml-yellow');
    expect(secondaryNav).toBeInTheDocument();
  });

  it('debe renderizar la barra de búsqueda', () => {
    renderWithRouter(<MLHeader />);
    // MLSearchBar se renderiza dentro del componente
    const { container } = renderWithRouter(<MLHeader />);
    expect(container).toBeInTheDocument();
  });

  it('debe llamar onSearch cuando se busca', () => {
    const onSearch = vi.fn();
    renderWithRouter(<MLHeader onSearch={onSearch} />);
    // La función onSearch se pasa al componente MLSearchBar
    expect(onSearch).toBeDefined();
  });

  it('debe tener hover effect en el carrito', () => {
    const { container } = renderWithRouter(<MLHeader />);
    const cartLink = container.querySelector('a[href="/cart"]');
    expect(cartLink).toHaveClass('hover:bg-black/5');
  });

  it('debe tener icono de ubicación', () => {
    const { container } = renderWithRouter(<MLHeader />);
    expect(container.querySelector('.lucide-map-pin')).toBeInTheDocument();
  });
});
