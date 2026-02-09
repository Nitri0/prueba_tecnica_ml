from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from infrastructure.api.FastAPI.detail_product import router as product_router
from infrastructure.api.FastAPI.variant_resolver import router as variant_router


def create_application() -> FastAPI:
    """
    Factory function para crear y configurar la aplicación FastAPI.

    Returns:
        Instancia configurada de FastAPI
    """
    app = FastAPI(
        title="Meli Backend API",
        description="API REST para gestión de productos estilo Mercado Libre",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc"
    )

    # Configurar CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # En producción, especificar orígenes permitidos
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Registrar routers
    app.include_router(product_router)
    app.include_router(variant_router)

    # Health check endpoint
    @app.get("/health", tags=["health"])
    async def health_check():
        """Endpoint para verificar el estado del servicio."""
        return {"status": "healthy", "service": "meli-backend"}

    return app


# Instancia de la aplicación
app = create_application()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "application.entrypoint.main:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
        log_level="info"
    )
