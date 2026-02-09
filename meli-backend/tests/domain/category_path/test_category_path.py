"""Tests para entidad CategoryPath"""

import pytest
from domain.category_path.entity.category_path import CategoryPath


class TestCategoryPath:
    """Tests para la entidad CategoryPath"""

    def test_create_category_path_with_valid_data(self):
        """Debe crear CategoryPath con datos válidos"""
        category = CategoryPath(
            label="Electrónica",
            href="/categoria/electronica",
            order=0
        )
        assert category.label == "Electrónica"
        assert category.href == "/categoria/electronica"
        assert category.order == 0

    def test_create_category_path_with_different_order(self):
        """Debe crear CategoryPath con diferentes valores de order"""
        category1 = CategoryPath(label="Cat1", href="/cat1", order=0)
        category2 = CategoryPath(label="Cat2", href="/cat2", order=1)
        category3 = CategoryPath(label="Cat3", href="/cat3", order=5)

        assert category1.order == 0
        assert category2.order == 1
        assert category3.order == 5

    def test_reject_empty_label(self):
        """Debe rechazar label vacío"""
        with pytest.raises(ValueError, match="label cannot be empty"):
            CategoryPath(label="", href="/categoria", order=0)

    def test_reject_whitespace_only_label(self):
        """Debe rechazar label con solo espacios en blanco"""
        with pytest.raises(ValueError, match="label cannot be empty"):
            CategoryPath(label="   ", href="/categoria", order=0)

    def test_reject_empty_href(self):
        """Debe rechazar href vacío"""
        with pytest.raises(ValueError, match="href cannot be empty"):
            CategoryPath(label="Electrónica", href="", order=0)

    def test_reject_whitespace_only_href(self):
        """Debe rechazar href con solo espacios en blanco"""
        with pytest.raises(ValueError, match="href cannot be empty"):
            CategoryPath(label="Electrónica", href="   ", order=0)

    def test_reject_negative_order(self):
        """Debe rechazar order negativo"""
        with pytest.raises(ValueError, match="order must be non-negative"):
            CategoryPath(
                label="Electrónica",
                href="/categoria/electronica",
                order=-1
            )

    def test_accept_zero_order(self):
        """Debe aceptar order en 0"""
        category = CategoryPath(
            label="Electrónica",
            href="/categoria/electronica",
            order=0
        )
        assert category.order == 0

    def test_is_frozen(self):
        """Debe ser inmutable (frozen)"""
        category = CategoryPath(
            label="Electrónica",
            href="/categoria/electronica",
            order=0
        )
        with pytest.raises(Exception):  # FrozenInstanceError
            category.label = "Otro"

    def test_label_with_special_characters(self):
        """Debe aceptar labels con caracteres especiales"""
        category = CategoryPath(
            label="Celulares y Smartphones",
            href="/categoria/celulares",
            order=1
        )
        assert category.label == "Celulares y Smartphones"

    def test_href_with_deep_path(self):
        """Debe aceptar href con rutas profundas"""
        category = CategoryPath(
            label="iPhone",
            href="/categoria/electronica/celulares/iphone",
            order=2
        )
        assert category.href == "/categoria/electronica/celulares/iphone"

    def test_large_order_value(self):
        """Debe aceptar valores grandes de order"""
        category = CategoryPath(
            label="Subcategoría",
            href="/categoria/sub",
            order=999
        )
        assert category.order == 999
