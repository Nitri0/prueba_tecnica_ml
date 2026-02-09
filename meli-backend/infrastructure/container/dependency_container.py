"""
Dependency Injection Container
Inyecta todas las dependencias necesarias para el orquestador
"""

# Servicios
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
from application.service.category_path_service import CategoryPathService
from application.service.product_detail_service import ProductDetailService
from application.service.product_image_service import ProductImageService

# Repositorios
from infrastructure.persist.category_path.category_path_repository import CategoryPathRepository
from infrastructure.persist.product_detail.product_detail_repository import ProductDetailRepository
from infrastructure.persist.product_image.product_image_repository import ProductImageRepository
from infrastructure.persist.product_variant.product_variant_mapping_repository import ProductVariantMappingRepository
from infrastructure.persist.product_variant.variant_repository import VariantRepository

# Mappers
from infrastructure.persist.category_path.category_path_mapper import CategoryPathMapper
from infrastructure.persist.product_detail.product_detail_mapper import ProductDetailMapper
from infrastructure.persist.product_image.product_image_mapper import ProductImageMapper

# Orquestador
from application.service.detail_product_orchestrator_service import DetailProductService


class DependencyContainer:
    """
    Container de inyección de dependencias siguiendo Clean Architecture
    """

    def __init__(self):
        # Instanciar servicios (cada servicio instancia su repositorio CSV internamente)
        self._shipping_service = ShippingService()
        self._question_service = QuestionService()
        self._related_product_service = RelatedProductService()
        self._highlight_service = HighlightService()
        self._rating_category_service = RatingCategoryService()
        self._characteristic_service = CharacteristicService()
        self._review_statistics_service = ReviewStatisticsService()
        self._payment_service = PaymentService()
        self._seller_information_service = SellerInformationService()

        # Instanciar CategoryPathService con repositorio y mapper
        category_path_repository = CategoryPathRepository()
        category_path_mapper = CategoryPathMapper()
        self._category_path_service = CategoryPathService(
            repository=category_path_repository,
            mapper=category_path_mapper
        )

        # Instanciar ProductDetailService con repositorio y mapper
        product_detail_repository = ProductDetailRepository()
        product_detail_mapper = ProductDetailMapper()
        self._product_detail_service = ProductDetailService(
            repository=product_detail_repository,
            mapper=product_detail_mapper
        )

        # Instanciar ProductImageService con repositorio y mapper
        product_image_repository = ProductImageRepository()
        product_image_mapper = ProductImageMapper()
        self._product_image_service = ProductImageService(
            repository=product_image_repository,
            mapper=product_image_mapper
        )

        # Instanciar VariantProductService unificado con ambos repositorios
        variant_repository = VariantRepository()
        product_variant_mapping_repository = ProductVariantMappingRepository()
        self._variant_product_service = VariantProductService(
            variant_repository=variant_repository,
            mapping_repository=product_variant_mapping_repository
        )

        # Instanciar orquestador con todos los servicios
        self._detail_product_service = DetailProductService(
            shipping_service=self._shipping_service,
            question_service=self._question_service,
            variant_service=self._variant_product_service,
            related_product_service=self._related_product_service,
            highlight_service=self._highlight_service,
            rating_category_service=self._rating_category_service,
            characteristic_service=self._characteristic_service,
            review_statistics_service=self._review_statistics_service,
            payment_service=self._payment_service,
            seller_information_service=self._seller_information_service,
            category_path_service=self._category_path_service,
            product_detail_service=self._product_detail_service,
            product_image_service=self._product_image_service
        )

    def get_detail_product_service(self) -> DetailProductService:
        """
        Retorna el servicio orquestador con todas las dependencias inyectadas
        """
        return self._detail_product_service

    # Getters para servicios individuales (si se necesitan)
    def get_shipping_service(self) -> ShippingService:
        return self._shipping_service

    def get_question_service(self) -> QuestionService:
        return self._question_service

    def get_variant_product_service(self) -> VariantProductService:
        return self._variant_product_service

    def get_related_product_service(self) -> RelatedProductService:
        return self._related_product_service

    def get_highlight_service(self) -> HighlightService:
        return self._highlight_service

    def get_rating_category_service(self) -> RatingCategoryService:
        return self._rating_category_service

    def get_characteristic_service(self) -> CharacteristicService:
        return self._characteristic_service

    def get_review_statistics_service(self) -> ReviewStatisticsService:
        return self._review_statistics_service

    def get_payment_service(self) -> PaymentService:
        return self._payment_service

    def get_seller_information_service(self) -> SellerInformationService:
        return self._seller_information_service

    def get_category_path_service(self) -> CategoryPathService:
        return self._category_path_service

    def get_product_detail_service(self) -> ProductDetailService:
        return self._product_detail_service

    def get_product_image_service(self) -> ProductImageService:
        return self._product_image_service
