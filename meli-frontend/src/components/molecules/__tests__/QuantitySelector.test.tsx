import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuantitySelector } from '../QuantitySelector';

describe('QuantitySelector', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('debe renderizar correctamente', () => {
    render(<QuantitySelector quantity={1} onChange={mockOnChange} />);
    expect(screen.getByText('Cantidad:')).toBeInTheDocument();
  });

  it('debe mostrar la cantidad actual', () => {
    render(<QuantitySelector quantity={5} onChange={mockOnChange} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(5);
  });

  it('debe incrementar cantidad al hacer click en +', async () => {
    const user = userEvent.setup();
    render(<QuantitySelector quantity={1} onChange={mockOnChange} />);

    const increaseButton = screen.getByLabelText('Aumentar cantidad');
    await user.click(increaseButton);

    expect(mockOnChange).toHaveBeenCalledWith(2);
  });

  it('debe decrementar cantidad al hacer click en -', async () => {
    const user = userEvent.setup();
    render(<QuantitySelector quantity={3} onChange={mockOnChange} />);

    const decreaseButton = screen.getByLabelText('Disminuir cantidad');
    await user.click(decreaseButton);

    expect(mockOnChange).toHaveBeenCalledWith(2);
  });

  it('debe deshabilitar botón - cuando quantity es min', () => {
    render(<QuantitySelector quantity={1} min={1} onChange={mockOnChange} />);
    const decreaseButton = screen.getByLabelText('Disminuir cantidad');
    expect(decreaseButton).toBeDisabled();
  });

  it('debe deshabilitar botón + cuando quantity es max', () => {
    render(<QuantitySelector quantity={10} max={10} onChange={mockOnChange} />);
    const increaseButton = screen.getByLabelText('Aumentar cantidad');
    expect(increaseButton).toBeDisabled();
  });

  it('debe respetar min personalizado', async () => {
    const user = userEvent.setup();
    render(<QuantitySelector quantity={5} min={5} onChange={mockOnChange} />);

    const decreaseButton = screen.getByLabelText('Disminuir cantidad');
    expect(decreaseButton).toBeDisabled();
  });

  it('debe respetar max personalizado', async () => {
    const user = userEvent.setup();
    render(<QuantitySelector quantity={20} max={20} onChange={mockOnChange} />);

    const increaseButton = screen.getByLabelText('Aumentar cantidad');
    expect(increaseButton).toBeDisabled();
  });

  it('debe mostrar stock disponible cuando se proporciona', () => {
    render(<QuantitySelector quantity={1} availableStock={15} onChange={mockOnChange} />);
    expect(screen.getByText('(15 disponibles)')).toBeInTheDocument();
  });

  it('debe limitar max según availableStock', () => {
    render(<QuantitySelector quantity={8} max={99} availableStock={8} onChange={mockOnChange} />);
    const increaseButton = screen.getByLabelText('Aumentar cantidad');
    expect(increaseButton).toBeDisabled();
  });

  it('debe permitir cambiar valor manualmente en input', async () => {
    const user = userEvent.setup();
    render(<QuantitySelector quantity={5} max={10} onChange={mockOnChange} />);

    const input = screen.getByRole('spinbutton') as HTMLInputElement;

    // Cambiar el valor del input directamente simulando lo que haría el usuario
    await user.tripleClick(input); // Seleccionar todo el texto
    await user.keyboard('7');

    // El componente debería haber llamado onChange con el valor 7
    expect(mockOnChange).toHaveBeenCalledWith(7);
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(
      <QuantitySelector quantity={1} onChange={mockOnChange} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe tener botones con hover effect', () => {
    render(<QuantitySelector quantity={5} onChange={mockOnChange} />);
    const increaseButton = screen.getByLabelText('Aumentar cantidad');
    expect(increaseButton).toHaveClass('hover:bg-ml-gray-light');
  });
});
