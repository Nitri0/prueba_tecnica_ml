"""
Tests unitarios para DetailProductService (Orquestador actualizado)
"""

import pytest
from unittest.mock import Mock

from application.service.detail_product_orchestrator_service import DetailProductService
from application.dto.detail_product_output_dto import (
    DetailProductOutputDto,
    CategoryPathItemDto,
    ConditionType,
    ShippingDto,
    EstimatedDaysDto,
    SellerDto,
    SellerLevel,
    ReputationDto,
    QuestionDto,
    QuestionStatus,
    RelatedProductDto,
    VariantDto,
    VariantGroupDto,
    PaymentMethodDto,
    PaymentMethodType,
    RatingCategoryDto,
    ReviewDto,
    RangeCharacteristicDto,
    HighlightCharacteristicDto
)


class TestDetailProductService:
    """Tests para el servicio orquestador actualizado"""

    @pytest.fixture
    def mock_shipping_service(self):
        """Mock del ShippingService"""
        service = Mock()
        service.get_shipping_by_product_id.return_value = ShippingDto(
            is_free=True,
            estimated_days=EstimatedDaysDto(min=2, max=5)
        )
        return service

    @pytest.fixture
    def mock_question_service(self):
        """Mock del QuestionService"""
        service = Mock()
        service.get_questions_by_product_id.return_value = [
            QuestionDto(
                id="q1",
                question="¿Tiene garantía?",
                answer="Sí",
                asked_at="2024-01-15T10:00:00Z",
                answered_at="2024-01-15T14:00:00Z",
                status=QuestionStatus.ANSWERED
            )
        ]
        return service

    @pytest.fixture
    def mock_variant_service(self):
        """Mock del VariantService"""
        service = Mock()
        service.get_variants_by_product_id.return_value = {
            "color": VariantGroupDto(
                title="Color",
                options=[
                    VariantDto(id="c1", label="Azul", value="Azul", slug="azul")
                ],
                selected_id="c1",
                show_images=True,
                order=0
            )
        }
        return service

    @pytest.fixture
    def mock_related_product_service(self):
        """Mock del RelatedProductService"""
        service = Mock()
        service.get_related_products_by_product_id.return_value = [
            RelatedProductDto(
                id="rel1",
                title="Related Product",
                price=1000,
                original_price=1200,
                image="img.jpg",
                discount=17,
                installments=12,
                installment_amount=83,
                is_free_shipping=True,
                is_first_purchase_free_shipping=False
            )
        ]
        return service

    @pytest.fixture
    def mock_highlight_service(self):
        """Mock del HighlightService"""
        service = Mock()
        service.get_highlights_by_product_id.return_value = [
            "Pantalla Super Retina XDR",
            "Chip A17 Pro"
        ]
        return service

    @pytest.fixture
    def mock_rating_category_service(self):
        """Mock del RatingCategoryService"""
        service = Mock()
        service.get_rating_categories_by_product_id.return_value = [
            RatingCategoryDto(id="camera", name="Cámara", order=0),
            RatingCategoryDto(id="battery", name="Batería", order=1)
        ]
        return service

    @pytest.fixture
    def mock_characteristic_service(self):
        """Mock del CharacteristicService"""
        service = Mock()
        service.get_characteristics_by_product_id.return_value = [
            RangeCharacteristicDto(
                type="range",
                name="Pantalla",
                value="6.7 pulgadas",
                current=85,
                min=4,
                max=7,
                min_label="PEQUEÑO",
                max_label="GRANDE"
            ),
            HighlightCharacteristicDto(
                type="highlight",
                name="Procesador",
                value="A17 Pro",
                icon="Cpu"
            )
        ]
        return service

    @pytest.fixture
    def mock_review_statistics_service(self):
        """Mock del ReviewStatisticsService"""
        service = Mock()
        service.get_reviews_by_product_id.return_value = [
            ReviewDto(
                id="r1",
                user_name="Juan",
                rating=5.0,
                date="2024-01-20",
                comment="Excelente",
                likes=45,
                verified=True
            )
        ]
        service.get_average_rating.return_value = 4.7
        service.get_total_reviews.return_value = 1247
        service.get_rating_distribution.return_value = {5: 850, 4: 250, 3: 89, 2: 35, 1: 23}
        service.get_average_category_ratings.return_value = {"camera": 4.8, "battery": 4.6}
        return service

    @pytest.fixture
    def mock_payment_service(self):
        """Mock del PaymentService"""
        service = Mock()
        service.get_payment_methods_by_product_id.return_value = [
            PaymentMethodDto(
                id="visa",
                name="Visa",
                image_url="https://example.com/visa.svg",
                type=PaymentMethodType.CREDIT
            )
        ]
        service.get_max_installments.return_value = 12
        return service

    @pytest.fixture
    def mock_seller_information_service(self):
        """Mock del SellerInformationService"""
        service = Mock()
        service.get_seller_information_by_product_id.return_value = SellerDto(
            name="Apple Store",
            logo="logo.jpg",
            is_official_store=True,
            followers=100000,
            total_products=500,
            level=SellerLevel.PLATINUM,
            location="Santiago",
            positive_rating=99,
            total_sales=50000,
            rating=4.9,
            review_count=10000,
            reputation=ReputationDto(red=0, orange=1, yellow=4, green=95),
            reputation_message="Excelente vendedor",
            good_attention=True,
            on_time_delivery=True
        )
        return service

    @pytest.fixture
    def mock_category_path_service(self):
        """Mock del CategoryPathService"""
        service = Mock()
        service.get_category_path_by_product_id.return_value = [
            CategoryPathItemDto(label="Electrónica", href="/categoria/electronica"),
            CategoryPathItemDto(label="Celulares y Smartphones", href="/categoria/electronica/celulares"),
            CategoryPathItemDto(label="iPhone", href="/categoria/electronica/celulares/iphone")
        ]
        return service

    @pytest.fixture
    def mock_product_detail_service(self):
        """Mock del ProductDetailService"""
        from application.dto.detail_product_output_dto import ProductBasicsDto
        service = Mock()
        service.get_basics_by_product_id.return_value = ProductBasicsDto(
            id="MLC123456789",
            title="iPhone 15 Pro Max 256GB Titanio Natural",
            price=1299990,
            original_price=1499990,
            discount=13,
            condition=ConditionType.NEW,
            sold_count=1247,
            available_stock=15,
            description="El iPhone 15 Pro Max redefine lo que significa tener el smartphone más avanzado del mundo."
        )
        return service

    @pytest.fixture
    def mock_product_image_service(self):
        """Mock del ProductImageService"""
        from application.dto.detail_product_output_dto import ProductMediaDto
        service = Mock()
        service.get_media_by_product_id.return_value = ProductMediaDto(
            images=[
                "https://http2.mlstatic.com/D_NQ_NP_2X_863735-MLA71782896219_092023-F.webp",
                "https://http2.mlstatic.com/D_NQ_NP_2X_693037-MLA71782896221_092023-F.webp",
                "https://http2.mlstatic.com/D_NQ_NP_2X_686692-MLA71782896223_092023-F.webp",
                "https://http2.mlstatic.com/D_NQ_NP_2X_740308-MLA71782896225_092023-F.webp"
            ],
            description_images=[]
        )
        return service

    @pytest.fixture
    def detail_product_service(
        self,
        mock_shipping_service,
        mock_question_service,
        mock_variant_service,
        mock_related_product_service,
        mock_highlight_service,
        mock_rating_category_service,
        mock_characteristic_service,
        mock_review_statistics_service,
        mock_payment_service,
        mock_seller_information_service,
        mock_category_path_service,
        mock_product_detail_service,
        mock_product_image_service
    ):
        """Fixture que crea el servicio con todos los mocks inyectados"""
        return DetailProductService(
            shipping_service=mock_shipping_service,
            question_service=mock_question_service,
            variant_service=mock_variant_service,
            related_product_service=mock_related_product_service,
            highlight_service=mock_highlight_service,
            rating_category_service=mock_rating_category_service,
            characteristic_service=mock_characteristic_service,
            review_statistics_service=mock_review_statistics_service,
            payment_service=mock_payment_service,
            seller_information_service=mock_seller_information_service,
            category_path_service=mock_category_path_service,
            product_detail_service=mock_product_detail_service,
            product_image_service=mock_product_image_service
        )

    def test_get_detail_product_by_id_should_return_complete_dto(self, detail_product_service):
        """Debe retornar un DetailProductOutputDto completo con todos los datos"""
        # Arrange
        product_id = "MLC123456789"

        # Act
        result = detail_product_service.get_detail_product_by_id(product_id)

        # Assert
        assert result is not None
        assert isinstance(result, DetailProductOutputDto)
        assert result.basics.id == product_id
        assert result.basics.title == "iPhone 15 Pro Max 256GB Titanio Natural"
        assert result.basics.price == 1299990
        assert result.basics.condition == ConditionType.NEW

    def test_get_detail_product_by_id_should_call_all_services(
        self,
        detail_product_service,
        mock_shipping_service,
        mock_question_service,
        mock_variant_service,
        mock_related_product_service,
        mock_highlight_service,
        mock_rating_category_service,
        mock_characteristic_service,
        mock_review_statistics_service,
        mock_payment_service,
        mock_seller_information_service
    ):
        """Debe llamar a todos los servicios con el product_id correcto"""
        # Arrange
        product_id = "MLC123456789"

        # Act
        detail_product_service.get_detail_product_by_id(product_id)

        # Assert
        mock_shipping_service.get_shipping_by_product_id.assert_called_once_with(product_id)
        mock_question_service.get_questions_by_product_id.assert_called_once_with(product_id)
        mock_variant_service.get_variants_by_product_id.assert_called_once_with(product_id)
        mock_related_product_service.get_related_products_by_product_id.assert_called_once_with(product_id)
        mock_highlight_service.get_highlights_by_product_id.assert_called_once_with(product_id)
        mock_rating_category_service.get_rating_categories_by_product_id.assert_called_once_with(product_id)
        mock_characteristic_service.get_characteristics_by_product_id.assert_called_once_with(product_id)
        mock_review_statistics_service.get_reviews_by_product_id.assert_called_once_with(product_id)
        mock_review_statistics_service.get_average_rating.assert_called_once_with(product_id)
        mock_review_statistics_service.get_total_reviews.assert_called_once_with(product_id)
        mock_review_statistics_service.get_rating_distribution.assert_called_once_with(product_id)
        mock_review_statistics_service.get_average_category_ratings.assert_called_once_with(product_id)
        mock_payment_service.get_payment_methods_by_product_id.assert_called_once_with(product_id)
        mock_seller_information_service.get_seller_information_by_product_id.assert_called_once_with(product_id)

    def test_get_detail_product_by_id_should_return_none_for_empty_id(self, detail_product_service):
        """Debe retornar None cuando el product_id está vacío"""
        assert detail_product_service.get_detail_product_by_id("") is None

    def test_get_detail_product_by_id_should_return_none_for_none_id(self, detail_product_service):
        """Debe retornar None cuando el product_id es None"""
        assert detail_product_service.get_detail_product_by_id(None) is None

    def test_get_detail_product_by_id_should_have_all_fields(self, detail_product_service):
        """Debe construir el DTO con todos los campos esperados organizados en basics y media"""
        result = detail_product_service.get_detail_product_by_id("MLC123456789")

        # Verificar que existen los campos agrupados
        assert hasattr(result, 'basics')
        assert hasattr(result, 'media')

        # Verificar campos dentro de basics
        assert hasattr(result.basics, 'id')
        assert hasattr(result.basics, 'title')
        assert hasattr(result.basics, 'price')
        assert hasattr(result.basics, 'original_price')
        assert hasattr(result.basics, 'discount')
        assert hasattr(result.basics, 'condition')
        assert hasattr(result.basics, 'sold_count')
        assert hasattr(result.basics, 'available_stock')
        assert hasattr(result.basics, 'description')

        # Verificar campos dentro de media
        assert hasattr(result.media, 'images')
        assert hasattr(result.media, 'description_images')

        # Verificar campos de nivel raíz
        assert hasattr(result, 'review_count')
        assert hasattr(result, 'category_path')
        assert hasattr(result, 'seller')
        assert hasattr(result, 'shipping')
        assert hasattr(result, 'characteristics')
        assert hasattr(result, 'highlights')
        assert hasattr(result, 'questions')
        assert hasattr(result, 'related_products')
        assert hasattr(result, 'variants')
        assert hasattr(result, 'payment_methods')
        assert hasattr(result, 'max_installments')
        assert hasattr(result, 'available_rating_categories')
        assert hasattr(result, 'reviews')
        assert hasattr(result, 'average_rating')
        assert hasattr(result, 'total_reviews')
        assert hasattr(result, 'rating_distribution')
        assert hasattr(result, 'average_category_ratings')

    def test_get_detail_product_by_id_should_integrate_shipping_data(
        self,
        detail_product_service,
        mock_shipping_service
    ):
        """Debe integrar correctamente datos de shipping"""
        result = detail_product_service.get_detail_product_by_id("MLC123")

        assert result.shipping.is_free is True
        assert result.shipping.estimated_days.min == 2
        assert result.shipping.estimated_days.max == 5

    def test_get_detail_product_by_id_should_integrate_seller_data(
        self,
        detail_product_service
    ):
        """Debe integrar correctamente datos del vendedor"""
        result = detail_product_service.get_detail_product_by_id("MLC123")

        assert result.seller.name == "Apple Store"
        assert result.seller.is_official_store is True
        assert result.seller.level == SellerLevel.PLATINUM
        assert result.seller.rating == 4.9
        assert result.seller.reputation.green == 95

    def test_get_detail_product_by_id_should_integrate_questions(
        self,
        detail_product_service
    ):
        """Debe integrar correctamente las preguntas"""
        result = detail_product_service.get_detail_product_by_id("MLC123")

        assert len(result.questions) == 1
        assert result.questions[0].id == "q1"
        assert result.questions[0].status == QuestionStatus.ANSWERED

    def test_get_detail_product_by_id_should_integrate_variants(
        self,
        detail_product_service
    ):
        """Debe integrar correctamente las variantes"""
        result = detail_product_service.get_detail_product_by_id("MLC123")

        assert "color" in result.variants
        assert result.variants["color"].title == "Color"
        assert len(result.variants["color"].options) == 1

    def test_get_detail_product_by_id_should_integrate_reviews(
        self,
        detail_product_service
    ):
        """Debe integrar correctamente las reviews y estadísticas"""
        result = detail_product_service.get_detail_product_by_id("MLC123")

        assert len(result.reviews) == 1
        assert result.average_rating == 4.7
        assert result.total_reviews == 1247
        assert result.rating_distribution[5] == 850

    def test_get_detail_product_by_id_should_integrate_characteristics(
        self,
        detail_product_service
    ):
        """Debe integrar correctamente las características polimórficas"""
        result = detail_product_service.get_detail_product_by_id("MLC123")

        assert len(result.characteristics) == 2
        assert result.characteristics[0].type == "range"
        assert result.characteristics[1].type == "highlight"
