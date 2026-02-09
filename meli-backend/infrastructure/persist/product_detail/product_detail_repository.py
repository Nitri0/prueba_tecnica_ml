"""Repositorio CSV para ProductDetail"""

import csv
import os
import json
from typing import Optional
from domain.product_detail.entity.product_detail import ProductDetail, ConditionType


class ProductDetailRepository:
    """Repositorio que lee información básica del producto desde CSV"""

    def __init__(self):
        current_dir = os.path.dirname(__file__)
        self.csv_path = os.path.join(current_dir, "data", "product_detail.csv")

    def get_by_product_id(self, product_id: str) -> Optional[ProductDetail]:
        """
        Obtiene la información básica de un producto por su ID.

        Args:
            product_id: ID del producto

        Returns:
            ProductDetail o None si no existe
        """
        try:
            with open(self.csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['product_id'] == product_id:
                        # Parsear condition
                        condition_map = {
                            'new': ConditionType.NEW,
                            'used': ConditionType.USED,
                            'refurbished': ConditionType.REFURBISHED
                        }
                        condition = condition_map.get(row['condition'].lower(), ConditionType.NEW)

                        return ProductDetail(
                            id=row['product_id'],
                            title=row['title'],
                            price=int(row['price']),
                            original_price=int(row['original_price']) if row['original_price'] else 0,
                            discount=int(row['discount']) if row['discount'] else 0,
                            condition=condition,
                            sold_count=int(row['sold_count']) if row['sold_count'] else 0,
                            available_stock=int(row['available_stock']) if row['available_stock'] else 0,
                            description=row['description']
                        )

        except FileNotFoundError:
            pass
        except Exception as e:
            print(f"Error reading product_detail CSV: {e}")

        return None
