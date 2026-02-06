import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from '../Footer';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Footer', () => {
  it('debe renderizar correctamente', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('MELI App')).toBeInTheDocument();
  });

  it('debe mostrar el logo con enlace a home', () => {
    renderWithRouter(<Footer />);
    const logo = screen.getByText('MELI App').closest('a');
    expect(logo).toHaveAttribute('href', '/');
  });

  it('debe mostrar la descripción de la aplicación', () => {
    renderWithRouter(<Footer />);
    expect(
      screen.getByText('Aplicación moderna construida con React, TypeScript y Atomic Design.')
    ).toBeInTheDocument();
  });

  it('debe mostrar la sección de navegación', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('Navegación')).toBeInTheDocument();
  });

  it('debe mostrar links de navegación', () => {
    renderWithRouter(<Footer />);
    const links = screen.getAllByText('Inicio');
    expect(links.length).toBeGreaterThan(0);
    expect(screen.getAllByText('Productos').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Acerca de').length).toBeGreaterThan(0);
  });

  it('debe mostrar badges de tecnologías', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
    expect(screen.getByText('Tailwind')).toBeInTheDocument();
    expect(screen.getByText('Shadcn/ui')).toBeInTheDocument();
  });

  it('debe mostrar links de redes sociales', () => {
    renderWithRouter(<Footer />);
    const socialLinks = screen.getAllByRole('link').filter(
      link => link.getAttribute('target') === '_blank'
    );
    expect(socialLinks.length).toBeGreaterThanOrEqual(3);
  });

  it('debe mostrar el año actual en el copyright', () => {
    renderWithRouter(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} MELI App`))).toBeInTheDocument();
  });

  it('debe tener footer con borde superior', () => {
    const { container } = renderWithRouter(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('border-t');
  });

  it('debe tener grid responsive', () => {
    const { container } = renderWithRouter(<Footer />);
    const grid = container.querySelector('.grid.grid-cols-1.md\\:grid-cols-4');
    expect(grid).toBeInTheDocument();
  });

  it('debe tener links de redes sociales con rel noopener noreferrer', () => {
    renderWithRouter(<Footer />);
    const socialLinks = screen.getAllByRole('link').filter(
      link => link.getAttribute('target') === '_blank'
    );
    socialLinks.forEach(link => {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
