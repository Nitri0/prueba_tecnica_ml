from dataclasses import dataclass
from enum import Enum


class PaymentMethodType(Enum):
    """Tipo de método de pago"""
    CASH = 'cash'
    CREDIT = 'credit'
    DEBIT = 'debit'


@dataclass(frozen=True)
class Payment:
    """
    Método de pago disponible para un producto
    """
    id: str
    name: str
    image_url: str
    type: PaymentMethodType

    def __post_init__(self):
        if not self.id:
            raise ValueError("id cannot be empty")
        if not self.name:
            raise ValueError("name cannot be empty")
        if not self.image_url:
            raise ValueError("image_url cannot be empty")

