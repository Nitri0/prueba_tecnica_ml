"""Servicio para preguntas sobre productos"""

from typing import List
from application.dto.detail_product_output_dto import QuestionDto
from infrastructure.persist.question.question_repository import QuestionRepository


class QuestionService:
    """Servicio para obtener preguntas sobre productos"""

    def __init__(self, repository: QuestionRepository = None):
        self.repository = repository or QuestionRepository()

    def get_questions_by_product_id(self, product_id: str) -> List[QuestionDto]:
        """Obtiene preguntas desde CSV"""
        questions = self.repository.get_by_product_id(product_id)
        return [
            QuestionDto(
                id=q.id,
                question=q.question,
                answer=q.answer,
                asked_at=q.asked_at,
                answered_at=q.answered_at,
                status=q.status
            )
            for q in questions
        ]
