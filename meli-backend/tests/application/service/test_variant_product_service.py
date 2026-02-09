"""Tests para VariantProductService (servicio unificado)"""

import pytest
from unittest.mock import Mock
from application.service.variant_product_service import VariantProductService
from domain.product_variant.entity.product_variant_mapping import ProductVariantMapping


class TestVariantProductService:
    """Tests para el servicio unificado de variantes"""

    @pytest.fixture
    def mock_variant_repository(self):
        """Mock del VariantRepository"""
        repository = Mock()
        repository.get_by_product_id.return_value = {}
        return repository

    @pytest.fixture
    def mock_mapping_repository(self):
        """Mock del ProductVariantMappingRepository"""
        repository = Mock()

        def get_by_combination_side_effect(base_id, variants):
            if base_id == "MLC123456789":
                if variants == {"color": "azul", "capacidad": "256gb"}:
                    return ProductVariantMapping(
                        base_product_id="MLC123456789",
                        variant_combination=variants,
                        product_variant_id="MLC928744140"
                    )
                elif variants == {"color": "negro", "capacidad": "512gb"}:
                    return ProductVariantMapping(
                        base_product_id="MLC123456789",
                        variant_combination=variants,
                        product_variant_id="MLC882941432"
                    )
            return None

        repository.get_by_combination.side_effect = get_by_combination_side_effect
        return repository

    @pytest.fixture
    def service(self, mock_variant_repository, mock_mapping_repository):
        """Fixture que crea el servicio con mocks inyectados"""
        return VariantProductService(
            variant_repository=mock_variant_repository,
            mapping_repository=mock_mapping_repository
        )

    def test_resolve_product_id_with_valid_variants(self, service):
        """Debe retornar el product ID correcto para variantes válidas"""
        result = service.resolve_product_id(
            "MLC123456789",
            {"color": "azul", "capacidad": "256gb"}
        )
        assert result == "MLC928744140"

    def test_resolve_product_id_with_empty_variants_returns_base_id(self, service):
        """Debe retornar base ID si no hay variantes"""
        result = service.resolve_product_id("MLC123456789", {})
        assert result == "MLC123456789"

    def test_service_integration_with_real_repository(self):
        """Test de integración con repositorio real"""
        from infrastructure.persist.product_variant.product_variant_mapping_repository import ProductVariantMappingRepository
        from infrastructure.persist.product_variant.variant_repository import VariantRepository

        variant_repository = VariantRepository()
        mapping_repository = ProductVariantMappingRepository()
        service = VariantProductService(
            variant_repository=variant_repository,
            mapping_repository=mapping_repository
        )

        result = service.resolve_product_id(
            "MLC123456789",
            {"color": "azul", "capacidad": "256gb"}
        )

        assert result == "MLC928744140"
