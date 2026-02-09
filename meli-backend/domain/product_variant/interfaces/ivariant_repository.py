"""Interface para repositorio de variantes"""

from abc import ABC, abstractmethod
from typing import Dict
from domain.product_variant.entity.variant import VariantGroup


class IVariantRepository(ABC):
    """Interface para repositorio de variantes de producto"""

    @abstractmethod
    def get_by_product_id(self, product_id: str) -> Dict[str, VariantGroup]:
        """
        Obtiene todas las variantes de un producto agrupadas.

        Args:
            product_id: ID del producto

        Returns:
            Diccionario donde la key es el group_key (ej: "color", "capacidad")
            y el value es un VariantGroup con todas las opciones
        """
        pass
