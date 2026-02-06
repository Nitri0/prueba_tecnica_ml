import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QuestionItem } from '../QuestionItem';

describe('QuestionItem', () => {
  const mockAnsweredQuestion = {
    id: '1',
    question: '¿Viene con cargador?',
    answer: 'Sí, incluye cargador original',
    askedAt: new Date('2024-01-01'),
    answeredAt: new Date('2024-01-02'),
    status: 'answered' as const,
  };

  const mockPendingQuestion = {
    id: '2',
    question: '¿Tiene garantía?',
    askedAt: new Date('2024-01-03'),
    status: 'pending' as const,
  };

  it('debe renderizar correctamente', () => {
    const { container } = render(<QuestionItem question={mockAnsweredQuestion} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('debe mostrar la pregunta', () => {
    render(<QuestionItem question={mockAnsweredQuestion} />);
    expect(screen.getByText('¿Viene con cargador?')).toBeInTheDocument();
  });

  it('debe mostrar la respuesta cuando está respondida', () => {
    render(<QuestionItem question={mockAnsweredQuestion} />);
    expect(screen.getByText('Sí, incluye cargador original')).toBeInTheDocument();
  });

  it('debe mostrar ícono de mensaje', () => {
    const { container } = render(<QuestionItem question={mockAnsweredQuestion} />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('debe mostrar "Hoy" para preguntas de hoy', () => {
    const todayQuestion = {
      ...mockAnsweredQuestion,
      askedAt: new Date(),
    };
    render(<QuestionItem question={todayQuestion} />);
    expect(screen.getByText('Hoy')).toBeInTheDocument();
  });

  it('debe mostrar mensaje de pendiente cuando no está respondida', () => {
    render(<QuestionItem question={mockPendingQuestion} />);
    expect(screen.getByText('El vendedor aún no ha respondido')).toBeInTheDocument();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(
      <QuestionItem question={mockAnsweredQuestion} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe tener borde inferior', () => {
    const { container } = render(<QuestionItem question={mockAnsweredQuestion} />);
    expect(container.firstChild).toHaveClass('border-b');
  });

  it('debe tener borde verde en respuesta', () => {
    const { container } = render(<QuestionItem question={mockAnsweredQuestion} />);
    const answerContainer = container.querySelector('.border-ml-green');
    expect(answerContainer).toBeInTheDocument();
  });

  it('debe tener borde gris en estado pendiente', () => {
    const { container } = render(<QuestionItem question={mockPendingQuestion} />);
    const pendingContainer = container.querySelector('.border-ml-gray-border');
    expect(pendingContainer).toBeInTheDocument();
  });

  it('debe mostrar texto en itálica para pendiente', () => {
    render(<QuestionItem question={mockPendingQuestion} />);
    const pendingText = screen.getByText('El vendedor aún no ha respondido');
    expect(pendingText).toHaveClass('italic');
  });

  it('no debe renderizar last:border-b-0', () => {
    const { container } = render(<QuestionItem question={mockAnsweredQuestion} />);
    expect(container.firstChild).toHaveClass('last:border-b-0');
  });
});
