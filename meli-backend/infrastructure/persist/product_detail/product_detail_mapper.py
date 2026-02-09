"""Mapper para ProductDetail: Entity → DTO"""

from domain.product_detail.entity.product_detail import ProductDetail
from application.dto.detail_product_output_dto import ProductBasicsDto


class ProductDetailMapper:
    """Mapper que convierte entidades ProductDetail a ProductBasicsDto"""

    @staticmethod
    def to_basics_dto(entity: ProductDetail) -> ProductBasicsDto:
        """
        Convierte una entidad ProductDetail a ProductBasicsDto.

        Args:
            entity: Entidad de dominio ProductDetail

        Returns:
            ProductBasicsDto
        """
        return ProductBasicsDto(
            id=entity.id,
            title=entity.title,
            price=entity.price,
            original_price=entity.original_price if entity.original_price > 0 else None,
            discount=entity.discount if entity.discount > 0 else None,
            condition=entity.condition,
            sold_count=entity.sold_count,
            available_stock=entity.available_stock,
            description=entity.description
        )
