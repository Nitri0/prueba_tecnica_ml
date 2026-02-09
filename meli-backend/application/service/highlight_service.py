"""Servicio para destacados de productos"""

from typing import List
from infrastructure.persist.highlight.highlight_repository import HighlightRepository


class HighlightService:
    """Servicio para obtener destacados de productos"""

    def __init__(self, repository: HighlightRepository = None):
        self.repository = repository or HighlightRepository()

    def get_highlights_by_product_id(self, product_id: str) -> List[str]:
        """Obtiene destacados desde CSV"""
        return self.repository.get_by_product_id(product_id)
