"""
Tests unitarios para DTOs de detalle de producto
"""

import pytest
from application.dto.detail_product_output_dto import (
    # Enums
    ConditionType,
    SellerLevel,
    PaymentMethodType,
    QuestionStatus,
    CharacteristicType,
    # DTOs básicos
    CategoryPathItemDto,
    EstimatedDaysDto,
    ReputationDto,
    SellerDto,
    ShippingDto,
    SimpleCharacteristicDto,
    RangeCharacteristicDto,
    HighlightCharacteristicDto,
    CategoryCharacteristicDto,
    QuestionDto,
    RelatedProductDto,
    VariantDto,
    VariantGroupDto,
    PaymentMethodDto,
    RatingCategoryDto,
    ReviewDto,
    RatingDistributionDto,
    ProductBasicsDto,
    ProductMediaDto,
    # DTO principal
    DetailProductOutputDto
)


class TestEnums:
    """Tests para los enums"""

    def test_condition_type_enum_values(self):
        """Debe tener los valores correctos para ConditionType"""
        assert ConditionType.NEW.value == "new"
        assert ConditionType.USED.value == "used"
        assert ConditionType.REFURBISHED.value == "refurbished"

    def test_seller_level_enum_values(self):
        """Debe tener los valores correctos para SellerLevel"""
        assert SellerLevel.BRONZE.value == "bronze"
        assert SellerLevel.SILVER.value == "silver"
        assert SellerLevel.GOLD.value == "gold"
        assert SellerLevel.PLATINUM.value == "platinum"

    def test_payment_method_type_enum_values(self):
        """Debe tener los valores correctos para PaymentMethodType"""
        assert PaymentMethodType.CASH.value == "cash"
        assert PaymentMethodType.CREDIT.value == "credit"
        assert PaymentMethodType.DEBIT.value == "debit"

    def test_question_status_enum_values(self):
        """Debe tener los valores correctos para QuestionStatus"""
        assert QuestionStatus.ANSWERED.value == "answered"
        assert QuestionStatus.PENDING.value == "pending"

    def test_characteristic_type_enum_values(self):
        """Debe tener los valores correctos para CharacteristicType"""
        assert CharacteristicType.RANGE.value == "range"
        assert CharacteristicType.HIGHLIGHT.value == "highlight"
        assert CharacteristicType.CATEGORY.value == "category"


class TestCategoryPathItemDto:
    """Tests para CategoryPathItemDto"""

    def test_create_with_valid_data(self):
        """Debe crear instancia correctamente con datos válidos"""
        dto = CategoryPathItemDto(
            label="Celulares",
            href="/celulares"
        )
        assert dto.label == "Celulares"
        assert dto.href == "/celulares"

    def test_is_frozen(self):
        """Debe ser inmutable (frozen)"""
        dto = CategoryPathItemDto(label="Test", href="/test")
        with pytest.raises(Exception):  # FrozenInstanceError
            dto.label = "Changed"


class TestEstimatedDaysDto:
    """Tests para EstimatedDaysDto"""

    def test_create_with_valid_data(self):
        """Debe crear instancia correctamente"""
        dto = EstimatedDaysDto(min=2, max=5)
        assert dto.min == 2
        assert dto.max == 5


class TestReputationDto:
    """Tests para ReputationDto con validación de suma 100"""

    def test_create_with_valid_data_summing_100(self):
        """Debe crear instancia cuando los valores suman 100"""
        dto = ReputationDto(red=10, orange=20, yellow=30, green=40)
        assert dto.red == 10
        assert dto.orange == 20
        assert dto.yellow == 30
        assert dto.green == 40

    def test_raise_error_when_sum_not_100(self):
        """Debe lanzar ValueError cuando la suma no es 100"""
        with pytest.raises(ValueError, match="must sum to 100"):
            ReputationDto(red=10, orange=20, yellow=30, green=30)

    def test_edge_case_all_zeros(self):
        """Debe rechazar cuando todos son ceros"""
        with pytest.raises(ValueError):
            ReputationDto(red=0, orange=0, yellow=0, green=0)

    def test_edge_case_100_percent_green(self):
        """Debe aceptar 100% en un solo color"""
        dto = ReputationDto(red=0, orange=0, yellow=0, green=100)
        assert dto.green == 100


