"""
DTOs para el detalle de producto.
Mapea exactamente con ProductDetail de TypeScript.

Archivo fuente TypeScript: meli-frontend/src/types/product.ts
Interface: ProductDetail
"""

from dataclasses import dataclass
from enum import Enum
from typing import List, Optional, Dict, Union

# Importar enums desde el dominio (evitar duplicación)
from domain.product_detail.entity.product_detail import ConditionType
from domain.seller_information.entity.seller_information import SellerLevel
from domain.payment.entity.payment import PaymentMethodType
from domain.question.entity.question import QuestionStatus
from domain.characteristic.entity.characteristic import CharacteristicType


# ============================================================================
# ENUMS - Todos importados desde el dominio
# ============================================================================
# No hay enums propios de la capa de aplicación.
# Todos los enums residen en el dominio.


# ============================================================================
# SUBDTOS - Navegación
# ============================================================================

@dataclass(frozen=True)
class CategoryPathItemDto:
    """
    Elemento de ruta de categoría.
    TypeScript: CategoryPathItem
    """
    label: str
    href: str


# ============================================================================
# SUBDTOS - Vendedor
# ============================================================================

@dataclass(frozen=True)
class ReputationDto:
    """
    Distribución de reputación del vendedor (debe sumar 100).
    TypeScript: Seller.reputation
    """
    red: int
    orange: int
    yellow: int
    green: int

    def __post_init__(self):
        total = self.red + self.orange + self.yellow + self.green
        if total != 100:
            raise ValueError(f"Reputation must sum to 100, got {total}")


@dataclass(frozen=True)
class SellerDto:
    """
    Información del vendedor.
    TypeScript: Seller
    """
    name: str
    logo: str
    is_official_store: bool
    followers: int
    total_products: int
    level: SellerLevel
    location: str
    positive_rating: float
    total_sales: int
    rating: float
    review_count: int
    reputation: ReputationDto
    reputation_message: str
    good_attention: bool
    on_time_delivery: bool


# ============================================================================
# SUBDTOS - Envío
# ============================================================================

@dataclass(frozen=True)
class EstimatedDaysDto:
    """
    Rango de días estimados de envío.
    TypeScript: Shipping.estimatedDays
    """
    min: int
    max: int


@dataclass(frozen=True)
class ShippingDto:
    """
    Información de envío.
    TypeScript: Shipping
    """
    is_free: bool
    estimated_days: EstimatedDaysDto


# ============================================================================
# SUBDTOS - Características
# ============================================================================

@dataclass(frozen=True)
class SimpleCharacteristicDto:
    """
    Característica simple (nombre-valor).
    TypeScript: CategoryGroup.characteristics[i]
    """
    name: str
    value: str


@dataclass(frozen=True)
class RangeCharacteristicDto:
    """
    Característica con rango visual (ej: tamaño de pantalla).
    TypeScript: RangeCharacteristic
    """
    type: str  # Literal["range"]
    name: str
    value: str  # Puede ser str o convertido de number
    current: float  # Valor actual en el rango
    min: float      # Valor mínimo del rango
    max: float      # Valor máximo del rango
    min_label: str
    max_label: str
    icon: Optional[str] = None
    segments: int = 5  # Número de segmentos (default: 5)


@dataclass(frozen=True)
class HighlightCharacteristicDto:
    """
    Característica destacada con ícono.
    TypeScript: HighlightCharacteristic
    """
    type: str  # Literal["highlight"]
    name: str
    value: str
    icon: str


@dataclass(frozen=True)
class CategoryCharacteristicDto:
    """
    Grupo de características por categoría.
    TypeScript: CategoryGroup
    """
    type: str  # Literal["category"]
    category_name: str
    characteristics: List[SimpleCharacteristicDto]


# Union type para características polimórficas
CharacteristicDto = Union[
    RangeCharacteristicDto,
    HighlightCharacteristicDto,
    CategoryCharacteristicDto
]


# ============================================================================
# SUBDTOS - Preguntas
# ============================================================================

@dataclass(frozen=True)
class QuestionDto:
    """
    Pregunta sobre el producto.
    TypeScript: Question
    """
    id: str
    question: str
    answer: str
    asked_at: str  # ISO 8601 string
    answered_at: str  # ISO 8601 string
    status: QuestionStatus


# ============================================================================
# SUBDTOS - Productos Relacionados
# ============================================================================

@dataclass(frozen=True)
class RelatedProductDto:
    """
    Producto relacionado.
    TypeScript: RelatedProduct
    """
    id: str
    title: str
    price: int
    original_price: Optional[int]
    image: str
    discount: Optional[int]
    installments: int
    installment_amount: int
    is_free_shipping: bool
    is_first_purchase_free_shipping: bool


# ============================================================================
# SUBDTOS - Variantes
# ============================================================================

