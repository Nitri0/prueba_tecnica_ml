"""Tests para entidades de Shipping"""

import pytest
from domain.shipping.entity.shipping import Shipping, EstimatedDays


class TestEstimatedDays:
    """Tests para EstimatedDays"""

    def test_create_valid_estimated_days(self):
        """Debe crear con días válidos"""
        days = EstimatedDays(min=2, max=5)
        assert days.min == 2
        assert days.max == 5

    def test_reject_negative_min(self):
        """Debe rechazar min negativo"""
        with pytest.raises(ValueError, match="min must be non-negative"):
            EstimatedDays(min=-1, max=5)

    def test_reject_negative_max(self):
        """Debe rechazar max negativo"""
        with pytest.raises(ValueError, match="max must be non-negative"):
            EstimatedDays(min=2, max=-1)

    def test_reject_min_greater_than_max(self):
        """Debe rechazar cuando min > max"""
        with pytest.raises(ValueError, match="min cannot be greater than max"):
            EstimatedDays(min=10, max=5)

    def test_allow_min_equal_max(self):
        """Debe permitir min == max"""
        days = EstimatedDays(min=3, max=3)
        assert days.min == 3
        assert days.max == 3

    def test_is_frozen(self):
        """Debe ser inmutable"""
        days = EstimatedDays(min=2, max=5)
        with pytest.raises(Exception):
            days.min = 10


class TestShipping:
    """Tests para Shipping"""

    def test_create_free_shipping(self):
        """Debe crear envío gratis"""
        days = EstimatedDays(min=1, max=3)
        shipping = Shipping(is_free=True, estimated_days=days)
        assert shipping.is_free is True

    def test_create_paid_shipping(self):
        """Debe crear envío pago"""
        days = EstimatedDays(min=5, max=10)
        shipping = Shipping(is_free=False, estimated_days=days)
        assert shipping.is_free is False
