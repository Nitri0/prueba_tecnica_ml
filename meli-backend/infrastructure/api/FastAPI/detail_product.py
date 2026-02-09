from fastapi import APIRouter, HTTPException, status, Depends
from typing import Dict, Any

from application.service.detail_product_orchestrator_service import DetailProductService
from application.dto.detail_product_output_dto import DetailProductOutputDto
from infrastructure.container.dependency_container import DependencyContainer
from infrastructure.api.FastAPI.serializer import serialize_to_dict

router = APIRouter(
    prefix="/products",
    tags=["products"]
)

# Instancia global del container de dependencias
_container = DependencyContainer()


def get_detail_product_service() -> DetailProductService:
    """
    Dependency provider para obtener el servicio de detalle de producto.
    Utiliza el Dependency Container para inyectar todas las dependencias.

    Returns:
        DetailProductService con todas las dependencias inyectadas
    """
    return _container.get_detail_product_service()


@router.get("/{product_id}", response_model=Dict[str, Any])
async def get_product_detail(
    product_id: str,
    service: DetailProductService = Depends(get_detail_product_service)
) -> Dict[str, Any]:
    """
    Obtiene el detalle completo de un producto por su ID.

    Este endpoint orquesta múltiples servicios de dominio para construir
    la respuesta completa del producto siguiendo la especificación TypeScript
    de ProductDetail del frontend.

    Args:
        product_id: ID del producto a consultar (ej: MLC63903651)
        service: Servicio inyectado automáticamente por FastAPI

    Returns:
        Diccionario con los detalles completos del producto en formato camelCase

    Raises:
        HTTPException 404: Si el producto no se encuentra
        HTTPException 500: Si ocurre un error interno del servidor

    Example:
        GET /products/MLC63903651
    """
    # Redirect de producto base a variante por defecto (Natural 256GB)
    # El producto base MLC123456789 fue eliminado para evitar duplicación
    if product_id == "MLC123456789":
        product_id = "MLC137702355"  # Natural 256GB

    try:
        product_detail: DetailProductOutputDto = service.get_detail_product_by_id(product_id)

        if product_detail is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Producto con ID {product_id} no encontrado"
            )

        # Serializar a camelCase para compatibilidad con TypeScript
        return serialize_to_dict(product_detail)

    except ValueError as e:
        # Errores de validación o producto no encontrado
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except HTTPException:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=""
        )
    except Exception as e:
        # Errores internos del servidor
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error interno del servidor: {str(e)}"
        )
