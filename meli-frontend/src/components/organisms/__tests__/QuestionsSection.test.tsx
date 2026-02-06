import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuestionsSection } from '../QuestionsSection';

describe('QuestionsSection', () => {
  it('debe renderizar correctamente', () => {
    render(<QuestionsSection />);
    expect(screen.getByText('Preguntas')).toBeInTheDocument();
  });

  it('debe mostrar el formulario para hacer preguntas', () => {
    render(<QuestionsSection />);
    expect(screen.getByPlaceholderText('Escribe tu pregunta...')).toBeInTheDocument();
    expect(screen.getByText('Preguntar')).toBeInTheDocument();
  });

  it('debe mostrar el link para ver todas las preguntas', () => {
    render(<QuestionsSection />);
    const link = screen.getByText('Ver todas las preguntas');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '#all-questions');
  });

  it('debe permitir escribir en el input', async () => {
    const user = userEvent.setup();
    render(<QuestionsSection />);

    const input = screen.getByPlaceholderText('Escribe tu pregunta...') as HTMLInputElement;
    await user.type(input, 'Esta es una pregunta de prueba');

    expect(input.value).toBe('Esta es una pregunta de prueba');
  });

  it('debe llamar onAskQuestion al enviar el formulario', async () => {
    const user = userEvent.setup();
    const onAskQuestion = vi.fn();
    render(<QuestionsSection onAskQuestion={onAskQuestion} />);

    const input = screen.getByPlaceholderText('Escribe tu pregunta...');
    const button = screen.getByText('Preguntar');

    await user.type(input, 'Mi pregunta');
    await user.click(button);

    expect(onAskQuestion).toHaveBeenCalledTimes(1);
    expect(onAskQuestion).toHaveBeenCalledWith('Mi pregunta');
  });

  it('debe limpiar el input después de enviar', async () => {
    const user = userEvent.setup();
    const onAskQuestion = vi.fn();
    render(<QuestionsSection onAskQuestion={onAskQuestion} />);

    const input = screen.getByPlaceholderText('Escribe tu pregunta...') as HTMLInputElement;
    const button = screen.getByText('Preguntar');

    await user.type(input, 'Mi pregunta');
    await user.click(button);

    expect(input.value).toBe('');
  });

  it('debe deshabilitar el botón cuando el input está vacío', () => {
    render(<QuestionsSection />);
    const button = screen.getByRole('button', { name: /Preguntar/i });
    expect(button).toBeDisabled();
  });

  it('debe habilitar el botón cuando hay texto', async () => {
    const user = userEvent.setup();
    render(<QuestionsSection />);

    const input = screen.getByPlaceholderText('Escribe tu pregunta...');
    const button = screen.getByText('Preguntar');

    await user.type(input, 'Pregunta');

    expect(button).not.toBeDisabled();
  });

  it('no debe enviar pregunta si está vacía', async () => {
    const user = userEvent.setup();
    const onAskQuestion = vi.fn();
    render(<QuestionsSection onAskQuestion={onAskQuestion} />);

    const input = screen.getByPlaceholderText('Escribe tu pregunta...');
    await user.type(input, '   ');

    const button = screen.getByText('Preguntar');
    await user.click(button);

    expect(onAskQuestion).not.toHaveBeenCalled();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<QuestionsSection className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe tener límite de caracteres en el input', () => {
    render(<QuestionsSection />);
    const input = screen.getByPlaceholderText('Escribe tu pregunta...');
    expect(input).toHaveAttribute('maxLength', '500');
  });

  it('debe prevenir el comportamiento por defecto del formulario', async () => {
    const user = userEvent.setup();
    const onAskQuestion = vi.fn();
    render(<QuestionsSection onAskQuestion={onAskQuestion} />);

    const input = screen.getByPlaceholderText('Escribe tu pregunta...');
    const button = screen.getByText('Preguntar');

    await user.type(input, 'Pregunta');
    await user.click(button);

    expect(onAskQuestion).toHaveBeenCalled();
  });
});
