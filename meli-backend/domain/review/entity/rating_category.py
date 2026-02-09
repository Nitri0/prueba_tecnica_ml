"""Entidad de dominio para categorías de rating"""

from dataclasses import dataclass


@dataclass(frozen=True)
class RatingCategory:
    """Categoría de rating para opiniones de productos"""
    id: str
    name: str
    order: int = 0

    def __post_init__(self):
        if not self.id:
            raise ValueError("id cannot be empty")
        if not self.name:
            raise ValueError("name cannot be empty")
        if self.order < 0:
            raise ValueError("order must be non-negative")
