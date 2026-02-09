from abc import ABC, abstractmethod
from typing import Optional, Dict
from domain.product_variant.entity.product_variant_mapping import ProductVariantMapping


class IProductVariantMappingRepository(ABC):
    """Interface para repositorio de mappings de variantes."""

    @abstractmethod
    def get_by_combination(
        self,
        base_product_id: str,
        variant_combination: Dict[str, str]
    ) -> Optional[ProductVariantMapping]:
        """
        Obtiene el mapping para una combinación específica.

        Args:
            base_product_id: ID del producto base
            variant_combination: Diccionario {variant_key: variant_slug}

        Returns:
            ProductVariantMapping si existe, None si no
        """
        pass
