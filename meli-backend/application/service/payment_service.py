"""Servicio para métodos de pago"""

from typing import List
from application.dto.detail_product_output_dto import PaymentMethodDto
from infrastructure.persist.payment.payment_repository import PaymentRepository


class PaymentService:
    """Servicio para obtener métodos de pago"""

    def __init__(self, repository: PaymentRepository = None):
        self.repository = repository or PaymentRepository()

    def get_payment_methods_by_product_id(self, product_id: str) -> List[PaymentMethodDto]:
        """Obtiene métodos de pago desde CSV"""
        payments = self.repository.get_all()
        return [
            PaymentMethodDto(
                id=p.id,
                name=p.name,
                image_url=p.image_url,
                type=p.type
            )
            for p in payments
        ]

    def get_max_installments(self) -> int:
        """Obtiene el número máximo de cuotas disponible"""
        return self.repository.get_max_installments()
