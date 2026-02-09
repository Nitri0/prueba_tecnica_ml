"""Tests para entidad Payment"""

import pytest
from domain.payment.entity.payment import Payment, PaymentMethodType


class TestPayment:
    """Tests para Payment"""

    def test_create_credit_payment(self):
        """Debe crear método de pago crédito"""
        payment = Payment(
            id="visa",
            name="Visa",
            image_url="https://example.com/visa.svg",
            type=PaymentMethodType.CREDIT
        )
        assert payment.id == "visa"
        assert payment.name == "Visa"
        assert payment.type == PaymentMethodType.CREDIT

    def test_create_debit_payment(self):
        """Debe crear método de pago débito"""
        payment = Payment(
            id="debit",
            name="Débito",
            image_url="https://example.com/debit.svg",
            type=PaymentMethodType.DEBIT
        )
        assert payment.type == PaymentMethodType.DEBIT

    def test_create_cash_payment(self):
        """Debe crear método de pago efectivo"""
        payment = Payment(
            id="cash",
            name="Efectivo",
            image_url="https://example.com/cash.svg",
            type=PaymentMethodType.CASH
        )
        assert payment.type == PaymentMethodType.CASH

    def test_reject_empty_id(self):
        """Debe rechazar ID vacío"""
        with pytest.raises(ValueError, match="id cannot be empty"):
            Payment(
                id="",
                name="Test",
                image_url="url",
                type=PaymentMethodType.CREDIT
            )

    def test_reject_empty_name(self):
        """Debe rechazar nombre vacío"""
        with pytest.raises(ValueError, match="name cannot be empty"):
            Payment(
                id="test",
                name="",
                image_url="url",
                type=PaymentMethodType.CREDIT
            )

    def test_reject_empty_image_url(self):
        """Debe rechazar image_url vacía"""
        with pytest.raises(ValueError, match="image_url cannot be empty"):
            Payment(
                id="test",
                name="Test",
                image_url="",
                type=PaymentMethodType.CREDIT
            )
