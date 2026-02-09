"""Entidad de dominio para preguntas sobre productos"""

from dataclasses import dataclass
from enum import Enum


class QuestionStatus(Enum):
    """Estado de una pregunta"""
    ANSWERED = "answered"
    PENDING = "pending"


@dataclass(frozen=True)
class Question:
    """Pregunta sobre un producto"""
    id: str
    question: str
    answer: str
    asked_at: str  # ISO 8601 string
    answered_at: str  # ISO 8601 string
    status: QuestionStatus

    def __post_init__(self):
        if not self.id:
            raise ValueError("id cannot be empty")
        if not self.question:
            raise ValueError("question cannot be empty")