class TestSellerDto:
    """Tests para SellerDto"""

    def test_create_with_complete_data(self):
        """Debe crear instancia con todos los campos"""
        reputation = ReputationDto(red=0, orange=1, yellow=4, green=95)
        dto = SellerDto(
            name="Apple Store",
            logo="https://example.com/logo.jpg",
            is_official_store=True,
            followers=100000,
            total_products=500,
            level=SellerLevel.PLATINUM,
            location="Santiago",
            positive_rating=99,
            total_sales=50000,
            rating=4.9,
            review_count=10000,
            reputation=reputation,
            reputation_message="Excelente vendedor",
            good_attention=True,
            on_time_delivery=True
        )
        assert dto.name == "Apple Store"
        assert dto.level == SellerLevel.PLATINUM
        assert dto.is_official_store is True
        assert dto.rating == 4.9


class TestShippingDto:
    """Tests para ShippingDto"""

    def test_create_with_free_shipping(self):
        """Debe crear instancia con envío gratis"""
        estimated = EstimatedDaysDto(min=1, max=3)
        dto = ShippingDto(is_free=True, estimated_days=estimated)
        assert dto.is_free is True
        assert dto.estimated_days.min == 1

    def test_create_with_paid_shipping(self):
        """Debe crear instancia con envío pago"""
        estimated = EstimatedDaysDto(min=5, max=10)
        dto = ShippingDto(is_free=False, estimated_days=estimated)
        assert dto.is_free is False


