"""Tests para CategoryPathRepository"""

import pytest
from infrastructure.persist.category_path.category_path_repository import CategoryPathRepository
from domain.category_path.entity.category_path import CategoryPath


class TestCategoryPathRepository:
    """Tests para el repositorio de CategoryPath"""

    @pytest.fixture
    def repository(self):
        """Fixture que crea una instancia del repositorio"""
        return CategoryPathRepository()

    def test_get_by_product_id_returns_list(self, repository):
        """Debe retornar una lista de CategoryPath"""
        result = repository.get_by_product_id("MLC621083881")
        assert isinstance(result, list)

    def test_get_by_product_id_returns_correct_count(self, repository):
        """Debe retornar 3 elementos para MLC621083881"""
        result = repository.get_by_product_id("MLC621083881")
        assert len(result) == 3

    def test_get_by_product_id_returns_category_path_entities(self, repository):
        """Debe retornar entidades de tipo CategoryPath"""
        result = repository.get_by_product_id("MLC621083881")
        assert all(isinstance(item, CategoryPath) for item in result)

    def test_get_by_product_id_returns_ordered_by_order_field(self, repository):
        """Debe retornar elementos ordenados por el campo 'order'"""
        result = repository.get_by_product_id("MLC621083881")

        # Verificar que están ordenados
        orders = [cp.order for cp in result]
        assert orders == sorted(orders)

        # Verificar el orden específico
        assert result[0].order == 0
        assert result[1].order == 1
        assert result[2].order == 2

    def test_get_by_product_id_returns_correct_first_category(self, repository):
        """Debe retornar 'Electrónica' como primera categoría"""
        result = repository.get_by_product_id("MLC621083881")

        assert result[0].label == "Electrónica"
        assert result[0].href == "/categoria/electronica"
        assert result[0].order == 0

    def test_get_by_product_id_returns_correct_second_category(self, repository):
        """Debe retornar 'Celulares y Smartphones' como segunda categoría"""
        result = repository.get_by_product_id("MLC621083881")

        assert result[1].label == "Celulares y Smartphones"
        assert result[1].href == "/categoria/electronica/celulares"
        assert result[1].order == 1

    def test_get_by_product_id_returns_correct_third_category(self, repository):
        """Debe retornar 'iPhone' como tercera categoría"""
        result = repository.get_by_product_id("MLC621083881")

        assert result[2].label == "iPhone"
        assert result[2].href == "/categoria/electronica/celulares/iphone"
        assert result[2].order == 2

    def test_get_by_product_id_with_non_existent_product(self, repository):
        """Debe retornar lista vacía para producto inexistente"""
        result = repository.get_by_product_id("INVALID_ID")
        assert isinstance(result, list)
        assert len(result) == 0

    def test_get_by_product_id_with_empty_string(self, repository):
        """Debe retornar lista vacía para string vacío"""
        result = repository.get_by_product_id("")
        assert isinstance(result, list)
        assert len(result) == 0

    def test_get_by_product_id_maintains_hierarchy(self, repository):
        """Debe mantener la jerarquía correcta de categorías"""
        result = repository.get_by_product_id("MLC621083881")

        # Verificar la jerarquía: Electrónica > Celulares > iPhone
        labels = [cp.label for cp in result]
        assert labels == ["Electrónica", "Celulares y Smartphones", "iPhone"]

        # Verificar que los href son progresivamente más profundos
        assert result[0].href == "/categoria/electronica"
        assert "/electronica/celulares" in result[1].href
        assert "/electronica/celulares/iphone" in result[2].href

    def test_repository_handles_missing_csv_gracefully(self):
        """Debe manejar CSV faltante sin lanzar excepción"""
        repo = CategoryPathRepository()
        # Cambiar la ruta a un archivo inexistente
        repo.csv_path = "/path/that/does/not/exist.csv"

        # No debe lanzar excepción, debe retornar lista vacía
        result = repo.get_by_product_id("MLC621083881")
        assert isinstance(result, list)
        assert len(result) == 0

    def test_all_entities_are_frozen(self, repository):
        """Todas las entidades retornadas deben ser inmutables"""
        result = repository.get_by_product_id("MLC621083881")

        for category_path in result:
            with pytest.raises(Exception):  # FrozenInstanceError
                category_path.label = "Modified"
