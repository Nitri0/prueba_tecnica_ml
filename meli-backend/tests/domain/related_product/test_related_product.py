"""Tests para entidades de RelatedProduct"""

import pytest
from domain.related_product.entity.related_product import RelatedProduct


class TestRelatedProduct:
    """Tests para RelatedProduct"""

    def test_create_with_discount(self):
        """Debe crear producto con descuento"""
        p = RelatedProduct(
            id="MLC123",
            title="iPhone 15",
            price=1500000,
            original_price=1700000,
            image="img.jpg",
            discount=12,
            installments=12,
            installment_amount=125000,
            is_free_shipping=True,
            is_first_purchase_free_shipping=False
        )
        assert p.discount == 12
        assert p.original_price == 1700000

    def test_create_without_discount(self):
        """Debe crear producto sin descuento"""
        p = RelatedProduct(
            id="MLC456",
            title="Samsung S24",
            price=1300000,
            original_price=None,
            image="img.jpg",
            discount=None,
            installments=6,
            installment_amount=216666,
            is_free_shipping=False,
            is_first_purchase_free_shipping=True
        )
        assert p.discount is None
        assert p.original_price is None

    def test_reject_empty_id(self):
        """Debe rechazar ID vacío"""
        with pytest.raises(ValueError, match="id cannot be empty"):
            RelatedProduct(
                id="",
                title="Test",
                price=100,
                original_price=None,
                image="img.jpg",
                discount=None,
                installments=1,
                installment_amount=100,
                is_free_shipping=True,
                is_first_purchase_free_shipping=False
            )

    def test_reject_negative_price(self):
        """Debe rechazar precio negativo"""
        with pytest.raises(ValueError, match="price must be non-negative"):
            RelatedProduct(
                id="p1",
                title="Test",
                price=-100,
                original_price=None,
                image="img.jpg",
                discount=None,
                installments=1,
                installment_amount=0,
                is_free_shipping=True,
                is_first_purchase_free_shipping=False
            )

    def test_reject_invalid_discount(self):
        """Debe rechazar descuento inválido"""
        with pytest.raises(ValueError, match="discount must be between 0 and 100"):
            RelatedProduct(
                id="p1",
                title="Test",
                price=1000,
                original_price=1200,
                image="img.jpg",
                discount=150,  # Inválido
                installments=1,
                installment_amount=1000,
                is_free_shipping=True,
                is_first_purchase_free_shipping=False
            )
