"""Mapper para CategoryPath: Entity → DTO"""

from typing import List
from domain.category_path.entity.category_path import CategoryPath
from application.dto.detail_product_output_dto import CategoryPathItemDto


class CategoryPathMapper:
    """Mapper que convierte entidades CategoryPath a DTOs"""

    @staticmethod
    def to_dto(entity: CategoryPath) -> CategoryPathItemDto:
        """
        Convierte una entidad CategoryPath a CategoryPathItemDto.

        Args:
            entity: Entidad de dominio CategoryPath

        Returns:
            CategoryPathItemDto
        """
        return CategoryPathItemDto(
            label=entity.label,
            href=entity.href
        )

    @staticmethod
    def to_dto_list(entities: List[CategoryPath]) -> List[CategoryPathItemDto]:
        """
        Convierte una lista de entidades CategoryPath a lista de DTOs.

        Args:
            entities: Lista de entidades CategoryPath (ya ordenadas)

        Returns:
            Lista de CategoryPathItemDto en el mismo orden
        """
        return [CategoryPathMapper.to_dto(entity) for entity in entities]
