"""Tests para ProductVariantMapping entity"""

import pytest
from domain.product_variant.entity.product_variant_mapping import ProductVariantMapping


class TestProductVariantMapping:
    """Tests para la entidad ProductVariantMapping"""

    def test_create_product_variant_mapping_with_valid_data(self):
        """Debe crear una instancia válida de ProductVariantMapping"""
        mapping = ProductVariantMapping(
            base_product_id="MLC123456789",
            variant_combination={"color": "azul", "capacidad": "256gb"},
            product_variant_id="MLC123456789-AZU-256"
        )

        assert mapping.base_product_id == "MLC123456789"
        assert mapping.variant_combination == {"color": "azul", "capacidad": "256gb"}
        assert mapping.product_variant_id == "MLC123456789-AZU-256"

    def test_product_variant_mapping_is_frozen(self):
        """Debe ser inmutable (frozen dataclass)"""
        mapping = ProductVariantMapping(
            base_product_id="MLC123456789",
            variant_combination={"color": "azul", "capacidad": "256gb"},
            product_variant_id="MLC123456789-AZU-256"
        )

        with pytest.raises(AttributeError):
            mapping.base_product_id = "NEW_ID"

    def test_product_variant_mapping_with_empty_base_product_id(self):
        """Debe fallar si base_product_id está vacío"""
        with pytest.raises(ValueError, match="base_product_id cannot be empty"):
            ProductVariantMapping(
                base_product_id="",
                variant_combination={"color": "azul"},
                product_variant_id="MLC123456789-AZU-256"
            )

    def test_product_variant_mapping_with_whitespace_base_product_id(self):
        """Debe fallar si base_product_id es solo espacios"""
        with pytest.raises(ValueError, match="base_product_id cannot be empty"):
            ProductVariantMapping(
                base_product_id="   ",
                variant_combination={"color": "azul"},
                product_variant_id="MLC123456789-AZU-256"
            )

    def test_product_variant_mapping_with_empty_variant_combination(self):
        """Debe fallar si variant_combination está vacío"""
        with pytest.raises(ValueError, match="variant_combination cannot be empty"):
            ProductVariantMapping(
                base_product_id="MLC123456789",
                variant_combination={},
                product_variant_id="MLC123456789-AZU-256"
            )

    def test_product_variant_mapping_with_empty_product_variant_id(self):
        """Debe fallar si product_variant_id está vacío"""
        with pytest.raises(ValueError, match="product_variant_id cannot be empty"):
            ProductVariantMapping(
                base_product_id="MLC123456789",
                variant_combination={"color": "azul"},
                product_variant_id=""
            )

    def test_product_variant_mapping_with_whitespace_product_variant_id(self):
        """Debe fallar si product_variant_id es solo espacios"""
        with pytest.raises(ValueError, match="product_variant_id cannot be empty"):
            ProductVariantMapping(
                base_product_id="MLC123456789",
                variant_combination={"color": "azul"},
                product_variant_id="   "
            )

    def test_product_variant_mapping_with_single_variant(self):
        """Debe permitir una sola variante"""
        mapping = ProductVariantMapping(
            base_product_id="MLC123456789",
            variant_combination={"color": "azul"},
            product_variant_id="MLC123456789-AZU"
        )

        assert len(mapping.variant_combination) == 1
        assert mapping.variant_combination["color"] == "azul"

    def test_product_variant_mapping_with_multiple_variants(self):
        """Debe permitir múltiples variantes"""
        mapping = ProductVariantMapping(
            base_product_id="MLC123456789",
            variant_combination={
                "color": "azul",
                "capacidad": "256gb",
                "material": "titanio"
            },
            product_variant_id="MLC123456789-AZU-256-TIT"
        )

        assert len(mapping.variant_combination) == 3
        assert mapping.variant_combination["color"] == "azul"
        assert mapping.variant_combination["capacidad"] == "256gb"
        assert mapping.variant_combination["material"] == "titanio"

    def test_product_variant_mapping_equality(self):
        """Dos instancias con mismos valores deben ser iguales"""
        mapping1 = ProductVariantMapping(
            base_product_id="MLC123456789",
            variant_combination={"color": "azul", "capacidad": "256gb"},
            product_variant_id="MLC123456789-AZU-256"
        )

        mapping2 = ProductVariantMapping(
            base_product_id="MLC123456789",
            variant_combination={"color": "azul", "capacidad": "256gb"},
            product_variant_id="MLC123456789-AZU-256"
        )

        assert mapping1 == mapping2

    def test_product_variant_mapping_inequality_different_base_id(self):
        """Deben ser diferentes si base_product_id difiere"""
        mapping1 = ProductVariantMapping(
            base_product_id="MLC123456789",
            variant_combination={"color": "azul"},
            product_variant_id="MLC123456789-AZU"
        )

        mapping2 = ProductVariantMapping(
            base_product_id="MLC987654321",
            variant_combination={"color": "azul"},
            product_variant_id="MLC987654321-AZU"
        )

        assert mapping1 != mapping2

    def test_product_variant_mapping_inequality_different_variant_combination(self):
        """Deben ser diferentes si variant_combination difiere"""
        mapping1 = ProductVariantMapping(
            base_product_id="MLC123456789",
            variant_combination={"color": "azul"},
            product_variant_id="MLC123456789-AZU"
        )

        mapping2 = ProductVariantMapping(
            base_product_id="MLC123456789",
            variant_combination={"color": "negro"},
            product_variant_id="MLC123456789-NEG"
        )

        assert mapping1 != mapping2

    def test_product_variant_mapping_string_representation(self):
        """Debe tener representación en string legible"""
        mapping = ProductVariantMapping(
            base_product_id="MLC123456789",
            variant_combination={"color": "azul", "capacidad": "256gb"},
            product_variant_id="MLC123456789-AZU-256"
        )

        # Verificar que tiene representación string
        str_repr = str(mapping)
        assert "MLC123456789" in str_repr
        assert "MLC123456789-AZU-256" in str_repr
