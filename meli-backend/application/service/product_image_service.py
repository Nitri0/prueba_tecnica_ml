"""Servicio de aplicación para ProductImage (media)"""

from application.dto.detail_product_output_dto import ProductMediaDto
from infrastructure.persist.product_image.product_image_repository import ProductImageRepository
from infrastructure.persist.product_image.product_image_mapper import ProductImageMapper


class ProductImageService:
    """
    Servicio de aplicación para obtener imágenes del producto.

    Responsabilidades:
    - Obtener imágenes del producto separadas por tipo (detail/description)
    - Transformar entidades de dominio a DTOs
    """

    def __init__(self, repository: ProductImageRepository, mapper: ProductImageMapper):
        self._repository = repository
        self._mapper = mapper

    def get_media_by_product_id(self, product_id: str) -> ProductMediaDto:
        """
        Obtiene las imágenes para un producto específico.

        Las imágenes se retornan separadas por tipo:
        - images: imágenes de detalle (galería principal)
        - description_images: imágenes de descripción

        Args:
            product_id: ID del producto

        Returns:
            ProductMediaDto con las imágenes separadas
        """
        # Obtener entidades del repositorio (ya vienen ordenadas)
        entities = self._repository.get_by_product_id(product_id)

        # Convertir a DTO
        return self._mapper.to_media_dto(entities)
