"""Tests para CategoryPathService"""

import pytest
from unittest.mock import Mock
from application.service.category_path_service import CategoryPathService
from domain.category_path.entity.category_path import CategoryPath
from application.dto.detail_product_output_dto import CategoryPathItemDto


class TestCategoryPathService:
    """Tests para el servicio de CategoryPath"""

    @pytest.fixture
    def mock_repository(self):
        """Mock del CategoryPathRepository"""
        repository = Mock()
        repository.get_by_product_id.return_value = [
            CategoryPath(label="Electrónica", href="/categoria/electronica", order=0),
            CategoryPath(label="Celulares y Smartphones", href="/categoria/electronica/celulares", order=1),
            CategoryPath(label="iPhone", href="/categoria/electronica/celulares/iphone", order=2)
        ]
        return repository

    @pytest.fixture
    def mock_mapper(self):
        """Mock del CategoryPathMapper"""
        mapper = Mock()
        mapper.to_dto_list.return_value = [
            CategoryPathItemDto(label="Electrónica", href="/categoria/electronica"),
            CategoryPathItemDto(label="Celulares y Smartphones", href="/categoria/electronica/celulares"),
            CategoryPathItemDto(label="iPhone", href="/categoria/electronica/celulares/iphone")
        ]
        return mapper

    @pytest.fixture
    def service(self, mock_repository, mock_mapper):
        """Fixture que crea el servicio con mocks inyectados"""
        return CategoryPathService(
            repository=mock_repository,
            mapper=mock_mapper
        )

    def test_get_category_path_by_product_id_returns_list(self, service):
        """Debe retornar una lista de CategoryPathItemDto"""
        result = service.get_category_path_by_product_id("MLC123456789")
        assert isinstance(result, list)

    def test_get_category_path_by_product_id_returns_correct_count(self, service):
        """Debe retornar 3 elementos"""
        result = service.get_category_path_by_product_id("MLC123456789")
        assert len(result) == 3

    def test_get_category_path_by_product_id_returns_dtos(self, service):
        """Todos los elementos deben ser CategoryPathItemDto"""
        result = service.get_category_path_by_product_id("MLC123456789")
        assert all(isinstance(item, CategoryPathItemDto) for item in result)

    def test_get_category_path_by_product_id_calls_repository(self, service, mock_repository):
        """Debe llamar al repositorio con el product_id correcto"""
        product_id = "MLC123456789"
        service.get_category_path_by_product_id(product_id)

        mock_repository.get_by_product_id.assert_called_once_with(product_id)

    def test_get_category_path_by_product_id_calls_mapper(self, service, mock_mapper, mock_repository):
        """Debe llamar al mapper con las entidades del repositorio"""
        product_id = "MLC123456789"
        entities = mock_repository.get_by_product_id.return_value

        service.get_category_path_by_product_id(product_id)

        mock_mapper.to_dto_list.assert_called_once_with(entities)

    def test_get_category_path_by_product_id_returns_ordered_list(self, service):
        """Debe retornar lista ordenada por jerarquía"""
        result = service.get_category_path_by_product_id("MLC123456789")

        labels = [item.label for item in result]
        assert labels == ["Electrónica", "Celulares y Smartphones", "iPhone"]

    def test_get_category_path_by_product_id_first_element(self, service):
        """Debe retornar 'Electrónica' como primer elemento"""
        result = service.get_category_path_by_product_id("MLC123456789")

        assert result[0].label == "Electrónica"
        assert result[0].href == "/categoria/electronica"

    def test_get_category_path_by_product_id_second_element(self, service):
        """Debe retornar 'Celulares y Smartphones' como segundo elemento"""
        result = service.get_category_path_by_product_id("MLC123456789")

        assert result[1].label == "Celulares y Smartphones"
        assert result[1].href == "/categoria/electronica/celulares"

    def test_get_category_path_by_product_id_third_element(self, service):
        """Debe retornar 'iPhone' como tercer elemento"""
        result = service.get_category_path_by_product_id("MLC123456789")

        assert result[2].label == "iPhone"
        assert result[2].href == "/categoria/electronica/celulares/iphone"

    def test_get_category_path_by_product_id_with_empty_result(self, mock_repository, mock_mapper):
        """Debe manejar resultado vacío del repositorio"""
        mock_repository.get_by_product_id.return_value = []
        mock_mapper.to_dto_list.return_value = []

        service = CategoryPathService(
            repository=mock_repository,
            mapper=mock_mapper
        )

        result = service.get_category_path_by_product_id("INVALID_ID")

        assert isinstance(result, list)
        assert len(result) == 0

    def test_get_category_path_by_product_id_with_different_product(self, mock_repository, mock_mapper):
        """Debe funcionar con diferentes product_ids"""
        product_id = "MLC987654321"

        service = CategoryPathService(
            repository=mock_repository,
            mapper=mock_mapper
        )

        service.get_category_path_by_product_id(product_id)

        mock_repository.get_by_product_id.assert_called_once_with(product_id)

    def test_service_integration_with_real_repository_and_mapper(self):
        """Test de integración con repositorio y mapper reales"""
        from infrastructure.persist.category_path.category_path_repository import CategoryPathRepository
        from infrastructure.persist.category_path.category_path_mapper import CategoryPathMapper

        repository = CategoryPathRepository()
        mapper = CategoryPathMapper()
        service = CategoryPathService(repository=repository, mapper=mapper)

        result = service.get_category_path_by_product_id("MLC621083881")

        # Verificar que retorna datos correctos
        assert len(result) == 3
        assert result[0].label == "Electrónica"
        assert result[1].label == "Celulares y Smartphones"
        assert result[2].label == "iPhone"

    def test_service_preserves_hierarchy_order(self):
        """Test de integración: debe preservar el orden jerárquico"""
        from infrastructure.persist.category_path.category_path_repository import CategoryPathRepository
        from infrastructure.persist.category_path.category_path_mapper import CategoryPathMapper

        repository = CategoryPathRepository()
        mapper = CategoryPathMapper()
        service = CategoryPathService(repository=repository, mapper=mapper)

        result = service.get_category_path_by_product_id("MLC621083881")

        # Verificar que la jerarquía es correcta
        hrefs = [item.href for item in result]
        assert hrefs[0] == "/categoria/electronica"
        assert "/electronica/celulares" in hrefs[1]
        assert "/electronica/celulares/iphone" in hrefs[2]

    def test_get_category_path_by_product_id_integration_with_nonexistent_product(self):
        """Test de integración: producto inexistente debe retornar lista vacía"""
        from infrastructure.persist.category_path.category_path_repository import CategoryPathRepository
        from infrastructure.persist.category_path.category_path_mapper import CategoryPathMapper

        repository = CategoryPathRepository()
        mapper = CategoryPathMapper()
        service = CategoryPathService(repository=repository, mapper=mapper)

        result = service.get_category_path_by_product_id("NONEXISTENT")

        assert isinstance(result, list)
        assert len(result) == 0
