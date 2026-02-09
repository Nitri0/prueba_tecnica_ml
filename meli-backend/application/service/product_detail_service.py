"""Servicio de aplicación para ProductDetail (información básica)"""

from typing import Optional
from application.dto.detail_product_output_dto import ProductBasicsDto
from infrastructure.persist.product_detail.product_detail_repository import ProductDetailRepository
from infrastructure.persist.product_detail.product_detail_mapper import ProductDetailMapper


class ProductDetailService:
    """
    Servicio de aplicación para obtener información básica del producto.

    Responsabilidades:
    - Obtener datos básicos del producto (título, precio, descripción, etc.)
    - Transformar entidades de dominio a DTOs
    """

    def __init__(self, repository: ProductDetailRepository, mapper: ProductDetailMapper):
        self._repository = repository
        self._mapper = mapper

    def get_basics_by_product_id(self, product_id: str) -> Optional[ProductBasicsDto]:
        """
        Obtiene la información básica para un producto específico.

        Args:
            product_id: ID del producto

        Returns:
            ProductBasicsDto con la información básica o None si no existe
        """
        # Obtener entidad del repositorio
        entity = self._repository.get_by_product_id(product_id)

        if not entity:
            return None

        # Convertir a DTO
        return self._mapper.to_basics_dto(entity)
