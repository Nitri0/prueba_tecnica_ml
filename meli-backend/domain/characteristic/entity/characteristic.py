"""Entidades de dominio para características de producto"""

from dataclasses import dataclass
from enum import Enum
from typing import List, Optional


class CharacteristicType(Enum):
    """Tipo de característica de producto"""
    RANGE = "range"
    HIGHLIGHT = "highlight"
    CATEGORY = "category"


@dataclass(frozen=True)
class SimpleCharacteristic:
    """Característica simple (nombre-valor)"""
    name: str
    value: str

    def __post_init__(self):
        if not self.name:
            raise ValueError("name cannot be empty")
        if not self.value:
            raise ValueError("value cannot be empty")


@dataclass(frozen=True)
class RangeCharacteristic:
    """Característica con rango visual (ej: tamaño de pantalla)"""
    type: CharacteristicType
    name: str
    value: str
    current: float  # Valor actual en el rango
    min: float      # Valor mínimo del rango
    max: float      # Valor máximo del rango
    min_label: str
    max_label: str
    icon: Optional[str] = None
    segments: int = 5  # Número de segmentos en la barra (default: 5)

    def __post_init__(self):
        if self.type != CharacteristicType.RANGE:
            raise ValueError("type must be RANGE")
        if not self.name:
            raise ValueError("name cannot be empty")
        if self.current < self.min or self.current > self.max:
            raise ValueError(f"current must be between min ({self.min}) and max ({self.max})")
        if self.min > self.max:
            raise ValueError("min cannot be greater than max")
        if self.segments < 1:
            raise ValueError("segments must be positive")


@dataclass(frozen=True)
class HighlightCharacteristic:
    """Característica destacada con ícono"""
    type: CharacteristicType
    name: str
    value: str
    icon: str

    def __post_init__(self):
        if self.type != CharacteristicType.HIGHLIGHT:
            raise ValueError("type must be HIGHLIGHT")
        if not self.name:
            raise ValueError("name cannot be empty")
        if not self.value:
            raise ValueError("value cannot be empty")
        if not self.icon:
            raise ValueError("icon cannot be empty")


@dataclass(frozen=True)
class CategoryCharacteristic:
    """Grupo de características por categoría"""
    type: CharacteristicType
    category_name: str
    characteristics: List[SimpleCharacteristic]

    def __post_init__(self):
        if self.type != CharacteristicType.CATEGORY:
            raise ValueError("type must be CATEGORY")
        if not self.category_name:
            raise ValueError("category_name cannot be empty")
        if not self.characteristics:
            raise ValueError("characteristics cannot be empty")
