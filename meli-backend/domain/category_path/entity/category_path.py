"""Entidad CategoryPath para navegación de categorías"""

from dataclasses import dataclass


@dataclass(frozen=True)
class CategoryPath:
    """
    Representa un elemento en la ruta de navegación de categorías.

    Ejemplo: Electrónica > Celulares y Smartphones > iPhone
    """
    label: str      # Nombre de la categoría (ej: "iPhone")
    href: str       # URL de la categoría (ej: "/categoria/electronica/celulares/iphone")
    order: int      # Orden en la ruta (ej: 0, 1, 2)

    def __post_init__(self):
        """Validación de la entidad"""
        if not self.label or not self.label.strip():
            raise ValueError("label cannot be empty")

        if not self.href or not self.href.strip():
            raise ValueError("href cannot be empty")

        if self.order < 0:
            raise ValueError("order must be non-negative")
