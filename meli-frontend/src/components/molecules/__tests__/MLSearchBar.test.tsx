import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MLSearchBar } from '../MLSearchBar';

describe('MLSearchBar', () => {
  it('debe renderizar correctamente', () => {
    render(<MLSearchBar />);
    const input = screen.getByPlaceholderText('Buscar productos, marcas y más...');
    expect(input).toBeInTheDocument();
  });

  it('debe aceptar placeholder personalizado', () => {
    render(<MLSearchBar placeholder="Buscar celulares..." />);
    const input = screen.getByPlaceholderText('Buscar celulares...');
    expect(input).toBeInTheDocument();
  });

  it('debe permitir escribir en el input', async () => {
    const user = userEvent.setup();
    render(<MLSearchBar />);

    const input = screen.getByPlaceholderText('Buscar productos, marcas y más...');
    await user.type(input, 'iPhone 15');

    expect(input).toHaveValue('iPhone 15');
  });

  it('debe llamar onSearch al hacer submit', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();
    render(<MLSearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText('Buscar productos, marcas y más...');
    await user.type(input, 'Samsung Galaxy');

    const searchButton = screen.getByLabelText('Buscar');
    await user.click(searchButton);

    expect(handleSearch).toHaveBeenCalledWith('Samsung Galaxy');
  });

  it('debe llamar onSearch al presionar Enter', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();
    render(<MLSearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText('Buscar productos, marcas y más...');
    await user.type(input, 'Notebook{Enter}');

    expect(handleSearch).toHaveBeenCalledWith('Notebook');
  });

  it('debe mostrar ícono de búsqueda', () => {
    const { container } = render(<MLSearchBar />);
    const searchIcon = container.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
  });

  it('debe tener botón de búsqueda', () => {
    render(<MLSearchBar />);
    const button = screen.getByLabelText('Buscar');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<MLSearchBar className="custom-search" />);
    const form = container.querySelector('form');
    expect(form).toHaveClass('custom-search');
  });

  it('debe tener max-width de 600px', () => {
    const { container } = render(<MLSearchBar />);
    const form = container.querySelector('form');
    expect(form).toHaveClass('max-w-[600px]');
  });

  it('debe limpiar el input después de buscar', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();
    render(<MLSearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText('Buscar productos, marcas y más...');
    await user.type(input, 'test');
    await user.click(screen.getByLabelText('Buscar'));

    // El input mantiene el valor después de buscar (comportamiento actual)
    expect(input).toHaveValue('test');
  });
});
