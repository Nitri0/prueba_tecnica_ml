"""Servicio para productos relacionados"""

from typing import List
from application.dto.detail_product_output_dto import RelatedProductDto
from infrastructure.persist.related_product.related_product_repository import RelatedProductRepository


class RelatedProductService:
    """Servicio para obtener productos relacionados"""

    def __init__(self, repository: RelatedProductRepository = None):
        self.repository = repository or RelatedProductRepository()

    def get_related_products_by_product_id(self, product_id: str) -> List[RelatedProductDto]:
        """Obtiene productos relacionados desde CSV"""
        products = self.repository.get_by_product_id(product_id)
        return [
            RelatedProductDto(
                id=p.id,
                title=p.title,
                price=p.price,
                original_price=p.original_price,
                image=p.image,
                discount=p.discount,
                installments=p.installments,
                installment_amount=p.installment_amount,
                is_free_shipping=p.is_free_shipping,
                is_first_purchase_free_shipping=p.is_first_purchase_free_shipping
            )
            for p in products
        ]
