"""Servicio para estadísticas de reviews"""

from typing import Dict, List
from application.dto.detail_product_output_dto import ReviewDto, CategoryRatingsDto
from infrastructure.persist.review.review_repository import ReviewRepository


class ReviewStatisticsService:
    """Servicio para obtener estadísticas de reviews"""

    def __init__(self, repository: ReviewRepository = None):
        self.repository = repository or ReviewRepository()

    def get_reviews_by_product_id(self, product_id: str) -> List[ReviewDto]:
        """Obtiene reviews desde CSV"""
        reviews = self.repository.get_by_product_id(product_id)
        return [
            ReviewDto(
                id=r.id,
                user_name=r.user_name,
                rating=r.rating,
                date=r.date,
                comment=r.comment,
                likes=r.likes,
                verified=r.verified,
                images=r.images,
                category_ratings=r.category_ratings
            )
            for r in reviews
        ]

    def get_average_rating(self, product_id: str) -> float:
        """Calcula el promedio de ratings desde CSV"""
        stats = self.repository.get_statistics(product_id)
        return stats['average_rating']

    def get_total_reviews(self, product_id: str) -> int:
        """Obtiene el total de reviews desde CSV"""
        stats = self.repository.get_statistics(product_id)
        return stats['total_reviews']

    def get_rating_distribution(self, product_id: str) -> Dict[int, int]:
        """Obtiene la distribución de ratings desde CSV"""
        stats = self.repository.get_statistics(product_id)
        return stats['rating_distribution']

    def get_average_category_ratings(self, product_id: str) -> CategoryRatingsDto:
        """Obtiene promedios de ratings por categoría desde CSV"""
        stats = self.repository.get_statistics(product_id)
        return stats['average_category_ratings']
