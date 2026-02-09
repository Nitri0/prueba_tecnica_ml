"""Repositorio CSV para Shipping"""

import csv
import os
from typing import Optional
from domain.shipping.entity.shipping import Shipping, EstimatedDays


class ShippingRepository:
    """Repositorio que lee datos de shipping desde CSV"""

    def __init__(self):
        current_dir = os.path.dirname(__file__)
        self.csv_path = os.path.join(current_dir, "data", "shipping.csv")

    def get_by_product_id(self, product_id: str) -> Optional[Shipping]:
        """Obtiene información de envío por ID de producto"""
        try:
            with open(self.csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['product_id'] == product_id:
                        return Shipping(
                            is_free=row['is_free'].lower() == 'true',
                            estimated_days=EstimatedDays(
                                min=int(row['min_days']),
                                max=int(row['max_days'])
                            )
                        )
            return None
        except FileNotFoundError:
            return None
        except Exception as e:
            print(f"Error reading shipping CSV: {e}")
            return None
