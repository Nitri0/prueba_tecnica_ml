"""Servicio orquestador para detalle de producto"""

from typing import Optional, List
from application.dto.detail_product_output_dto import (
    DetailProductOutputDto,
    CategoryPathItemDto,
    ConditionType
)
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


class DetailProductService:
    """
    Servicio orquestador que coordina todos los servicios para construir
    el DetailProductOutputDto completo.
    """

    def __init__(self,
                 shipping_service: ShippingService,
                 question_service: QuestionService,
                 variant_service: VariantProductService,
                 related_product_service: RelatedProductService,
                 highlight_service: HighlightService,
                 rating_category_service: RatingCategoryService,
                 characteristic_service: CharacteristicService,
                 review_statistics_service: ReviewStatisticsService,
                 payment_service: PaymentService,
                 seller_information_service: SellerInformationService,
                 category_path_service: CategoryPathService,
                 product_detail_service: ProductDetailService,
                 product_image_service: ProductImageService):
        self.shipping_service = shipping_service
        self.question_service = question_service
        self.variant_service = variant_service
        self.related_product_service = related_product_service
        self.highlight_service = highlight_service
        self.rating_category_service = rating_category_service
        self.characteristic_service = characteristic_service
        self.review_statistics_service = review_statistics_service
        self.payment_service = payment_service
        self.seller_information_service = seller_information_service
        self.category_path_service = category_path_service
        self.product_detail_service = product_detail_service
        self.product_image_service = product_image_service

    def get_detail_product_by_id(self, product_id: str) -> Optional[DetailProductOutputDto]:
        """
        Obtiene el detalle completo de un producto por su ID.

        Args:
            product_id: ID del producto a buscar

        Returns:
            DetailProductOutputDto con la información completa del producto, None si no existe
        """
        if not product_id:
            return None

        # TODO: Implementar validación de existencia del producto

        # Orquestar llamadas a todos los servicios
        basics = self.product_detail_service.get_basics_by_product_id(product_id)
        media = self.product_image_service.get_media_by_product_id(product_id)
        shipping = self.shipping_service.get_shipping_by_product_id(product_id)
        questions = self.question_service.get_questions_by_product_id(product_id)
        variants = self.variant_service.get_variants_by_product_id(product_id)
        related_products = self.related_product_service.get_related_products_by_product_id(product_id)
        highlights = self.highlight_service.get_highlights_by_product_id(product_id)
        rating_categories = self.rating_category_service.get_rating_categories_by_product_id(product_id)
        characteristics = self.characteristic_service.get_characteristics_by_product_id(product_id)
        reviews = self.review_statistics_service.get_reviews_by_product_id(product_id)
        average_rating = self.review_statistics_service.get_average_rating(product_id)
        total_reviews = self.review_statistics_service.get_total_reviews(product_id)
        rating_distribution = self.review_statistics_service.get_rating_distribution(product_id)
        average_category_ratings = self.review_statistics_service.get_average_category_ratings(product_id)
        payment_methods = self.payment_service.get_payment_methods_by_product_id(product_id)
        seller = self.seller_information_service.get_seller_information_by_product_id(product_id)
        category_path = self.category_path_service.get_category_path_by_product_id(product_id)

        # Validar que existan los datos básicos del producto
        if not basics:
            return None

        # Construir DTO principal
        return DetailProductOutputDto(
            # Información básica del producto
            basics=basics,

            # Media
            media=media,

            # Métricas
            review_count=total_reviews,

            # Navegación
            category_path=category_path,

            # Vendedor y envío
            seller=seller,
            shipping=shipping,

            # Características y destacados
            characteristics=characteristics,
            highlights=highlights,

            # Interacción y variantes
            questions=questions,
            related_products=related_products,
            variants=variants,

            # Pagos
            payment_methods=payment_methods,
            max_installments=self.payment_service.get_max_installments(),

            # Reviews y estadísticas
            available_rating_categories=rating_categories,
            reviews=reviews,
            average_rating=average_rating,
            total_reviews=total_reviews,
            rating_distribution=rating_distribution,
            average_category_ratings=average_category_ratings
        )
