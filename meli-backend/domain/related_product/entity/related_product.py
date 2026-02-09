"""Entidad de dominio para productos relacionados"""

from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class RelatedProduct:
    """Producto relacionado"""
    id: str
    title: str
    price: int
    original_price: Optional[int]
    image: str
    discount: Optional[int]
    installments: int
    installment_amount: int
    is_free_shipping: bool
    is_first_purchase_free_shipping: bool

    def __post_init__(self):
        if not self.id:
            raise ValueError("id cannot be empty")
        if not self.title:
            raise ValueError("title cannot be empty")
        if self.price < 0:
            raise ValueError("price must be non-negative")
        if self.original_price is not None and self.original_price < 0:
            raise ValueError("original_price must be non-negative")
        if self.discount is not None and (self.discount < 0 or self.discount > 100):
            raise ValueError("discount must be between 0 and 100")
        if self.installments < 0:
            raise ValueError("installments must be non-negative")
        if self.installment_amount < 0:
            raise ValueError("installment_amount must be non-negative")
