"""
API Router para resolución de variantes de productos.
"""

from fastapi import APIRouter, Query, HTTPException
from typing import Dict
from pydantic import BaseModel

from infrastructure.container.dependency_container import DependencyContainer


router = APIRouter(prefix="/api", tags=["variants"])


class ResolveVariantResponse(BaseModel):
    """Respuesta del endpoint de resolución de variantes"""
    baseProductId: str
    variantCombination: Dict[str, str]
    productVariantId: str


@router.get("/products/{base_product_id}/resolve-variant", response_model=ResolveVariantResponse)
async def resolve_variant_product_id(
    base_product_id: str,
    variants: str = Query(
        ...,
        description="Variantes en formato: color:azul,capacidad:256gb",
        example="color:azul,capacidad:256gb"
    )
):
    """
    Resuelve el product ID específico basado en variantes seleccionadas.

    Args:
        base_product_id: ID del producto base (ej: "MLC123456789")
        variants: String con variantes en formato "key:value,key:value"

    Returns:
        ResolveVariantResponse con el product_variant_id correspondiente

    Example:
        GET /api/products/MLC123456789/resolve-variant?variants=color:azul,capacidad:256gb

        Response:
        {
            "baseProductId": "MLC123456789",
            "variantCombination": {"color": "azul", "capacidad": "256gb"},
            "productVariantId": "MLC928744140"
        }
    """
    # Parsear string de variantes a diccionario
    variant_dict = {}
    try:
        for pair in variants.split(','):
            key, value = pair.split(':')
            variant_dict[key.strip()] = value.strip()
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid variants format. Expected 'key:value,key:value'"
        )

    if not variant_dict:
        raise HTTPException(
            status_code=400,
            detail="At least one variant is required"
        )

    # Resolver usando el servicio unificado
    container = DependencyContainer()
    variant_product_service = container.get_variant_product_service()

    product_variant_id = variant_product_service.resolve_product_id(
        base_product_id,
        variant_dict
    )

    return ResolveVariantResponse(
        baseProductId=base_product_id,
        variantCombination=variant_dict,
        productVariantId=product_variant_id
    )
