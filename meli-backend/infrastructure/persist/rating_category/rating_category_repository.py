"""Repositorio CSV para RatingCategory"""

import csv
import os
from typing import List
from domain.review.entity.rating_category import RatingCategory


class RatingCategoryRepository:
    """Repositorio que lee categorías de rating desde CSV"""

    def __init__(self):
        current_dir = os.path.dirname(__file__)
        self.csv_path = os.path.join(current_dir, "data", "rating_category.csv")

    def get_all(self) -> List[RatingCategory]:
        """Obtiene todas las categorías de rating disponibles"""
        categories = []
        try:
            with open(self.csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    category = RatingCategory(
                        id=row['id'],
                        name=row['name'],
                        order=int(row['order'])
                    )
                    categories.append(category)
        except FileNotFoundError:
            pass
        except Exception as e:
            print(f"Error reading rating category CSV: {e}")
        return categories
