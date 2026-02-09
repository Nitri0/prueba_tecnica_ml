"""Tests para entidad RatingCategory"""

import pytest
from domain.review.entity.rating_category import RatingCategory


class TestRatingCategory:
    """Tests para RatingCategory"""

    def test_create_with_order(self):
        """Debe crear categoría con orden"""
        cat = RatingCategory(id="camera", name="Calidad de cámara", order=1)
        assert cat.id == "camera"
        assert cat.name == "Calidad de cámara"
        assert cat.order == 1

    def test_create_with_default_order(self):
        """Debe crear con orden por defecto (0)"""
        cat = RatingCategory(id="battery", name="Batería")
        assert cat.order == 0

    def test_reject_empty_id(self):
        """Debe rechazar ID vacío"""
        with pytest.raises(ValueError, match="id cannot be empty"):
            RatingCategory(id="", name="Test")

    def test_reject_empty_name(self):
        """Debe rechazar nombre vacío"""
        with pytest.raises(ValueError, match="name cannot be empty"):
            RatingCategory(id="test", name="")

    def test_reject_negative_order(self):
        """Debe rechazar orden negativo"""
        with pytest.raises(ValueError, match="order must be non-negative"):
            RatingCategory(id="test", name="Test", order=-1)

    def test_is_frozen(self):
        """Debe ser inmutable"""
        cat = RatingCategory(id="test", name="Test")
        with pytest.raises(Exception):
            cat.name = "Changed"
