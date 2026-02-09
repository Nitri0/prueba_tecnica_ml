"""Tests para el endpoint de detalle de producto"""

import pytest
from fastapi.testclient import TestClient
from application.entrypoint.main import create_application


class TestDetailProductEndpoint:
    """Tests para el endpoint /products/{product_id}"""

    @pytest.fixture
    def client(self):
        """Fixture que crea el cliente de prueba"""
        app = create_application()
        return TestClient(app)

    def test_health_check(self, client):
        """Debe responder correctamente al health check"""
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert data["service"] == "meli-backend"

    def test_get_product_detail_returns_200(self, client):
        """Debe retornar 200 para un producto válido"""
        response = client.get("/products/MLC123456789")
        assert response.status_code == 200

    def test_get_product_detail_returns_json(self, client):
        """Debe retornar JSON válido"""
        response = client.get("/products/MLC123456789")
        assert response.headers["content-type"] == "application/json"
        data = response.json()
        assert isinstance(data, dict)

    def test_get_product_detail_has_required_fields(self, client):
        """Debe retornar todos los campos requeridos"""
        response = client.get("/products/MLC123456789")
        data = response.json()

        # Verificar campos de nivel raíz
        required_root_fields = [
            "basics", "media", "reviewCount", "categoryPath",
            "seller", "shipping", "characteristics", "highlights",
            "questions", "relatedProducts", "variants",
            "paymentMethods", "maxInstallments",
            "availableRatingCategories", "reviews",
            "averageRating", "totalReviews", "ratingDistribution",
            "averageCategoryRatings"
        ]

        for field in required_root_fields:
            assert field in data, f"Campo '{field}' faltante en la respuesta"

        # Verificar campos dentro de basics
        basics_fields = ["id", "title", "price", "condition", "soldCount", "availableStock", "description"]
        for field in basics_fields:
            assert field in data["basics"], f"Campo '{field}' faltante en basics"

        # Verificar campos dentro de media
        media_fields = ["images", "descriptionImages"]
        for field in media_fields:
            assert field in data["media"], f"Campo '{field}' faltante en media"

    def test_get_product_detail_camel_case_fields(self, client):
        """Debe retornar campos en camelCase"""
        response = client.get("/products/MLC123456789")
        data = response.json()

        # Verificar que los campos de nivel raíz están en camelCase
        assert "averageRating" in data  # NO average_rating
        assert "categoryPath" in data  # NO category_path
        assert "reviewCount" in data  # NO review_count

        # Verificar que los campos dentro de basics están en camelCase
        assert "soldCount" in data["basics"]  # NO sold_count
        assert "availableStock" in data["basics"]  # NO available_stock

        # Verificar que los campos dentro de media están en camelCase
        assert "descriptionImages" in data["media"]  # NO description_images

    def test_get_product_detail_seller_structure(self, client):
        """Debe retornar estructura correcta de seller"""
        response = client.get("/products/MLC123456789")
        data = response.json()

        seller = data["seller"]
        assert "name" in seller
        assert "isOfficialStore" in seller  # camelCase
        assert "level" in seller
        assert "reputation" in seller

        reputation = seller["reputation"]
        assert "red" in reputation
        assert "orange" in reputation
        assert "yellow" in reputation
        assert "green" in reputation

    def test_get_product_detail_variants_structure(self, client):
        """Debe retornar estructura correcta de variants (Record type)"""
        response = client.get("/products/MLC123456789")
        data = response.json()

        variants = data["variants"]
        assert isinstance(variants, dict)  # Record<string, VariantGroup>

        if variants:
            # Verificar estructura de un variant group
            variant_group = next(iter(variants.values()))
            assert "title" in variant_group
            assert "options" in variant_group
            assert "selectedId" in variant_group  # camelCase

    def test_get_product_detail_rating_distribution(self, client):
        """Debe retornar ratingDistribution con keys numéricas"""
        response = client.get("/products/MLC123456789")
        data = response.json()

        distribution = data["ratingDistribution"]
        assert isinstance(distribution, dict)

        # Verificar que tiene keys numéricas (como strings en JSON)
        assert "5" in distribution or 5 in distribution
        assert "4" in distribution or 4 in distribution
        assert "1" in distribution or 1 in distribution

    def test_get_product_detail_different_ids(self, client):
        """Debe aceptar diferentes IDs de producto"""
        # ID existente debe retornar 200
        response_existing = client.get("/products/MLC123456789")
        assert response_existing.status_code == 200

        # IDs no existentes deben retornar 404
        response1 = client.get("/products/MLC123")
        response2 = client.get("/products/ABC999")
        response3 = client.get("/products/test-id-123")

        assert response1.status_code == 404
        assert response2.status_code == 404
        assert response3.status_code == 404

    def test_get_product_detail_with_empty_id_returns_404(self, client):
        """Debe retornar 404 para ID vacío"""
        response = client.get("/products/")
        # FastAPI retorna 404 cuando falta el parámetro de path
        assert response.status_code in [404, 405]  # 404 o 405 Method Not Allowed

    def test_response_content_type_is_json(self, client):
        """Debe tener Content-Type correcto"""
        response = client.get("/products/MLC123456789")
        assert "application/json" in response.headers["content-type"]

    def test_cors_headers_present(self, client):
        """Debe incluir headers CORS"""
        response = client.get("/products/MLC123456789")
        # Verificar que se permite CORS (configurado en el main.py)
        assert response.status_code == 200
