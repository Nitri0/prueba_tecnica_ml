from dataclasses import dataclass
from typing import Dict


@dataclass(frozen=True)
class ProductVariantMapping:
    """
    Mapea una combinación de variantes a un product ID específico (SKU).

    Ejemplo:
        base_product_id: "MLC123456789"
        variant_combination: {"color": "azul", "capacidad": "256gb"}
        product_variant_id: "MLC123456789-AZU-256"
    """
    base_product_id: str
    variant_combination: Dict[str, str]  # {variant_key: variant_slug}
    product_variant_id: str

    def __post_init__(self):
        if not self.base_product_id or not self.base_product_id.strip():
            raise ValueError("base_product_id cannot be empty")

        if not self.variant_combination:
            raise ValueError("variant_combination cannot be empty")

        if not self.product_variant_id or not self.product_variant_id.strip():
            raise ValueError("product_variant_id cannot be empty")
