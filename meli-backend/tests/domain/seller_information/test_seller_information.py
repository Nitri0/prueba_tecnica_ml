"""Tests para entidades de SellerInformation"""

import pytest
from domain.seller_information.entity.seller_information import (
    SellerInformation,
    SellerLevel,
    Reputation
)


class TestReputation:
    """Tests para Reputation"""

    def test_create_valid_reputation(self):
        """Debe crear reputación válida que suma 100"""
        rep = Reputation(red=10, orange=20, yellow=30, green=40)
        assert rep.red == 10
        assert rep.green == 40

    def test_reject_invalid_sum(self):
        """Debe rechazar suma diferente de 100"""
        with pytest.raises(ValueError, match="must sum to 100"):
            Reputation(red=10, orange=20, yellow=30, green=30)  # suma 90

    def test_100_percent_one_color(self):
        """Debe aceptar 100% en un solo color"""
        rep = Reputation(red=0, orange=0, yellow=0, green=100)
        assert rep.green == 100


class TestSellerInformation:
    """Tests para SellerInformation"""

    def test_create_complete_seller(self):
        """Debe crear vendedor completo"""
        rep = Reputation(red=0, orange=1, yellow=4, green=95)
        seller = SellerInformation(
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
            reputation=rep,
            reputation_message="Excelente",
            good_attention=True,
            on_time_delivery=True
        )
        assert seller.name == "Apple Store"
        assert seller.level == SellerLevel.PLATINUM
        assert seller.is_official_store is True

    def test_reject_empty_name(self):
        """Debe rechazar nombre vacío"""
        rep = Reputation(red=25, orange=25, yellow=25, green=25)
        with pytest.raises(ValueError, match="name cannot be empty"):
            SellerInformation(
                name="",
                logo="logo.jpg",
                is_official_store=False,
                followers=100,
                total_products=10,
                level=SellerLevel.BRONZE,
                location="Santiago",
                positive_rating=50,
                total_sales=100,
                rating=3.0,
                review_count=50,
                reputation=rep,
                reputation_message="Test",
                good_attention=True,
                on_time_delivery=True
            )

    def test_reject_negative_followers(self):
        """Debe rechazar followers negativos"""
        rep = Reputation(red=25, orange=25, yellow=25, green=25)
        with pytest.raises(ValueError, match="followers must be non-negative"):
            SellerInformation(
                name="Test",
                logo="logo.jpg",
                is_official_store=False,
                followers=-1,
                total_products=10,
                level=SellerLevel.BRONZE,
                location="Santiago",
                positive_rating=50,
                total_sales=100,
                rating=3.0,
                review_count=50,
                reputation=rep,
                reputation_message="Test",
                good_attention=True,
                on_time_delivery=True
            )

    def test_reject_invalid_positive_rating(self):
        """Debe rechazar positive_rating fuera de 0-100"""
        rep = Reputation(red=25, orange=25, yellow=25, green=25)
        with pytest.raises(ValueError, match="positive_rating must be between 0 and 100"):
            SellerInformation(
                name="Test",
                logo="logo.jpg",
                is_official_store=False,
                followers=100,
                total_products=10,
                level=SellerLevel.BRONZE,
                location="Santiago",
                positive_rating=150,
                total_sales=100,
                rating=3.0,
                review_count=50,
                reputation=rep,
                reputation_message="Test",
                good_attention=True,
                on_time_delivery=True
            )

    def test_reject_invalid_rating(self):
        """Debe rechazar rating fuera de 0-5"""
        rep = Reputation(red=25, orange=25, yellow=25, green=25)
        with pytest.raises(ValueError, match="rating must be between 0 and 5"):
            SellerInformation(
                name="Test",
                logo="logo.jpg",
                is_official_store=False,
                followers=100,
                total_products=10,
                level=SellerLevel.BRONZE,
                location="Santiago",
                positive_rating=50,
                total_sales=100,
                rating=6.0,
                review_count=50,
                reputation=rep,
                reputation_message="Test",
                good_attention=True,
                on_time_delivery=True
            )
