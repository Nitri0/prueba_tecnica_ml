import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumb, BreadcrumbItem } from '../Breadcrumb';

const basicItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Productos', href: '/products' },
  { label: 'Electrónica', href: '/products/electronics' },
];

describe('Breadcrumb', () => {
  it('debe renderizar correctamente', () => {
    render(<Breadcrumb items={basicItems} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('debe mostrar el botón "Volver" por defecto', () => {
    render(<Breadcrumb items={basicItems} />);
    expect(screen.getByText('Volver')).toBeInTheDocument();
  });

  it('debe mostrar todos los items del breadcrumb', () => {
    render(<Breadcrumb items={basicItems} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Electrónica')).toBeInTheDocument();
  });

  it('debe tener enlaces correctos para los items', () => {
    render(<Breadcrumb items={basicItems} />);

    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');

    const productsLink = screen.getByText('Productos').closest('a');
    expect(productsLink).toHaveAttribute('href', '/products');
  });

  it('debe marcar el último item sin enlace', () => {
    render(<Breadcrumb items={basicItems} />);

    const lastItem = screen.getByText('Electrónica');
    expect(lastItem.tagName).toBe('SPAN');
    expect(lastItem.closest('a')).toBeNull();
  });

  it('no debe mostrar el botón "Volver" si showBackButton es false', () => {
    render(<Breadcrumb items={basicItems} showBackButton={false} />);
    expect(screen.queryByText('Volver')).not.toBeInTheDocument();
  });

  it('debe usar backLabel personalizado', () => {
    render(<Breadcrumb items={basicItems} backLabel="Regresar" />);
    expect(screen.getByText('Regresar')).toBeInTheDocument();
    expect(screen.queryByText('Volver')).not.toBeInTheDocument();
  });

  it('debe separar items con el separador ">"', () => {
    const { container } = render(<Breadcrumb items={basicItems} />);
    const separators = Array.from(container.querySelectorAll('li')).filter(
      li => li.textContent === '>'
    );
    expect(separators.length).toBeGreaterThan(0);
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<Breadcrumb items={basicItems} className="custom-class" />);
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('custom-class');
  });

  it('debe tener nav role', () => {
    const { container } = render(<Breadcrumb items={basicItems} />);
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });

  it('debe marcar item con isCurrentPage como actual', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Productos', href: '/products', isCurrentPage: true },
      { label: 'Electrónica', href: '/products/electronics' },
    ];

    render(<Breadcrumb items={items} />);

    const currentItem = screen.getByText('Productos');
    expect(currentItem.tagName).toBe('SPAN');
  });

  it('debe separar el botón volver con "|"', () => {
    const { container } = render(<Breadcrumb items={basicItems} />);
    const pipes = Array.from(container.querySelectorAll('li')).filter(
      li => li.textContent === '|'
    );
    expect(pipes.length).toBe(1);
  });
});
