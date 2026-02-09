"""Servicio para categorías de rating"""

from typing import List
from application.dto.detail_product_output_dto import RatingCategoryDto
from infrastructure.persist.rating_category.rating_category_repository import RatingCategoryRepository


class RatingCategoryService:
    """Servicio para obtener categorías de rating"""

    def __init__(self, repository: RatingCategoryRepository = None):
        self.repository = repository or RatingCategoryRepository()

    def get_rating_categories_by_product_id(self, product_id: str) -> List[RatingCategoryDto]:
        """Obtiene categorías de rating desde CSV"""
        categories = self.repository.get_all()
        return [
            RatingCategoryDto(
                id=c.id,
                name=c.name,
                order=c.order
            )
            for c in categories
        ]