@dataclass(frozen=True)
class VariantDto:
    """
    Variante individual de producto.
    TypeScript: Variant
    """
    id: str
    label: str
    value: str
    slug: str
    image: Optional[str] = None
    available: bool = True


@dataclass(frozen=True)
class VariantGroupDto:
    """
    Grupo de variantes (color, talla, material, etc.).
    TypeScript: VariantGroup
    """
    title: str
    options: List[VariantDto]
    selected_id: str
    show_images: bool = False
    order: int = 0


# TypeScript: ProductVariants = Record<string, VariantGroup>
ProductVariantsDto = Dict[str, VariantGroupDto]


# ============================================================================
# SUBDTOS - Pagos
# ============================================================================

@dataclass(frozen=True)
class PaymentMethodDto:
    """
    Método de pago disponible.
    TypeScript: PaymentMethod
    """
    id: str
    name: str
    image_url: str
    type: PaymentMethodType


# ============================================================================
# SUBDTOS - Ratings y Reviews
# ============================================================================

@dataclass(frozen=True)
class RatingCategoryDto:
    """
    Categoría de rating para opiniones.
    TypeScript: RatingCategory
    """
    id: str
    name: str
    order: int = 0


@dataclass(frozen=True)
class ReviewDto:
    """
    Opinión/review de usuario.
    TypeScript: Review
    """
    id: str
    user_name: str
    rating: float
    date: str
    comment: str
    likes: int
    verified: bool
    images: Optional[List[str]] = None
    category_ratings: Optional[Dict[str, float]] = None


@dataclass(frozen=True)
class RatingDistributionDto:
    """
    Distribución de ratings (1-5 estrellas).
    TypeScript: RatingDistribution
    """
    five_stars: int
    four_stars: int
    three_stars: int
    two_stars: int
    one_star: int

    def to_dict(self) -> Dict[int, int]:
        """Serializa al formato esperado por frontend {5: n, 4: n, ...}"""
        return {
            5: self.five_stars,
            4: self.four_stars,
            3: self.three_stars,
            2: self.two_stars,
            1: self.one_star
        }


# TypeScript: CategoryRatings = {[categoryId: string]: number}
CategoryRatingsDto = Dict[str, float]


# ============================================================================
# SUBDTOS - Media (Imágenes)
# ============================================================================

@dataclass(frozen=True)
class ProductMediaDto:
    """
    Imágenes del producto.
    TypeScript: ProductDetail.media
    """
    images: List[str]              # Imágenes de detalle (galería principal)
    description_images: List[str]  # Imágenes de descripción


# ============================================================================
# SUBDTOS - Información Básica del Producto
# ============================================================================

@dataclass(frozen=True)
class ProductBasicsDto:
    """
    Información básica del producto.
    TypeScript: ProductDetail.basics
    """
    id: str
    title: str
    price: int
    original_price: Optional[int]
    discount: Optional[int]
    condition: ConditionType
    sold_count: int
    available_stock: int
    description: str


# ============================================================================
# DTO PRINCIPAL
# ============================================================================

@dataclass(frozen=True)
class DetailProductOutputDto:
    """
    DTO principal que mapea exactamente con ProductDetail de TypeScript.

    Archivo fuente TypeScript: meli-frontend/src/types/product.ts
    Interface: ProductDetail

    Total: 27 campos de nivel raíz + 12 interfaces de soporte.
    """

    # ========================================
    # Información básica del producto (1 objeto)
    # ========================================
    basics: ProductBasicsDto

    # ========================================
    # Media (1 objeto)
    # ========================================
    media: ProductMediaDto

    # ========================================
    # Métricas y navegación (2 campos)
    # ========================================
    review_count: int
    category_path: List[CategoryPathItemDto]

    # ========================================
    # Vendedor y envío (2 objetos complejos)
    # ========================================
    seller: SellerDto
    shipping: ShippingDto

    # ========================================
    # Características y destacados (2 campos)
    # ========================================
    characteristics: List[CharacteristicDto]  # Union type
    highlights: List[str]

    # ========================================
    # Interacción y variantes (3 campos)
    # ========================================
    questions: List[QuestionDto]
    related_products: List[RelatedProductDto]
    variants: ProductVariantsDto  # Dict[str, VariantGroupDto]

    # ========================================
    # Pagos (2 campos)
    # ========================================
    payment_methods: List[PaymentMethodDto]
    max_installments: int

    # ========================================
    # Reviews y estadísticas (5 campos)
    # ========================================
    available_rating_categories: List[RatingCategoryDto]
    reviews: List[ReviewDto]
    average_rating: float
    total_reviews: int
    rating_distribution: Dict[int, int]  # {5: 650, 4: 89, ...}
    average_category_ratings: CategoryRatingsDto  # {"camera_quality": 4.7, ...}
