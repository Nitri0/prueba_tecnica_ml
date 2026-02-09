"""
Tests unitarios para ProductImageService
"""

import pytest
from unittest.mock import Mock

from application.service.product_image_service import ProductImageService
from application.dto.detail_product_output_dto import ProductMediaDto
from domain.product_image.entity.product_image import ProductImage, ImageType


class TestProductImageService:
    """Tests para el servicio de imágenes de producto"""

    @pytest.fixture
    def mock_repository(self):
        """Mock del ProductImageRepository"""
        return Mock()

    @pytest.fixture
    def mock_mapper(self):
        """Mock del ProductImageMapper"""
        return Mock()

    @pytest.fixture
    def product_image_service(self, mock_repository, mock_mapper):
        """Fixture que crea el servicio con mocks inyectados"""
        return ProductImageService(
            repository=mock_repository,
            mapper=mock_mapper
        )

    @pytest.fixture
    def sample_product_images(self):
        """Fixture con imágenes de ejemplo"""
        return [
            ProductImage(
                url="https://example.com/image1.jpg",
                type=ImageType.DETAIL,
                order=1
            ),
            ProductImage(
                url="https://example.com/image2.jpg",
                type=ImageType.DETAIL,
                order=2
            ),
            ProductImage(
                url="https://example.com/desc1.jpg",
                type=ImageType.DESCRIPTION,
                order=1
            )
        ]

    def test_get_media_by_product_id_should_call_repository(
        self,
        product_image_service,
        mock_repository,
        sample_product_images
    ):
        """Debe llamar al repositorio con el product_id correcto"""
        # Arrange
        product_id = "MLC123456789"
        mock_repository.get_by_product_id.return_value = sample_product_images

        # Act
        product_image_service.get_media_by_product_id(product_id)

        # Assert
        mock_repository.get_by_product_id.assert_called_once_with(product_id)

    def test_get_media_by_product_id_should_call_mapper(
        self,
        product_image_service,
        mock_repository,
        mock_mapper,
        sample_product_images
    ):
        """Debe llamar al mapper con las entidades del repositorio"""
        # Arrange
        product_id = "MLC123456789"
        mock_repository.get_by_product_id.return_value = sample_product_images
        expected_dto = ProductMediaDto(
            images=["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
            description_images=["https://example.com/desc1.jpg"]
        )
        mock_mapper.to_media_dto.return_value = expected_dto

        # Act
        product_image_service.get_media_by_product_id(product_id)

        # Assert
        mock_mapper.to_media_dto.assert_called_once_with(sample_product_images)

    def test_get_media_by_product_id_should_return_product_media_dto(
        self,
        product_image_service,
        mock_repository,
        mock_mapper,
        sample_product_images
    ):
        """Debe retornar un ProductMediaDto"""
        # Arrange
        product_id = "MLC123456789"
        mock_repository.get_by_product_id.return_value = sample_product_images
        expected_dto = ProductMediaDto(
            images=["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
            description_images=["https://example.com/desc1.jpg"]
        )
        mock_mapper.to_media_dto.return_value = expected_dto

        # Act
        result = product_image_service.get_media_by_product_id(product_id)

        # Assert
        assert isinstance(result, ProductMediaDto)
        assert result == expected_dto

    def test_get_media_by_product_id_should_handle_empty_images(
        self,
        product_image_service,
        mock_repository,
        mock_mapper
    ):
        """Debe manejar correctamente cuando no hay imágenes"""
        # Arrange
        product_id = "MLC123456789"
        mock_repository.get_by_product_id.return_value = []
        empty_dto = ProductMediaDto(images=[], description_images=[])
        mock_mapper.to_media_dto.return_value = empty_dto

        # Act
        result = product_image_service.get_media_by_product_id(product_id)

        # Assert
        assert result.images == []
        assert result.description_images == []

    def test_get_media_by_product_id_should_handle_only_detail_images(
        self,
        product_image_service,
        mock_repository,
        mock_mapper
    ):
        """Debe manejar correctamente cuando solo hay imágenes de detalle"""
        # Arrange
        product_id = "MLC123456789"
        detail_only = [
            ProductImage(
                url="https://example.com/image1.jpg",
                type=ImageType.DETAIL,
                order=1
            )
        ]
        mock_repository.get_by_product_id.return_value = detail_only
        dto = ProductMediaDto(
            images=["https://example.com/image1.jpg"],
            description_images=[]
        )
        mock_mapper.to_media_dto.return_value = dto

        # Act
        result = product_image_service.get_media_by_product_id(product_id)

        # Assert
        assert len(result.images) == 1
        assert len(result.description_images) == 0

    def test_get_media_by_product_id_should_handle_only_description_images(
        self,
        product_image_service,
        mock_repository,
        mock_mapper
    ):
        """Debe manejar correctamente cuando solo hay imágenes de descripción"""
        # Arrange
        product_id = "MLC123456789"
        description_only = [
            ProductImage(
                url="https://example.com/desc1.jpg",
                type=ImageType.DESCRIPTION,
                order=1
            )
        ]
        mock_repository.get_by_product_id.return_value = description_only
        dto = ProductMediaDto(
            images=[],
            description_images=["https://example.com/desc1.jpg"]
        )
        mock_mapper.to_media_dto.return_value = dto

        # Act
        result = product_image_service.get_media_by_product_id(product_id)

        # Assert
        assert len(result.images) == 0
        assert len(result.description_images) == 1
