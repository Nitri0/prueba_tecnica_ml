from dataclasses import dataclass
from enum import Enum


class SellerLevel(Enum):
    """Nivel de reputación del vendedor"""
    BRONZE = "bronze"
    SILVER = "silver"
    GOLD = "gold"
    PLATINUM = "platinum"


@dataclass(frozen=True)
class Reputation:
    """Distribución de reputación del vendedor (debe sumar 100)"""
    red: int
    orange: int
    yellow: int
    green: int

    def __post_init__(self):
        total = self.red + self.orange + self.yellow + self.green
        if total != 100:
            raise ValueError(f"Reputation must sum to 100, got {total}")


@dataclass(frozen=True)
class SellerInformation:
    """Información completa del vendedor"""
    name: str
    logo: str
    is_official_store: bool
    followers: int
    total_products: int
    level: SellerLevel
    location: str
    positive_rating: float
    total_sales: int
    rating: float
    review_count: int
    reputation: Reputation
    reputation_message: str
    good_attention: bool
    on_time_delivery: bool

    def __post_init__(self):
        if not self.name:
            raise ValueError("name cannot be empty")
        if self.followers < 0:
            raise ValueError("followers must be non-negative")
        if self.total_products < 0:
            raise ValueError("total_products must be non-negative")
        if self.positive_rating < 0 or self.positive_rating > 100:
            raise ValueError("positive_rating must be between 0 and 100")
        if self.total_sales < 0:
            raise ValueError("total_sales must be non-negative")
        if self.rating < 0 or self.rating > 5:
            raise ValueError("rating must be between 0 and 5")
        if self.review_count < 0:
            raise ValueError("review_count must be non-negative")
