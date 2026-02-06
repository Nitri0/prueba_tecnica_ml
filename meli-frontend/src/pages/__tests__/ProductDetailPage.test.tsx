import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ProductDetailPage } from '../ProductDetailPage';

// Mocks necesarios para embla-carousel
beforeAll(() => {
  // Mock de matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock de IntersectionObserver
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
      return [];
    }
    unobserve() {}
  } as any;

  // Mock de ResizeObserver
  global.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  } as any;
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ProductDetailPage', () => {
  it('debe renderizar correctamente', () => {
    renderWithRouter(<ProductDetailPage />);
    const elements = screen.getAllByText(/iPhone 15 Pro Max/);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('debe mostrar el breadcrumb en desktop', () => {
    const { container } = renderWithRouter(<ProductDetailPage />);
    const breadcrumb = container.querySelector('.hidden.lg\\:block');
    expect(breadcrumb).toBeInTheDocument();
  });

  it('debe mostrar el título del producto', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getAllByText(/iPhone 15 Pro Max 256GB Titanio Natural/).length).toBeGreaterThan(0);
  });

  it('debe mostrar el precio del producto', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getAllByText(/1\.299\.990/).length).toBeGreaterThan(0);
  });

  it('debe mostrar el componente PurchaseBox', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getByText('Comprar ahora')).toBeInTheDocument();
    expect(screen.getByText('Agregar al carrito')).toBeInTheDocument();
  });

  it('debe mostrar el componente SellerCard', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getByText('digitekcl')).toBeInTheDocument();
  });

  it('debe mostrar el componente PaymentMethods', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getByText('Medios de pago')).toBeInTheDocument();
  });

  it('debe mostrar las características del producto', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getByText('Características del producto')).toBeInTheDocument();
  });

  it('debe mostrar la descripción del producto', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getByText('Descripción')).toBeInTheDocument();
  });

  it('debe mostrar la sección de preguntas', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getByText('Preguntas')).toBeInTheDocument();
  });

  it('debe mostrar la sección de opiniones', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getByText('Opiniones del producto')).toBeInTheDocument();
  });

  it('debe mostrar productos relacionados', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getByText('Productos relacionados')).toBeInTheDocument();
  });

  it('debe mostrar las variantes del producto', () => {
    renderWithRouter(<ProductDetailPage />);
    // Verificar que existen selectores de variantes
    expect(screen.getAllByText(/Color/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Capacidad/).length).toBeGreaterThan(0);
  });

  it('debe tener el layout correcto con grid', () => {
    const { container } = renderWithRouter(<ProductDetailPage />);
    const gridLayout = container.querySelector('.lg\\:grid-cols-\\[70\\%_30\\%\\]');
    expect(gridLayout).toBeInTheDocument();
  });

  it('debe mostrar el rating del producto', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getAllByText(/4\.8/).length).toBeGreaterThan(0);
  });

  it('debe mostrar el contador de reviews', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getAllByText(/769/).length).toBeGreaterThan(0);
  });

  it('debe mostrar el descuento del producto', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getAllByText(/13% OFF/).length).toBeGreaterThan(0);
  });

  it('debe mostrar el precio original tachado', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getAllByText(/1\.499\.990/).length).toBeGreaterThan(0);
  });

  it('debe renderizar el separador entre secciones', () => {
    const { container } = renderWithRouter(<ProductDetailPage />);
    const separators = container.querySelectorAll('.my-6');
    expect(separators.length).toBeGreaterThan(0);
  });

  it('debe tener el background blanco en el contenedor principal', () => {
    const { container } = renderWithRouter(<ProductDetailPage />);
    const whiteBackground = container.querySelector('.bg-white');
    expect(whiteBackground).toBeInTheDocument();
  });

  it('debe mostrar highlights del producto', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getAllByText(/Escritorio en L amplio/).length).toBeGreaterThan(0);
  });

  it('debe usar el ProductDetailLayout', () => {
    const { container } = renderWithRouter(<ProductDetailPage />);
    // Verificar que hay un header (viene del layout)
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('debe mostrar la condición del producto', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getAllByText(/Nuevo/).length).toBeGreaterThan(0);
  });

  it('debe mostrar el stock disponible', () => {
    renderWithRouter(<ProductDetailPage />);
    expect(screen.getByText('Stock disponible')).toBeInTheDocument();
  });

  it('debe renderizar correctamente con el mock de datos', () => {
    renderWithRouter(<ProductDetailPage />);
    // Verificar que los datos del mock se están usando
    expect(screen.getAllByText(/iPhone 15 Pro Max/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/digitekcl/).length).toBeGreaterThan(0);
  });

  it('debe tener estructura responsive', () => {
    const { container } = renderWithRouter(<ProductDetailPage />);
    const responsiveClasses = container.querySelector('.lg\\:grid');
    expect(responsiveClasses).toBeInTheDocument();
  });
});
