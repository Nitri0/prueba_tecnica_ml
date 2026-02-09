"""Tests para ProductVariantMappingRepository"""

import pytest
from infrastructure.persist.product_variant.product_variant_mapping_repository import ProductVariantMappingRepository
from domain.product_variant.entity.product_variant_mapping import ProductVariantMapping


class TestProductVariantMappingRepository:
    """Tests para el repositorio de mappings de variantes"""

    @pytest.fixture
    def repository(self):
        """Fixture que crea el repositorio"""
        return ProductVariantMappingRepository()

    def test_repository_initialization(self, repository):
        """Debe inicializar correctamente el repositorio"""
        assert repository is not None
        assert hasattr(repository, 'csv_path')

    def test_get_by_combination_with_valid_combination_azul_256gb(self, repository):
        """Debe retornar el mapping correcto para azul + 256gb"""
        result = repository.get_by_combination(
            "MLC123456789",
            {"color": "azul", "capacidad": "256gb"}
        )

        assert result is not None
        assert isinstance(result, ProductVariantMapping)
        assert result.base_product_id == "MLC123456789"
        assert result.product_variant_id == "MLC928744140"

    def test_get_by_combination_with_valid_combination_negro_512gb(self, repository):
        """Debe retornar el mapping correcto para negro + 512gb"""
        result = repository.get_by_combination(
            "MLC123456789",
            {"color": "negro", "capacidad": "512gb"}
        )

        assert result is not None
        assert isinstance(result, ProductVariantMapping)
        assert result.base_product_id == "MLC123456789"
        assert result.product_variant_id == "MLC882941432"

    def test_get_by_combination_with_valid_combination_natural_128gb(self, repository):
        """Debe retornar el mapping correcto para natural + 128gb"""
        result = repository.get_by_combination(
            "MLC123456789",
            {"color": "natural", "capacidad": "128gb"}
        )

        assert result is not None
        assert isinstance(result, ProductVariantMapping)
        assert result.base_product_id == "MLC123456789"
        assert result.product_variant_id == "MLC677194340"

    def test_get_by_combination_with_nonexistent_combination(self, repository):
        """Debe retornar None si la combinación no existe"""
        result = repository.get_by_combination(
            "MLC123456789",
            {"color": "rojo", "capacidad": "2tb"}
        )

        assert result is None

    def test_get_by_combination_with_nonexistent_base_product_id(self, repository):
        """Debe retornar None si el base_product_id no existe"""
        result = repository.get_by_combination(
            "MLC999999999",
            {"color": "azul", "capacidad": "256gb"}
        )

        assert result is None

    def test_get_by_combination_with_empty_variant_combination(self, repository):
        """Debe retornar None si variant_combination está vacío"""
        result = repository.get_by_combination(
            "MLC123456789",
            {}
        )

        assert result is None

    def test_get_by_combination_returns_correct_variant_combination(self, repository):
        """El mapping retornado debe contener la combinación de variantes correcta"""
        result = repository.get_by_combination(
            "MLC123456789",
            {"color": "azul", "capacidad": "256gb"}
        )

        assert result is not None
        assert result.variant_combination == {"color": "azul", "capacidad": "256gb"}

    def test_get_by_combination_with_unordered_variants(self, repository):
        """Debe funcionar independientemente del orden de las variantes"""
        # Enviar en orden diferente al CSV (capacidad primero, color después)
        result = repository.get_by_combination(
            "MLC123456789",
            {"capacidad": "256gb", "color": "azul"}
        )

        assert result is not None
        assert result.product_variant_id == "MLC928744140"

    def test_get_by_combination_normalizes_combination(self, repository):
        """Debe normalizar la combinación antes de buscar"""
        # El orden en el dict no importa
        result1 = repository.get_by_combination(
            "MLC123456789",
            {"color": "negro", "capacidad": "512gb"}
        )

        result2 = repository.get_by_combination(
            "MLC123456789",
            {"capacidad": "512gb", "color": "negro"}
        )

        assert result1 is not None
        assert result2 is not None
        assert result1.product_variant_id == result2.product_variant_id

    def test_get_by_combination_with_partial_variants(self, repository):
        """Debe retornar None si solo se proporciona una variante parcial"""
        result = repository.get_by_combination(
            "MLC123456789",
            {"color": "azul"}  # Falta capacidad
        )

        # No debería encontrar match porque el CSV requiere ambas variantes
        assert result is None

    def test_get_by_combination_all_valid_combinations(self, repository):
        """Debe poder encontrar todas las 9 combinaciones válidas"""
        valid_combinations = [
            ({"color": "azul", "capacidad": "128gb"}, "MLC621083881"),
            ({"color": "azul", "capacidad": "256gb"}, "MLC928744140"),
            ({"color": "azul", "capacidad": "512gb"}, "MLC473630929"),
            ({"color": "natural", "capacidad": "128gb"}, "MLC677194340"),
            ({"color": "natural", "capacidad": "256gb"}, "MLC137702355"),
            ({"color": "natural", "capacidad": "512gb"}, "MLC403211283"),
            ({"color": "negro", "capacidad": "128gb"}, "MLC204267746"),
            ({"color": "negro", "capacidad": "256gb"}, "MLC474475489"),
            ({"color": "negro", "capacidad": "512gb"}, "MLC882941432"),
        ]

        for variants, expected_id in valid_combinations:
            result = repository.get_by_combination("MLC123456789", variants)
            assert result is not None, f"Failed for {variants}"
            assert result.product_variant_id == expected_id, f"Expected {expected_id}, got {result.product_variant_id}"

    def test_normalize_combination_format(self, repository):
        """Debe normalizar correctamente la combinación al formato esperado"""
        normalized = repository._normalize_combination({
            "color": "azul",
            "capacidad": "256gb"
        })

        # Debe estar ordenado alfabéticamente: capacidad antes que color
        assert normalized == "capacidad:256gb|color:azul"

    def test_normalize_combination_with_single_variant(self, repository):
        """Debe normalizar correctamente una sola variante"""
        normalized = repository._normalize_combination({"color": "azul"})
        assert normalized == "color:azul"

    def test_normalize_combination_with_multiple_variants_ordered(self, repository):
        """Debe ordenar alfabéticamente las variantes al normalizar"""
        normalized = repository._normalize_combination({
            "z_variant": "value1",
            "a_variant": "value2",
            "m_variant": "value3"
        })

        # Debe estar ordenado: a, m, z
        assert normalized == "a_variant:value2|m_variant:value3|z_variant:value1"

    def test_parse_combination_from_csv(self, repository):
        """Debe parsear correctamente las combinaciones del CSV"""
        csv_string = "capacidad:256gb|color:azul"
        result = repository._parse_combination(csv_string)

        # El método actualmente solo retorna el string normalizado
        assert result == csv_string

    def test_repository_handles_missing_csv_file(self):
        """Debe manejar gracefully si el CSV no existe"""
        repo = ProductVariantMappingRepository()
        # Modificar la ruta para que apunte a un archivo inexistente
        repo.csv_path = "/tmp/nonexistent_file.csv"

        result = repo.get_by_combination(
            "MLC123456789",
            {"color": "azul", "capacidad": "256gb"}
        )

        # Debe retornar None sin lanzar excepción
        assert result is None

    def test_repository_is_stateless(self, repository):
        """Múltiples llamadas deben retornar resultados consistentes"""
        result1 = repository.get_by_combination(
            "MLC123456789",
            {"color": "azul", "capacidad": "256gb"}
        )

        result2 = repository.get_by_combination(
            "MLC123456789",
            {"color": "azul", "capacidad": "256gb"}
        )

        assert result1 is not None
        assert result2 is not None
        assert result1.product_variant_id == result2.product_variant_id

    def test_repository_case_sensitive_search(self, repository):
        """La búsqueda debe ser case-sensitive"""
        # Buscar con mayúsculas (no debería encontrar)
        result = repository.get_by_combination(
            "MLC123456789",
            {"color": "AZUL", "capacidad": "256GB"}
        )

        # No debería encontrar porque los slugs en CSV son lowercase
        assert result is None
