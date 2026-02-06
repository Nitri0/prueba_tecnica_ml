import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../Header';

// Mock de useLocation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({
      pathname: '/',
    }),
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar correctamente', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('MELI App')).toBeInTheDocument();
  });

  it('debe mostrar el logo con enlace a home', () => {
    renderWithRouter(<Header />);
    const logo = screen.getByText('MELI App').closest('a');
    expect(logo).toHaveAttribute('href', '/');
  });

  it('debe mostrar los links de navegación en desktop', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Acerca de')).toBeInTheDocument();
  });

  it('debe tener el botón de menú móvil', () => {
    renderWithRouter(<Header />);
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
  });

  it('debe abrir el menú móvil al hacer click', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Header />);

    const menuButton = screen.getByRole('button');
    await user.click(menuButton);

    // Verificar que se renderizó el menú móvil duplicado
    const startLinks = screen.getAllByText('Inicio');
    expect(startLinks.length).toBeGreaterThan(1);
  });

  it('debe cerrar el menú móvil al hacer click en el botón de cerrar', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Header />);

    const menuButton = screen.getByRole('button');
    await user.click(menuButton);

    // Verificar que el menú está abierto
    const startLinksOpen = screen.getAllByText('Inicio');
    expect(startLinksOpen.length).toBeGreaterThan(1);

    // Hacer click nuevamente para cerrar
    await user.click(menuButton);

    // El menú móvil no debería estar visible (solo queda el link del desktop)
    const startLinksClosed = screen.getAllByText('Inicio');
    expect(startLinksClosed.length).toBe(1);
  });

  it('debe tener header sticky', () => {
    const { container } = renderWithRouter(<Header />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('sticky', 'top-0', 'z-50');
  });

  it('debe tener navegación desktop oculta en móvil', () => {
    const { container } = renderWithRouter(<Header />);
    const nav = container.querySelector('nav.hidden.md\\:flex');
    expect(nav).toBeInTheDocument();
  });
});
