"""Repositorio CSV para Question"""

import csv
import os
from typing import List
from domain.question.entity.question import Question, QuestionStatus


class QuestionRepository:
    """Repositorio que lee preguntas desde CSV"""

    def __init__(self):
        current_dir = os.path.dirname(__file__)
        self.csv_path = os.path.join(current_dir, "data", "question.csv")

    def get_by_product_id(self, product_id: str) -> List[Question]:
        """Obtiene todas las preguntas de un producto"""
        questions = []
        try:
            with open(self.csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['product_id'] == product_id:
                        question = Question(
                            id=row['id'],
                            question=row['question'],
                            answer=row['answer'] if row['answer'] else "",
                            asked_at=row['asked_at'],
                            answered_at=row['answered_at'] if row['answered_at'] else "",
                            status=QuestionStatus(row['status'])
                        )
                        questions.append(question)
        except FileNotFoundError:
            pass
        except Exception as e:
            print(f"Error reading question CSV: {e}")
        return questions
