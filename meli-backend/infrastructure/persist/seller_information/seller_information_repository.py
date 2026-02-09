"""Repositorio CSV para SellerInformation"""

import csv
import os
from typing import Optional
from domain.seller_information.entity.seller_information import SellerInformation, Reputation, SellerLevel


class SellerInformationRepository:
    """Repositorio que lee información del vendedor desde CSV"""

    def __init__(self):
        current_dir = os.path.dirname(__file__)
        self.csv_path = os.path.join(current_dir, "data", "seller_information.csv")

    def get_by_product_id(self, product_id: str) -> Optional[SellerInformation]:
        """Obtiene información del vendedor por ID de producto"""
        try:
            with open(self.csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['product_id'] == product_id:
                        return SellerInformation(
                            name=row['name'],
                            logo=row['logo'],
                            is_official_store=row['is_official_store'].lower() == 'true',
                            followers=int(row['followers']),
                            total_products=int(row['total_products']),
                            level=SellerLevel(row['level']),
                            location=row['location'],
                            positive_rating=float(row['positive_rating']),
                            total_sales=int(row['total_sales']),
                            rating=float(row['rating']),
                            review_count=int(row['review_count']),
                            reputation=Reputation(
                                red=int(row['reputation_red']),
                                orange=int(row['reputation_orange']),
                                yellow=int(row['reputation_yellow']),
                                green=int(row['reputation_green'])
                            ),
                            reputation_message=row['reputation_message'],
                            good_attention=row['good_attention'].lower() == 'true',
                            on_time_delivery=row['on_time_delivery'].lower() == 'true'
                        )
            return None
        except FileNotFoundError:
            return None
        except Exception as e:
            print(f"Error reading seller information CSV: {e}")
            return None
