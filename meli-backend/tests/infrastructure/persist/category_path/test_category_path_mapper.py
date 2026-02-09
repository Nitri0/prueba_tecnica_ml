"""Tests para CategoryPathMapper"""

import pytest
from domain.category_path.entity.category_path import CategoryPath
from application.dto.detail_product_output_dto import CategoryPathItemDto
from infrastructure.persist.category_path.category_path_mapper import CategoryPathMapper


class TestCategoryPathMapper:
    """Tests para el mapper de CategoryPath"""

    @pytest.fixture
    def mapper(self):
        """Fixture que crea una instancia del mapper"""
        return CategoryPathMapper()

    @pytest.fixture
    def sample_entity(self):
        """Fixture con una entidad de ejemplo"""
        return CategoryPath(
            label="Electrónica",
            href="/categoria/electronica",
            order=0
        )

    @pytest.fixture
    def sample_entities(self):
        """Fixture con lista de entidades de ejemplo"""
        return [
            CategoryPath(label="Electrónica", href="/categoria/electronica", order=0),
            CategoryPath(label="Celulares y Smartphones", href="/categoria/electronica/celulares", order=1),
            CategoryPath(label="iPhone", href="/categoria/electronica/celulares/iphone", order=2)
        ]

    def test_to_dto_returns_category_path_item_dto(self, mapper, sample_entity):
        """Debe retornar un CategoryPathItemDto"""
        result = mapper.to_dto(sample_entity)
        assert isinstance(result, CategoryPathItemDto)

    def test_to_dto_maps_label_correctly(self, mapper, sample_entity):
        """Debe mapear el label correctamente"""
        result = mapper.to_dto(sample_entity)
        assert result.label == "Electrónica"

    def test_to_dto_maps_href_correctly(self, mapper, sample_entity):
        """Debe mapear el href correctamente"""
        result = mapper.to_dto(sample_entity)
        assert result.href == "/categoria/electronica"

    def test_to_dto_does_not_include_order_in_dto(self, mapper, sample_entity):
        """El DTO no debe incluir el campo 'order' (es solo para ordenamiento interno)"""
        result = mapper.to_dto(sample_entity)
        # CategoryPathItemDto solo tiene label y href, no order
        assert hasattr(result, 'label')
        assert hasattr(result, 'href')
        assert not hasattr(result, 'order')

    def test_to_dto_with_different_entity(self, mapper):
        """Debe mapear correctamente diferentes entidades"""
        entity = CategoryPath(
            label="iPhone",
            href="/categoria/electronica/celulares/iphone",
            order=2
        )
        result = mapper.to_dto(entity)

        assert result.label == "iPhone"
        assert result.href == "/categoria/electronica/celulares/iphone"

    def test_to_dto_list_returns_list(self, mapper, sample_entities):
        """Debe retornar una lista de DTOs"""
        result = mapper.to_dto_list(sample_entities)
        assert isinstance(result, list)

    def test_to_dto_list_returns_correct_count(self, mapper, sample_entities):
        """Debe retornar el mismo número de elementos"""
        result = mapper.to_dto_list(sample_entities)
        assert len(result) == 3

    def test_to_dto_list_all_items_are_dtos(self, mapper, sample_entities):
        """Todos los elementos deben ser CategoryPathItemDto"""
        result = mapper.to_dto_list(sample_entities)
        assert all(isinstance(item, CategoryPathItemDto) for item in result)

    def test_to_dto_list_preserves_order(self, mapper, sample_entities):
        """Debe preservar el orden de la lista"""
        result = mapper.to_dto_list(sample_entities)

        assert result[0].label == "Electrónica"
        assert result[1].label == "Celulares y Smartphones"
        assert result[2].label == "iPhone"

    def test_to_dto_list_maps_all_fields_correctly(self, mapper, sample_entities):
        """Debe mapear todos los campos correctamente para cada elemento"""
        result = mapper.to_dto_list(sample_entities)

        # Primer elemento
        assert result[0].label == "Electrónica"
        assert result[0].href == "/categoria/electronica"

        # Segundo elemento
        assert result[1].label == "Celulares y Smartphones"
        assert result[1].href == "/categoria/electronica/celulares"

        # Tercer elemento
        assert result[2].label == "iPhone"
        assert result[2].href == "/categoria/electronica/celulares/iphone"

    def test_to_dto_list_with_empty_list(self, mapper):
        """Debe manejar lista vacía correctamente"""
        result = mapper.to_dto_list([])
        assert isinstance(result, list)
        assert len(result) == 0

    def test_to_dto_list_with_single_element(self, mapper):
        """Debe manejar lista con un solo elemento"""
        entities = [CategoryPath(label="Test", href="/test", order=0)]
        result = mapper.to_dto_list(entities)

        assert len(result) == 1
        assert result[0].label == "Test"
        assert result[0].href == "/test"

    def test_to_dto_static_method(self):
        """to_dto debe ser un método estático"""
        entity = CategoryPath(label="Test", href="/test", order=0)
        result = CategoryPathMapper.to_dto(entity)
        assert isinstance(result, CategoryPathItemDto)

    def test_to_dto_list_static_method(self):
        """to_dto_list debe ser un método estático"""
        entities = [CategoryPath(label="Test", href="/test", order=0)]
        result = CategoryPathMapper.to_dto_list(entities)
        assert isinstance(result, list)
        assert len(result) == 1

    def test_to_dto_with_special_characters(self, mapper):
        """Debe manejar caracteres especiales correctamente"""
        entity = CategoryPath(
            label="Artículos & Accesorios",
            href="/categoria/articulos-accesorios",
            order=0
        )
        result = mapper.to_dto(entity)

        assert result.label == "Artículos & Accesorios"
        assert result.href == "/categoria/articulos-accesorios"

    def test_dto_is_frozen(self, mapper, sample_entity):
        """El DTO retornado debe ser inmutable"""
        result = mapper.to_dto(sample_entity)
        with pytest.raises(Exception):  # FrozenInstanceError
            result.label = "Modified"
