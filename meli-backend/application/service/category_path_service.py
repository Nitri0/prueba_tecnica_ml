"""Servicio de aplicación para CategoryPath"""

from typing import List
from application.dto.detail_product_output_dto import CategoryPathItemDto
from infrastructure.persist.category_path.category_path_repository import CategoryPathRepository
from infrastructure.persist.category_path.category_path_mapper import CategoryPathMapper


class CategoryPathService:
    """
    Servicio de aplicación para obtener la ruta de categorías de un producto.

    Responsabilidades:
    - Obtener la ruta de navegación de categorías ordenada
    - Transformar entidades de dominio a DTOs
    """

    def __init__(self, repository: CategoryPathRepository, mapper: CategoryPathMapper):
        self._repository = repository
        self._mapper = mapper

    def get_category_path_by_product_id(self, product_id: str) -> List[CategoryPathItemDto]:
        """
        Obtiene la ruta de categorías para un producto específico.

        La ruta se retorna ordenada según el campo 'order' del CSV
        (ej: Electrónica > Celulares y Smartphones > iPhone)

        Args:
            product_id: ID del producto

        Returns:
            Lista de CategoryPathItemDto ordenada por jerarquía
        """
        # Obtener entidades del repositorio (ya vienen ordenadas)
        entities = self._repository.get_by_product_id(product_id)

        # Convertir a DTOs
        return self._mapper.to_dto_list(entities)
