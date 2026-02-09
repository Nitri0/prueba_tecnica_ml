"""Tests para DependencyContainer"""

import pytest
from infrastructure.container.dependency_container import DependencyContainer
from application.service.detail_product_orchestrator_service import DetailProductService
from application.service.shipping_service import ShippingService
from application.service.question_service import QuestionService
from application.service.variant_product_service import VariantProductService
from application.service.related_product_service import RelatedProductService
from application.service.highlight_service import HighlightService
from application.service.rating_category_service import RatingCategoryService
from application.service.characteristic_service import CharacteristicService
from application.service.review_statistics_service import ReviewStatisticsService
from application.service.payment_service import PaymentService
from application.service.seller_information_service import SellerInformationService


class TestDependencyContainer:
    """Tests para el contenedor de dependencias"""

    @pytest.fixture
    def container(self):
        """Fixture que crea el container"""
        return DependencyContainer()

    def test_container_creation(self, container):
        """Debe crear el container correctamente"""
        assert container is not None
        assert isinstance(container, DependencyContainer)

    def test_get_detail_product_service(self, container):
        """Debe retornar DetailProductService"""
        service = container.get_detail_product_service()
        assert service is not None
        assert isinstance(service, DetailProductService)

    def test_get_shipping_service(self, container):
        """Debe retornar ShippingService"""
        service = container.get_shipping_service()
        assert service is not None
        assert isinstance(service, ShippingService)

    def test_get_question_service(self, container):
        """Debe retornar QuestionService"""
        service = container.get_question_service()
        assert service is not None
        assert isinstance(service, QuestionService)

    def test_get_variant_product_service(self, container):
        """Debe retornar VariantProductService"""
        service = container.get_variant_product_service()
        assert service is not None
        assert isinstance(service, VariantProductService)

    def test_get_related_product_service(self, container):
        """Debe retornar RelatedProductService"""
        service = container.get_related_product_service()
        assert service is not None
        assert isinstance(service, RelatedProductService)

    def test_get_highlight_service(self, container):
        """Debe retornar HighlightService"""
        service = container.get_highlight_service()
        assert service is not None
        assert isinstance(service, HighlightService)

    def test_get_rating_category_service(self, container):
        """Debe retornar RatingCategoryService"""
        service = container.get_rating_category_service()
        assert service is not None
        assert isinstance(service, RatingCategoryService)

    def test_get_characteristic_service(self, container):
        """Debe retornar CharacteristicService"""
        service = container.get_characteristic_service()
        assert service is not None
        assert isinstance(service, CharacteristicService)

    def test_get_review_statistics_service(self, container):
        """Debe retornar ReviewStatisticsService"""
        service = container.get_review_statistics_service()
        assert service is not None
        assert isinstance(service, ReviewStatisticsService)

    def test_get_payment_service(self, container):
        """Debe retornar PaymentService"""
        service = container.get_payment_service()
        assert service is not None
        assert isinstance(service, PaymentService)

    def test_get_seller_information_service(self, container):
        """Debe retornar SellerInformationService"""
        service = container.get_seller_information_service()
        assert service is not None
        assert isinstance(service, SellerInformationService)

    def test_services_are_singleton(self, container):
        """Debe retornar la misma instancia en múltiples llamadas (singleton)"""
        service1 = container.get_detail_product_service()
        service2 = container.get_detail_product_service()
        assert service1 is service2

    def test_all_services_are_injected_to_orchestrator(self, container):
        """Debe inyectar todos los servicios al orquestador"""
        orchestrator = container.get_detail_product_service()

        assert orchestrator.shipping_service is not None
        assert orchestrator.question_service is not None
        assert orchestrator.variant_service is not None
        assert orchestrator.related_product_service is not None
        assert orchestrator.highlight_service is not None
        assert orchestrator.rating_category_service is not None
        assert orchestrator.characteristic_service is not None
        assert orchestrator.review_statistics_service is not None
        assert orchestrator.payment_service is not None
        assert orchestrator.seller_information_service is not None
