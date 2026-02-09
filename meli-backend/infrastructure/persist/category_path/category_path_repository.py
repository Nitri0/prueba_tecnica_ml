"""Repositorio CSV para CategoryPath"""

import csv
import os
from typing import List
from domain.category_path.entity.category_path import CategoryPath


class CategoryPathRepository:
    """Repositorio que lee category paths desde CSV"""

    def __init__(self):
        current_dir = os.path.dirname(__file__)
        self.csv_path = os.path.join(current_dir, "data", "category_path.csv")

    def get_by_product_id(self, product_id: str) -> List[CategoryPath]:
        """
        Obtiene todos los elementos de category path para un producto,
        ordenados por el campo 'order'.

        Args:
            product_id: ID del producto

        Returns:
            Lista de CategoryPath ordenada por el campo 'order'
        """
        category_paths = []
        try:
            with open(self.csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['product_id'] == product_id:
                        category_path = CategoryPath(
                            label=row['label'],
                            href=row['href'],
                            order=int(row['order'])
                        )
                        category_paths.append(category_path)

        except FileNotFoundError:
            pass
        except Exception as e:
            print(f"Error reading category_path CSV: {e}")

        # Ordenar por el campo 'order'
        category_paths.sort(key=lambda cp: cp.order)

        return category_paths