class TestCharacteristicDtos:
    """Tests para DTOs de características"""

    def test_simple_characteristic_dto(self):
        """Debe crear SimpleCharacteristicDto correctamente"""
        dto = SimpleCharacteristicDto(name="Marca", value="Apple")
        assert dto.name == "Marca"
        assert dto.value == "Apple"

    def test_range_characteristic_dto(self):
        """Debe crear RangeCharacteristicDto correctamente"""
        dto = RangeCharacteristicDto(
            type="range",
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
        assert dto.type == "range"
        assert dto.current == 6.7
        assert dto.icon == "Smartphone"

    def test_range_characteristic_dto_without_optional_fields(self):
        """Debe crear RangeCharacteristicDto sin campos opcionales"""
        dto = RangeCharacteristicDto(
            type="range",
            name="Batería",
            value="4000mAh",
            current=70.0,
            min=2000.0,
            max=6000.0,
            min_label="BAJA",
            max_label="ALTA"
        )
        assert dto.icon is None
        assert dto.segments == 5  # Valor por defecto, segments no puede ser None

    def test_highlight_characteristic_dto(self):
        """Debe crear HighlightCharacteristicDto correctamente"""
        dto = HighlightCharacteristicDto(
            type="highlight",
            name="Procesador",
            value="A17 Pro",
            icon="Cpu"
        )
        assert dto.type == "highlight"
        assert dto.value == "A17 Pro"

    def test_category_characteristic_dto(self):
        """Debe crear CategoryCharacteristicDto correctamente"""
        chars = [
            SimpleCharacteristicDto(name="Marca", value="Apple"),
            SimpleCharacteristicDto(name="Modelo", value="iPhone 15")
        ]
        dto = CategoryCharacteristicDto(
            type="category",
            category_name="Especificaciones",
            characteristics=chars
        )
        assert dto.type == "category"
        assert len(dto.characteristics) == 2


class TestQuestionDto:
    """Tests para QuestionDto"""

    def test_create_answered_question(self):
        """Debe crear pregunta respondida correctamente"""
        dto = QuestionDto(
            id="q1",
            question="¿Tiene garantía?",
            answer="Sí, 12 meses",
            asked_at="2024-01-15T10:00:00Z",
            answered_at="2024-01-15T14:00:00Z",
            status=QuestionStatus.ANSWERED
        )
        assert dto.id == "q1"
        assert dto.status == QuestionStatus.ANSWERED

    def test_create_pending_question(self):
        """Debe crear pregunta pendiente correctamente"""
        dto = QuestionDto(
            id="q2",
            question="¿Viene con cargador?",
            answer="",
            asked_at="2024-01-16T09:00:00Z",
            answered_at="",
            status=QuestionStatus.PENDING
        )
        assert dto.status == QuestionStatus.PENDING


class TestRelatedProductDto:
    """Tests para RelatedProductDto"""

    def test_create_with_discount(self):
        """Debe crear producto relacionado con descuento"""
        dto = RelatedProductDto(
            id="MLC123",
            title="iPhone 15 Pro Max",
            price=1899000,
            original_price=2199000,
            image="https://example.com/img.jpg",
            discount=14,
            installments=12,
            installment_amount=158250,
            is_free_shipping=True,
            is_first_purchase_free_shipping=False
        )
        assert dto.discount == 14
        assert dto.original_price == 2199000

    def test_create_without_discount(self):
        """Debe crear producto sin descuento"""
        dto = RelatedProductDto(
            id="MLC456",
            title="Samsung S24",
            price=1399000,
            original_price=None,
            image="https://example.com/img.jpg",
            discount=None,
            installments=12,
            installment_amount=116583,
            is_free_shipping=True,
            is_first_purchase_free_shipping=False
        )
        assert dto.discount is None
        assert dto.original_price is None


class TestVariantDtos:
    """Tests para DTOs de variantes"""

    def test_variant_dto_with_image(self):
        """Debe crear VariantDto con imagen"""
        dto = VariantDto(
            id="color-blue",
            label="Azul Titanio",
            value="Azul Titanio",
            slug="azul-titanio",
            image="https://example.com/blue.jpg",
            available=True
        )
        assert dto.image is not None
        assert dto.available is True

    def test_variant_dto_without_image(self):
        """Debe crear VariantDto sin imagen"""
        dto = VariantDto(
            id="storage-256gb",
            label="256 GB",
            value="256 GB",
            slug="256gb"
        )
        assert dto.image is None
        assert dto.available is True  # Default

    def test_variant_group_dto(self):
        """Debe crear VariantGroupDto correctamente"""
        options = [
            VariantDto(id="v1", label="Opción 1", value="V1", slug="v1"),
            VariantDto(id="v2", label="Opción 2", value="V2", slug="v2")
        ]
        dto = VariantGroupDto(
            title="Color",
            options=options,
            selected_id="v1",
            show_images=True,
            order=0
        )
        assert len(dto.options) == 2
        assert dto.selected_id == "v1"


class TestPaymentMethodDto:
    """Tests para PaymentMethodDto"""

    def test_create_credit_payment(self):
        """Debe crear método de pago crédito"""
        dto = PaymentMethodDto(
            id="visa",
            name="Visa",
            image_url="https://example.com/visa.svg",
            type=PaymentMethodType.CREDIT
        )
        assert dto.type == PaymentMethodType.CREDIT

    def test_create_debit_payment(self):
        """Debe crear método de pago débito"""
        dto = PaymentMethodDto(
            id="debit",
            name="Débito",
            image_url="https://example.com/debit.svg",
            type=PaymentMethodType.DEBIT
        )
        assert dto.type == PaymentMethodType.DEBIT


class TestRatingCategoryDto:
    """Tests para RatingCategoryDto"""

    def test_create_with_order(self):
        """Debe crear categoría de rating con orden"""
        dto = RatingCategoryDto(
            id="camera_quality",
            name="Calidad de cámara",
            order=1
        )
        assert dto.order == 1

    def test_create_with_default_order(self):
        """Debe crear con orden por defecto"""
        dto = RatingCategoryDto(
            id="battery",
            name="Batería"
        )
        assert dto.order == 0


class TestReviewDto:
    """Tests para ReviewDto"""

    def test_create_review_with_images_and_category_ratings(self):
        """Debe crear review con imágenes y category ratings"""
        dto = ReviewDto(
            id="r1",
            user_name="Juan Pérez",
            rating=5.0,
            date="2024-01-20",
            comment="Excelente producto",
            likes=45,
            verified=True,
            images=["https://example.com/img1.jpg"],
            category_ratings={"camera_quality": 5.0, "battery_life": 4.5}
        )
        assert len(dto.images) == 1
        assert "camera_quality" in dto.category_ratings

    def test_create_review_without_optional_fields(self):
        """Debe crear review sin campos opcionales"""
        dto = ReviewDto(
            id="r2",
            user_name="María",
            rating=4.0,
            date="2024-01-18",
            comment="Muy bueno",
            likes=10,
            verified=False
        )
        assert dto.images is None
        assert dto.category_ratings is None


class TestRatingDistributionDto:
    """Tests para RatingDistributionDto"""

    def test_create_distribution(self):
        """Debe crear distribución de ratings"""
        dto = RatingDistributionDto(
            five_stars=850,
            four_stars=250,
            three_stars=89,
            two_stars=35,
            one_star=23
        )
        assert dto.five_stars == 850
        assert dto.one_star == 23

    def test_to_dict_method(self):
        """Debe convertir a diccionario con keys numéricas"""
        dto = RatingDistributionDto(
            five_stars=100,
            four_stars=50,
            three_stars=25,
            two_stars=10,
            one_star=5
        )
        result = dto.to_dict()
        assert result[5] == 100
        assert result[4] == 50
        assert result[3] == 25
        assert result[2] == 10
        assert result[1] == 5
        assert len(result) == 5


class TestDetailProductOutputDto:
    """Tests para el DTO principal"""

    def test_create_complete_dto(self):
        """Debe crear DTO principal completo con todos los campos"""
        # Preparar subdtos
        basics = ProductBasicsDto(
            id="MLC123",
            title="iPhone 15 Pro",
            price=1599000,
            original_price=1799000,
            discount=11,
            condition=ConditionType.NEW,
            sold_count=3542,
            available_stock=47,
            description="Description"
        )
        media = ProductMediaDto(
            images=["img1.jpg", "img2.jpg"],
            description_images=["desc1.jpg"]
        )
        category_path = [CategoryPathItemDto(label="Cat1", href="/cat1")]
        seller = SellerDto(
            name="Store",
            logo="logo.jpg",
            is_official_store=True,
            followers=1000,
            total_products=100,
            level=SellerLevel.GOLD,
            location="Santiago",
            positive_rating=95,
            total_sales=5000,
            rating=4.5,
            review_count=500,
            reputation=ReputationDto(red=0, orange=5, yellow=10, green=85),
            reputation_message="Buen vendedor",
            good_attention=True,
            on_time_delivery=True
        )
        shipping = ShippingDto(
            is_free=True,
            estimated_days=EstimatedDaysDto(min=2, max=5)
        )

        # Crear DTO principal
        dto = DetailProductOutputDto(
            # Básicos y media
            basics=basics,
            media=media,
            # Métricas
            review_count=1247,
            category_path=category_path,
            # Vendedor y envío
            seller=seller,
            shipping=shipping,
            # Características
            characteristics=[],
            highlights=[],
            # Interacción
            questions=[],
            related_products=[],
            variants={},
            # Pagos
            payment_methods=[],
            max_installments=12,
            # Reviews
            available_rating_categories=[],
            reviews=[],
            average_rating=4.7,
            total_reviews=1247,
            rating_distribution={5: 850, 4: 250, 3: 89, 2: 35, 1: 23},
            average_category_ratings={}
        )

        # Assertions
        assert dto.basics.id == "MLC123"
        assert dto.basics.title == "iPhone 15 Pro"
        assert dto.basics.price == 1599000
        assert dto.basics.condition == ConditionType.NEW
        assert dto.media.images == ["img1.jpg", "img2.jpg"]
        assert dto.media.description_images == ["desc1.jpg"]
        assert dto.seller.name == "Store"
        assert dto.shipping.is_free is True
        assert dto.max_installments == 12

    def test_dto_is_frozen(self):
        """Debe ser inmutable"""
        dto = DetailProductOutputDto(
            basics=ProductBasicsDto(
                id="test",
                title="Test",
                price=100,
                original_price=None,
                discount=None,
                condition=ConditionType.NEW,
                sold_count=0,
                available_stock=10,
                description=""
            ),
            media=ProductMediaDto(
                images=[],
                description_images=[]
            ),
            review_count=0,
            category_path=[],
            seller=SellerDto(
                name="Test",
                logo="",
                is_official_store=False,
                followers=0,
                total_products=0,
                level=SellerLevel.BRONZE,
                location="",
                positive_rating=0,
                total_sales=0,
                rating=0.0,
                review_count=0,
                reputation=ReputationDto(red=25, orange=25, yellow=25, green=25),
                reputation_message="",
                good_attention=False,
                on_time_delivery=False
            ),
            shipping=ShippingDto(is_free=False, estimated_days=EstimatedDaysDto(min=1, max=2)),
            characteristics=[],
            highlights=[],
            questions=[],
            related_products=[],
            variants={},
            payment_methods=[],
            max_installments=0,
            available_rating_categories=[],
            reviews=[],
            average_rating=0.0,
            total_reviews=0,
            rating_distribution={},
            average_category_ratings={}
        )

        with pytest.raises(Exception):  # FrozenInstanceError
            dto.basics = ProductBasicsDto(
                id="changed",
                title="Changed",
                price=200,
                original_price=None,
                discount=None,
                condition=ConditionType.NEW,
                sold_count=0,
                available_stock=10,
                description=""
            )
