"""Tests para entidades de Characteristic"""

import pytest
from domain.characteristic.entity.characteristic import (
    SimpleCharacteristic,
    RangeCharacteristic,
    HighlightCharacteristic,
    CategoryCharacteristic,
    CharacteristicType
)


class TestSimpleCharacteristic:
    """Tests para SimpleCharacteristic"""

    def test_create_simple_characteristic(self):
        """Debe crear característica simple"""
        c = SimpleCharacteristic(name="Marca", value="Apple")
        assert c.name == "Marca"
        assert c.value == "Apple"

    def test_reject_empty_name(self):
        """Debe rechazar nombre vacío"""
        with pytest.raises(ValueError, match="name cannot be empty"):
            SimpleCharacteristic(name="", value="Apple")

    def test_reject_empty_value(self):
        """Debe rechazar valor vacío"""
        with pytest.raises(ValueError, match="value cannot be empty"):
            SimpleCharacteristic(name="Marca", value="")


class TestRangeCharacteristic:
    """Tests para RangeCharacteristic"""

    def test_create_range_characteristic(self):
        """Debe crear característica de rango"""
        c = RangeCharacteristic(
            type=CharacteristicType.RANGE,
            name="Pantalla",
            value="6.7 pulgadas",
            current=6.7,
            min=4.0,
            max=7.0,
            min_label="PEQUEÑO",
            max_label="GRANDE",
            icon="Smartphone",
            segments=5
        )
        assert c.current == 6.7
        assert c.min == 4.0

    def test_reject_wrong_type(self):
        """Debe rechazar tipo incorrecto"""
        with pytest.raises(ValueError, match="type must be RANGE"):
            RangeCharacteristic(
                type=CharacteristicType.HIGHLIGHT,  # Wrong!
                name="Test",
                value="Test",
                current=50.0,
                min=0.0,
                max=100.0,
                min_label="MIN",
                max_label="MAX"
            )

    def test_reject_invalid_current(self):
        """Debe rechazar current fuera de rango"""
        with pytest.raises(ValueError, match="current must be between min"):
            RangeCharacteristic(
                type=CharacteristicType.RANGE,
                name="Test",
                value="Test",
                current=150.0,  # Invalid - fuera del rango 0-100
                min=0.0,
                max=100.0,
                min_label="MIN",
                max_label="MAX"
            )

    def test_reject_min_greater_than_max(self):
        """Debe rechazar min > max"""
        with pytest.raises(ValueError, match="min cannot be greater than max|current must be between min"):
            RangeCharacteristic(
                type=CharacteristicType.RANGE,
                name="Test",
                value="Test",
                current=75.0,
                min=100.0,
                max=50,
                min_label="MIN",
                max_label="MAX"
            )

    def test_segments_has_default_value(self):
        """Debe tener valor por defecto 5 cuando no se especifica"""
        char = RangeCharacteristic(
            type=CharacteristicType.RANGE,
            name="Pantalla",
            value="6.7 pulgadas",
            current=6.7,
            min=4.0,
            max=8.0,
            min_label="PEQUEÑO",
            max_label="GRANDE"
            # segments no especificado, debe usar default=5
        )
        assert char.segments == 5

    def test_segments_accepts_positive_value(self):
        """Debe aceptar segments con valor positivo"""
        char = RangeCharacteristic(
            type=CharacteristicType.RANGE,
            name="Pantalla",
            value="6.7 pulgadas",
            current=6.7,
            min=4.0,
            max=8.0,
            min_label="PEQUEÑO",
            max_label="GRANDE",
            segments=7
        )
        assert char.segments == 7

    def test_reject_segments_zero(self):
        """Debe rechazar segments con valor 0"""
        with pytest.raises(ValueError, match="segments must be positive"):
            RangeCharacteristic(
                type=CharacteristicType.RANGE,
                name="Test",
                value="Test",
                current=5.0,
                min=0.0,
                max=10.0,
                min_label="MIN",
                max_label="MAX",
                segments=0  # Inválido
            )

    def test_reject_segments_negative(self):
        """Debe rechazar segments con valor negativo"""
        with pytest.raises(ValueError, match="segments must be positive"):
            RangeCharacteristic(
                type=CharacteristicType.RANGE,
                name="Test",
                value="Test",
                current=5.0,
                min=0.0,
                max=10.0,
                min_label="MIN",
                max_label="MAX",
                segments=-1  # Inválido
            )


class TestHighlightCharacteristic:
    """Tests para HighlightCharacteristic"""

    def test_create_highlight_characteristic(self):
        """Debe crear característica destacada"""
        c = HighlightCharacteristic(
            type=CharacteristicType.HIGHLIGHT,
            name="Procesador",
            value="A17 Pro",
            icon="Cpu"
        )
        assert c.value == "A17 Pro"
        assert c.icon == "Cpu"

    def test_reject_wrong_type(self):
        """Debe rechazar tipo incorrecto"""
        with pytest.raises(ValueError, match="type must be HIGHLIGHT"):
            HighlightCharacteristic(
                type=CharacteristicType.RANGE,
                name="Test",
                value="Test",
                icon="Icon"
            )


class TestCategoryCharacteristic:
    """Tests para CategoryCharacteristic"""

    def test_create_category_characteristic(self):
        """Debe crear característica de categoría"""
        chars = [
            SimpleCharacteristic(name="Marca", value="Apple"),
            SimpleCharacteristic(name="Modelo", value="iPhone")
        ]
        c = CategoryCharacteristic(
            type=CharacteristicType.CATEGORY,
            category_name="Especificaciones",
            characteristics=chars
        )
        assert len(c.characteristics) == 2

    def test_reject_empty_characteristics(self):
        """Debe rechazar lista vacía de características"""
        with pytest.raises(ValueError, match="characteristics cannot be empty"):
            CategoryCharacteristic(
                type=CharacteristicType.CATEGORY,
                category_name="Test",
                characteristics=[]
            )
