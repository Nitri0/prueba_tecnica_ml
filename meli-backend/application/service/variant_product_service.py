"""Servicio unificado para variantes de productos y resolución de IDs"""

from typing import Dict
from application.dto.detail_product_output_dto import (
    ProductVariantsDto,
    VariantGroupDto,
    VariantDto
)
from domain.product_variant.interfaces.ivariant_repository import IVariantRepository
from domain.product_variant.interfaces.iproduct_variant_mapping_repository import IProductVariantMappingRepository


class VariantProductService:
    """
    Servicio unificado que maneja:
    1. Obtención de variantes para UI (opciones de color, capacidad, etc.)
    2. Resolución de product IDs basados en selección de variantes
    """

    def __init__(
        self,
        variant_repository: IVariantRepository,
        mapping_repository: IProductVariantMappingRepository
    ):
        self.variant_repository = variant_repository
        self.mapping_repository = mapping_repository

    def get_variants_by_product_id(self, product_id: str) -> ProductVariantsDto:
        """
        Obtiene las opciones de variantes disponibles para un producto.

        Args:
            product_id: ID del producto base

        Returns:
            Diccionario de grupos de variantes con sus opciones (para renderizar en UI)
        """
        variant_groups = self.variant_repository.get_by_product_id(product_id)

        # Convertir entities a DTOs
        result = {}
        for key, group in variant_groups.items():
            result[key] = VariantGroupDto(
                title=group.title,
                options=[
                    VariantDto(
                        id=v.id,
                        label=v.label,
                        value=v.value,
                        slug=v.slug,
                        image=v.image,
                        available=v.available
                    )
                    for v in group.options
                ],
                selected_id=group.selected_id,
                show_images=group.show_images,
                order=group.order
            )

        return result

    def resolve_product_id(
        self,
        base_product_id: str,
        variant_slugs: Dict[str, str]
    ) -> str:
        """
        Resuelve el product ID específico basado en la selección de variantes.

        Args:
            base_product_id: ID del producto base (ej: "MLC123456789")
            variant_slugs: Diccionario {variant_key: slug} (ej: {"color": "azul", "capacidad": "256gb"})

        Returns:
            Product ID del SKU específico (ej: "MLC928744140")
            Si no encuentra mapping, retorna base_product_id como fallback
        """
        if not variant_slugs:
            return base_product_id

        mapping = self.mapping_repository.get_by_combination(
            base_product_id,
            variant_slugs
        )

        if mapping:
            return mapping.product_variant_id

        # Fallback: si no encuentra mapping, retornar base ID
        print(f"Warning: No mapping found for {base_product_id} with variants {variant_slugs}")
        return base_product_id
