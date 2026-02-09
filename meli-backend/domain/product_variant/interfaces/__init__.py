"""Product Variant Domain Interfaces"""

from domain.product_variant.interfaces.iproduct_variant_mapping_repository import IProductVariantMappingRepository
from domain.product_variant.interfaces.ivariant_repository import IVariantRepository

__all__ = [
    "IProductVariantMappingRepository",
    "IVariantRepository",
]
