"""Entidad de dominio para variantes de producto"""

from dataclasses import dataclass
from typing import List, Optional


@dataclass(frozen=True)
class Variant:
    """Variante individual de producto (color, talla, etc.)"""
    id: str
    label: str
    value: str
    slug: str
    image: Optional[str] = None
    available: bool = True

    def __post_init__(self):
        if not self.id:
            raise ValueError("id cannot be empty")
        if not self.label:
            raise ValueError("label cannot be empty")
        if not self.slug:
            raise ValueError("slug cannot be empty")


@dataclass(frozen=True)
class VariantGroup:
    """Grupo de variantes (color, talla, material, etc.)"""
    title: str
    options: List[Variant]
    selected_id: str
    show_images: bool = False
    order: int = 0

    def __post_init__(self):
        if not self.title:
            raise ValueError("title cannot be empty")
        if not self.options:
            raise ValueError("options cannot be empty")
        if not self.selected_id:
            raise ValueError("selected_id cannot be empty")

        # Validar que selected_id existe en options
        variant_ids = [v.id for v in self.options]
        if self.selected_id not in variant_ids:
            raise ValueError(f"selected_id '{self.selected_id}' not found in options")
