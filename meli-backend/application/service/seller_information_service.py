"""Servicio para información del vendedor"""

from application.dto.detail_product_output_dto import SellerDto, ReputationDto
from infrastructure.persist.seller_information.seller_information_repository import SellerInformationRepository


class SellerInformationService:
    """Servicio para obtener información del vendedor"""

    def __init__(self, repository: SellerInformationRepository = None):
        self.repository = repository or SellerInformationRepository()

    def get_seller_information_by_product_id(self, product_id: str) -> SellerDto:
        """Obtiene información del vendedor desde CSV"""
        seller = self.repository.get_by_product_id(product_id)

        if seller:
            return SellerDto(
                name=seller.name,
                logo=seller.logo,
                is_official_store=seller.is_official_store,
                followers=seller.followers,
                total_products=seller.total_products,
                level=seller.level,
                location=seller.location,
                positive_rating=seller.positive_rating,
                total_sales=seller.total_sales,
                rating=seller.rating,
                review_count=seller.review_count,
                reputation=ReputationDto(
                    red=seller.reputation.red,
                    orange=seller.reputation.orange,
                    yellow=seller.reputation.yellow,
                    green=seller.reputation.green
                ),
                reputation_message=seller.reputation_message,
                good_attention=seller.good_attention,
                on_time_delivery=seller.on_time_delivery
            )

        # Fallback
        from domain.seller_information.entity.seller_information import SellerLevel, Reputation
        return SellerDto(
            name="Vendedor Desconocido",
            logo="",
            is_official_store=False,
            followers=0,
            total_products=0,
            level=SellerLevel.BRONZE,
            location="",
            positive_rating=0.0,
            total_sales=0,
            rating=0.0,
            review_count=0,
            reputation=ReputationDto(red=25, orange=25, yellow=25, green=25),
            reputation_message="Sin información",
            good_attention=False,
            on_time_delivery=False
        )
