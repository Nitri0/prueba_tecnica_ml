"""Entidad Review del dominio"""

from dataclasses import dataclass
from typing import Optional, List, Dict


@dataclass(frozen=True)
class Review:
    """Entidad que representa una reseña de producto"""
    id: str
    user_name: str
    rating: float
    date: str
    comment: str
    likes: int
    verified: bool
    images: Optional[List[str]] = None
    category_ratings: Optional[Dict[str, int]] = None

    def __post_init__(self):
        if not self.id:
            raise ValueError("id cannot be empty")
        if not self.user_name:
            raise ValueError("user_name cannot be empty")
        if not (0 <= self.rating <= 5):
            raise ValueError("rating must be between 0 and 5")
        if self.likes < 0:
            raise ValueError("likes must be non-negative")
