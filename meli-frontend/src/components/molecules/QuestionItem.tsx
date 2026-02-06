import React from 'react';
import { MessageCircle } from 'lucide-react';

export interface Question {
  id: string;
  question: string;
  answer?: string;
  askedAt: Date;
  answeredAt?: Date;
  status: 'answered' | 'pending';
}

interface QuestionItemProps {
  question: Question;
  className?: string;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({ question, className = '' }) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    if (days < 7) return `Hace ${days} días`;
    if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`;
    return `Hace ${Math.floor(days / 30)} meses`;
  };

  return (
    <div className={`py-4 border-b border-ml-gray-border last:border-b-0 ${className}`}>
      {/* Pregunta */}
      <div className="flex items-start gap-3 mb-3">
        <MessageCircle className="w-5 h-5 text-ml-gray-medium flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-ml-gray-dark font-medium mb-1">
            {question.question}
          </p>
          <p className="text-xs text-ml-gray-medium">
            {formatDate(question.askedAt)}
          </p>
        </div>
      </div>

      {/* Respuesta */}
      {question.status === 'answered' && question.answer && (
        <div className="ml-8 pl-4 border-l-2 border-ml-green">
          <p className="text-sm text-ml-gray-dark mb-1">
            {question.answer}
          </p>
          {question.answeredAt && (
            <p className="text-xs text-ml-gray-medium">
              {formatDate(question.answeredAt)}
            </p>
          )}
        </div>
      )}

      {/* Estado pendiente */}
      {question.status === 'pending' && (
        <div className="ml-8 pl-4 border-l-2 border-ml-gray-border">
          <p className="text-sm text-ml-gray-medium italic">
            El vendedor aún no ha respondido
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionItem;
