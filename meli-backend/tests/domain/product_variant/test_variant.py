"""Tests para entidades de Variant"""

import pytest
from domain.product_variant.entity.variant import Variant, VariantGroup


class TestVariant:
    """Tests para Variant"""

    def test_create_variant_with_image(self):
        """Debe crear variante con imagen"""
        v = Variant(
            id="color-blue",
            label="Azul",
            value="Azul",
            slug="azul",
            image="https://example.com/blue.jpg",
            available=True
        )
        assert v.image is not None

    def test_create_variant_without_image(self):
        """Debe crear variante sin imagen"""
        v = Variant(
            id="size-256gb",
            label="256 GB",
            value="256 GB",
            slug="256gb"
        )
        assert v.image is None
        assert v.available is True  # Default

    def test_reject_empty_id(self):
        """Debe rechazar ID vacío"""
        with pytest.raises(ValueError, match="id cannot be empty"):
            Variant(id="", label="Test", value="Test", slug="test")

    def test_reject_empty_label(self):
        """Debe rechazar label vacío"""
        with pytest.raises(ValueError, match="label cannot be empty"):
            Variant(id="v1", label="", value="Test", slug="test")

    def test_reject_empty_slug(self):
        """Debe rechazar slug vacío"""
        with pytest.raises(ValueError, match="slug cannot be empty"):
            Variant(id="v1", label="Test", value="Test", slug="")


class TestVariantGroup:
    """Tests para VariantGroup"""

    def test_create_variant_group(self):
        """Debe crear grupo de variantes"""
        variants = [
            Variant(id="v1", label="Opción 1", value="V1", slug="v1"),
            Variant(id="v2", label="Opción 2", value="V2", slug="v2")
        ]
        group = VariantGroup(
            title="Color",
            options=variants,
            selected_id="v1",
            show_images=True,
            order=0
        )
        assert len(group.options) == 2
        assert group.selected_id == "v1"

    def test_reject_empty_title(self):
        """Debe rechazar título vacío"""
        variants = [Variant(id="v1", label="V1", value="V1", slug="v1")]
        with pytest.raises(ValueError, match="title cannot be empty"):
            VariantGroup(title="", options=variants, selected_id="v1")

    def test_reject_empty_options(self):
        """Debe rechazar opciones vacías"""
        with pytest.raises(ValueError, match="options cannot be empty"):
            VariantGroup(title="Color", options=[], selected_id="v1")

    def test_reject_empty_selected_id(self):
        """Debe rechazar selected_id vacío"""
        variants = [Variant(id="v1", label="V1", value="V1", slug="v1")]
        with pytest.raises(ValueError, match="selected_id cannot be empty"):
            VariantGroup(title="Color", options=variants, selected_id="")

    def test_reject_invalid_selected_id(self):
        """Debe rechazar selected_id que no existe en options"""
        variants = [
            Variant(id="v1", label="V1", value="V1", slug="v1"),
            Variant(id="v2", label="V2", value="V2", slug="v2")
        ]
        with pytest.raises(ValueError, match="not found in options"):
            VariantGroup(title="Color", options=variants, selected_id="v3")

    def test_accept_valid_selected_id(self):
        """Debe aceptar selected_id válido"""
        variants = [
            Variant(id="v1", label="V1", value="V1", slug="v1"),
            Variant(id="v2", label="V2", value="V2", slug="v2")
        ]
        group = VariantGroup(title="Size", options=variants, selected_id="v2")
        assert group.selected_id == "v2"
