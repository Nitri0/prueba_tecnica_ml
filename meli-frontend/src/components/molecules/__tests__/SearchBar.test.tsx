import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('debe renderizar correctamente', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Buscar...');
    expect(input).toBeInTheDocument();
  });

  it('debe aceptar placeholder personalizado', () => {
    render(<SearchBar onSearch={mockOnSearch} placeholder="Buscar productos" />);
    const input = screen.getByPlaceholderText('Buscar productos');
    expect(input).toBeInTheDocument();
  });

  it('debe permitir escribir en el input', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Buscar...');
    await user.type(input, 'test query');

    expect(input).toHaveValue('test query');
  });

  it('debe llamar onSearch al hacer submit', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Buscar...');
    await user.type(input, 'search term');

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('search term');
  });

  it('debe llamar onSearch al presionar Enter', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Buscar...');
    await user.type(input, 'test{Enter}');

    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('debe deshabilitar input cuando loading es true', () => {
    render(<SearchBar onSearch={mockOnSearch} loading={true} />);
    const input = screen.getByPlaceholderText('Buscar...');
    expect(input).toBeDisabled();
  });

  it('debe deshabilitar botón cuando loading es true', () => {
    render(<SearchBar onSearch={mockOnSearch} loading={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('debe mostrar ícono de búsqueda', () => {
    const { container } = render(<SearchBar onSearch={mockOnSearch} />);
    const searchIcon = container.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
  });

  it('debe tener max-width de sm', () => {
    const { container } = render(<SearchBar onSearch={mockOnSearch} />);
    const form = container.querySelector('form');
    expect(form).toHaveClass('max-w-sm');
  });

  it('debe tener espacio entre input y botón', () => {
    const { container } = render(<SearchBar onSearch={mockOnSearch} />);
    const form = container.querySelector('form');
    expect(form).toHaveClass('space-x-2');
  });
});
