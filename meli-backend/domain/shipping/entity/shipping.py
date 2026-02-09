"""Entidad de dominio para información de envío"""

from dataclasses import dataclass


@dataclass(frozen=True)
class EstimatedDays:
    """Rango de días estimados de envío"""
    min: int
    max: int

    def __post_init__(self):
        if self.min < 0:
            raise ValueError("min must be non-negative")
        if self.max < 0:
            raise ValueError("max must be non-negative")
        if self.min > self.max:
            raise ValueError("min cannot be greater than max")


@dataclass(frozen=True)
class Shipping:
    """Información de envío del producto"""
    is_free: bool
    estimated_days: EstimatedDays
