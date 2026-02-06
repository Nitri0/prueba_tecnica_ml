import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavLink } from '../NavLink';
import { Home } from 'lucide-react';

describe('NavLink', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  it('debe renderizar correctamente', () => {
    renderWithRouter(<NavLink to="/" label="Inicio" />);
    expect(screen.getByText('Inicio')).toBeInTheDocument();
  });

  it('debe renderizar el label', () => {
    renderWithRouter(<NavLink to="/productos" label="Productos" />);
    expect(screen.getByText('Productos')).toBeInTheDocument();
  });

  it('debe renderizar ícono cuando se proporciona', () => {
    const { container } = renderWithRouter(<NavLink to="/" label="Inicio" icon={Home} />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('debe aplicar estilos de activo cuando isActive es true', () => {
    renderWithRouter(<NavLink to="/" label="Inicio" isActive={true} />);
    const link = screen.getByText('Inicio').closest('a');
    expect(link).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('debe aplicar estilos de inactivo cuando isActive es false', () => {
    renderWithRouter(<NavLink to="/" label="Inicio" isActive={false} />);
    const link = screen.getByText('Inicio').closest('a');
    expect(link).toHaveClass('text-muted-foreground');
  });

  it('debe aplicar className personalizado', () => {
    renderWithRouter(<NavLink to="/" label="Inicio" className="custom-nav" />);
    const link = screen.getByText('Inicio').closest('a');
    expect(link).toHaveClass('custom-nav');
  });

  it('debe ser un link de React Router', () => {
    renderWithRouter(<NavLink to="/test" label="Test" />);
    const link = screen.getByText('Test').closest('a');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('debe tener clases base comunes', () => {
    renderWithRouter(<NavLink to="/" label="Inicio" />);
    const link = screen.getByText('Inicio').closest('a');
    expect(link).toHaveClass('flex', 'items-center', 'space-x-2', 'rounded-md');
  });

  it('debe tener padding correcto', () => {
    renderWithRouter(<NavLink to="/" label="Inicio" />);
    const link = screen.getByText('Inicio').closest('a');
    expect(link).toHaveClass('px-3', 'py-2');
  });

  it('debe tener transición de colores', () => {
    renderWithRouter(<NavLink to="/" label="Inicio" />);
    const link = screen.getByText('Inicio').closest('a');
    expect(link).toHaveClass('transition-colors');
  });

  it('debe renderizar sin ícono correctamente', () => {
    const { container } = renderWithRouter(<NavLink to="/" label="Sin ícono" />);
    expect(screen.getByText('Sin ícono')).toBeInTheDocument();
    // Solo el componente no debería tener svg cuando no hay ícono
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBe(0);
  });
});
