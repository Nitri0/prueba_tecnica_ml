"""Entidad ProductDetail para información básica del producto"""

from dataclasses import dataclass
from typing import List
from enum import Enum


class ConditionType(Enum):
    """Condición del producto"""
    NEW = "new"
    USED = "used"
    REFURBISHED = "refurbished"


@dataclass(frozen=True)
class ProductDetail:
    """
    Representa la información básica de un producto.

    Incluye datos esenciales como título, precio, descripción, etc.
    Las imágenes se manejan por separado en ProductImage.
    """
    id: str
    title: str
    price: int
    original_price: int
    discount: int
    condition: ConditionType
    sold_count: int
    available_stock: int
    description: str

    def __post_init__(self):
        """Validación de la entidad"""
        if not self.id or not self.id.strip():
            raise ValueError("id cannot be empty")

        if not self.title or not self.title.strip():
            raise ValueError("title cannot be empty")

        if self.price < 0:
            raise ValueError("price must be non-negative")

        if self.original_price < 0:
            raise ValueError("original_price must be non-negative")

        if self.discount < 0 or self.discount > 100:
            raise ValueError("discount must be between 0 and 100")

        if self.sold_count < 0:
            raise ValueError("sold_count must be non-negative")

        if self.available_stock < 0:
            raise ValueError("available_stock must be non-negative")
