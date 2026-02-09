"""Tests para entidades de Question"""

import pytest
from domain.question.entity.question import Question, QuestionStatus


class TestQuestion:
    """Tests para Question"""

    def test_create_answered_question(self):
        """Debe crear pregunta respondida"""
        q = Question(
            id="q1",
            question="¿Tiene garantía?",
            answer="Sí, 12 meses",
            asked_at="2024-01-15T10:00:00Z",
            answered_at="2024-01-15T14:00:00Z",
            status=QuestionStatus.ANSWERED
        )
        assert q.id == "q1"
        assert q.status == QuestionStatus.ANSWERED

    def test_reject_empty_id(self):
        """Debe rechazar ID vacío"""
        with pytest.raises(ValueError, match="id cannot be empty"):
            Question(
                id="",
                question="Test?",
                answer="Test",
                asked_at="2024-01-15T10:00:00Z",
                answered_at="2024-01-15T14:00:00Z",
                status=QuestionStatus.ANSWERED
            )

    def test_reject_empty_question(self):
        """Debe rechazar pregunta vacía"""
        with pytest.raises(ValueError, match="question cannot be empty"):
            Question(
                id="q1",
                question="",
                answer="Test",
                asked_at="2024-01-15T10:00:00Z",
                answered_at="2024-01-15T14:00:00Z",
                status=QuestionStatus.PENDING
            )

    def test_allow_pending_question_without_answer(self):
        """Debe permitir pregunta pendiente sin respuesta"""
        q = Question(
            id="q2",
            question="¿Envío gratis?",
            answer="",
            asked_at="2024-01-16T09:00:00Z",
            answered_at="",
            status=QuestionStatus.PENDING
        )
        assert q.status == QuestionStatus.PENDING
        assert q.answer == ""
