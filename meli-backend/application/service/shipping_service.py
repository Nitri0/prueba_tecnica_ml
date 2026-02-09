"""Servicio para información de envío"""

from application.dto.detail_product_output_dto import ShippingDto, EstimatedDaysDto
from infrastructure.persist.shipping.shipping_repository import ShippingRepository


class ShippingService:
    """Servicio para obtener información de envío de productos"""

    def __init__(self, repository: ShippingRepository = None):
        self.repository = repository or ShippingRepository()

    def get_shipping_by_product_id(self, product_id: str) -> ShippingDto:
        """Obtiene información de envío desde CSV"""
        shipping = self.repository.get_by_product_id(product_id)

        if shipping:
            return ShippingDto(
                is_free=shipping.is_free,
                estimated_days=EstimatedDaysDto(
                    min=shipping.estimated_days.min,
                    max=shipping.estimated_days.max
                )
            )

        # Fallback por si no existe el producto
        return ShippingDto(
            is_free=False,
            estimated_days=EstimatedDaysDto(min=3, max=7)
        )
