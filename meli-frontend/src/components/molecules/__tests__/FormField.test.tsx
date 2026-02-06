import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormField } from '../FormField';

describe('FormField', () => {
  it('debe renderizar correctamente', () => {
    render(<FormField label="Nombre" />);
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
  });

  it('debe mostrar el label', () => {
    render(<FormField label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('debe generar ID desde el label', () => {
    render(<FormField label="Nombre Completo" />);
    const input = screen.getByLabelText('Nombre Completo');
    expect(input).toHaveAttribute('id', 'nombre-completo');
  });

  it('debe aceptar ID personalizado', () => {
    render(<FormField label="Email" id="custom-email-id" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('id', 'custom-email-id');
  });

  it('debe mostrar mensaje de error', () => {
    render(<FormField label="Email" error="El email es requerido" />);
    expect(screen.getByText('El email es requerido')).toBeInTheDocument();
  });

  it('debe aplicar clase de error al input', () => {
    render(<FormField label="Email" error="Error" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveClass('border-destructive');
  });

  it('debe mostrar texto de ayuda', () => {
    render(<FormField label="Password" helperText="Mínimo 8 caracteres" />);
    expect(screen.getByText('Mínimo 8 caracteres')).toBeInTheDocument();
  });

  it('no debe mostrar helperText cuando hay error', () => {
    render(<FormField label="Email" helperText="Ayuda" error="Error" />);
    expect(screen.queryByText('Ayuda')).not.toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('debe manejar value y onChange', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<FormField label="Nombre" value="" onChange={handleChange} />);

    const input = screen.getByLabelText('Nombre');
    await user.type(input, 'test');

    expect(handleChange).toHaveBeenCalled();
  });

  it('debe aceptar placeholder', () => {
    render(<FormField label="Email" placeholder="tu@email.com" />);
    const input = screen.getByPlaceholderText('tu@email.com');
    expect(input).toBeInTheDocument();
  });

  it('debe aceptar type personalizado', () => {
    render(<FormField label="Password" type="password" />);
    const input = document.querySelector('input[type="password"]');
    expect(input).toBeInTheDocument();
  });

  it('debe aplicar className personalizado', () => {
    render(<FormField label="Nombre" className="custom-input" />);
    const input = screen.getByLabelText('Nombre');
    expect(input).toHaveClass('custom-input');
  });

  it('debe tener espaciado entre elementos', () => {
    const { container } = render(<FormField label="Nombre" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('space-y-2');
  });
});
