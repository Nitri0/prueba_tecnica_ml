"""Repositorio CSV para RelatedProduct"""

import csv
import os
from typing import List, Optional
from domain.related_product.entity.related_product import RelatedProduct


class RelatedProductRepository:
    """Repositorio que lee productos relacionados desde CSV"""

    def __init__(self):
        current_dir = os.path.dirname(__file__)
        self.csv_path = os.path.join(current_dir, "data", "related_product.csv")

    def get_by_product_id(self, product_id: str) -> List[RelatedProduct]:
        """Obtiene todos los productos relacionados de un producto"""
        related_products = []
        try:
            with open(self.csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['product_id'] == product_id:
                        product = RelatedProduct(
                            id=row['id'],
                            title=row['title'],
                            price=int(row['price']),
                            original_price=int(row['original_price']) if row['original_price'] else None,
                            image=row['image'],
                            discount=int(row['discount']) if row['discount'] else None,
                            installments=int(row['installments']),
                            installment_amount=int(row['installment_amount']),
                            is_free_shipping=row['is_free_shipping'].lower() == 'true',
                            is_first_purchase_free_shipping=row['is_first_purchase_free_shipping'].lower() == 'true'
                        )
                        related_products.append(product)
        except FileNotFoundError:
            pass
        except Exception as e:
            print(f"Error reading related product CSV: {e}")
        return related_products
