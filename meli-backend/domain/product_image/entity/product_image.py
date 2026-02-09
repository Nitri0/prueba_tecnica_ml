"""Entidad ProductImage para imágenes del producto"""

from dataclasses import dataclass
from enum import Enum


class ImageType(Enum):
    """Tipo de imagen"""
    DETAIL = "detail"           # Imagen principal del producto
    DESCRIPTION = "description"  # Imagen de la descripción


@dataclass(frozen=True)
class ProductImage:
    """
    Representa una imagen asociada al producto.

    Puede ser una imagen de detalle (galería principal) o
    una imagen de descripción (dentro del texto descriptivo).
    """
    url: str
    type: ImageType
    order: int  # Orden de visualización

    def __post_init__(self):
        """Validación de la entidad"""
        if not self.url or not self.url.strip():
            raise ValueError("url cannot be empty")

        if self.order < 0:
            raise ValueError("order must be non-negative")
