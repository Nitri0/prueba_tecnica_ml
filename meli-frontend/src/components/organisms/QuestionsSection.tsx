import React, { useState } from 'react';

interface QuestionsSectionProps {
  questions?: any[];
  onAskQuestion?: (question: string) => void;
  className?: string;
}

export const QuestionsSection: React.FC<QuestionsSectionProps> = ({
  questions: _questions = [],
  onAskQuestion,
  className = '',
}) => {
  const [newQuestion, setNewQuestion] = useState('');

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim() && onAskQuestion) {
      onAskQuestion(newQuestion.trim());
      setNewQuestion('');
    }
  };

  return (
    <div className={`bg-white p-6 lg:p-8 border-x border-b border-ml-gray-border ${className}`}>
      {/* Título */}
      <h2 className="text-2xl font-normal text-ml-gray-dark mb-6">
        Preguntas
      </h2>

      {/* Formulario para hacer preguntas */}
      <form onSubmit={handleSubmitQuestion} className="mb-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="flex-1 px-4 py-3 border border-ml-gray-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ml-blue text-base"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!newQuestion.trim()}
            className="px-6 py-3 bg-ml-blue text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
          >
            <span>Preguntar</span>
          </button>
        </div>
      </form>

      {/* Link ver todas las preguntas */}
      <a
        href="#all-questions"
        className="text-ml-blue text-xs hover:underline inline-block mb-6"
      >
        Ver todas las preguntas
      </a>
    </div>
  );
};

export default QuestionsSection;
