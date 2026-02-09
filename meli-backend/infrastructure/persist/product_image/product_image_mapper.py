"""Mapper para ProductImage: Entity → DTO"""

from typing import List
from domain.product_image.entity.product_image import ProductImage, ImageType
from application.dto.detail_product_output_dto import ProductMediaDto


class ProductImageMapper:
    """Mapper que convierte entidades ProductImage a ProductMediaDto"""

    @staticmethod
    def to_media_dto(entities: List[ProductImage]) -> ProductMediaDto:
        """
        Convierte una lista de entidades ProductImage a ProductMediaDto.

        Separa las imágenes por tipo:
        - DETAIL → images
        - DESCRIPTION → description_images

        Args:
            entities: Lista de entidades ProductImage (ya ordenadas)

        Returns:
            ProductMediaDto con las imágenes separadas por tipo
        """
        detail_images = []
        description_images = []

        for entity in entities:
            if entity.type == ImageType.DETAIL:
                detail_images.append(entity.url)
            elif entity.type == ImageType.DESCRIPTION:
                description_images.append(entity.url)

        return ProductMediaDto(
            images=detail_images,
            description_images=description_images
        )
