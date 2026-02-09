"""Repositorio CSV para Review"""

import csv
import os
from typing import List, Dict, Optional
from domain.review.entity.review import Review


class ReviewRepository:
    """Repositorio que lee reviews desde CSV"""

    def __init__(self):
        current_dir = os.path.dirname(__file__)
        self.csv_path = os.path.join(current_dir, "data", "review.csv")

    def get_by_product_id(self, product_id: str) -> List[Review]:
        """Obtiene todos los reviews de un producto"""
        reviews = []
        try:
            with open(self.csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['product_id'] == product_id:
                        # Procesar imágenes
                        images = None
                        if row['images']:
                            images = row['images'].split('|')

                        # Procesar category ratings
                        category_ratings = {}
                        for key in ['camera_quality', 'battery_life', 'screen_quality',
                                   'performance', 'build_quality', 'value_for_money']:
                            if row[key]:
                                category_ratings[key] = int(row[key])

                        review = Review(
                            id=row['id'],
                            user_name=row['user_name'],
                            rating=float(row['rating']),
                            date=row['date'],
                            comment=row['comment'],
                            likes=int(row['likes']),
                            verified=row['verified'].lower() == 'true',
                            images=images,
                            category_ratings=category_ratings if category_ratings else None
                        )
                        reviews.append(review)
        except FileNotFoundError:
            pass
        except Exception as e:
            print(f"Error reading review CSV: {e}")
        return reviews

    def get_statistics(self, product_id: str) -> Dict:
        """Calcula estadísticas de reviews para un producto"""
        reviews = self.get_by_product_id(product_id)

        if not reviews:
            return {
                'average_rating': 0.0,
                'total_reviews': 0,
                'rating_distribution': {5: 0, 4: 0, 3: 0, 2: 0, 1: 0},
                'average_category_ratings': {}
            }

        # Calcular promedio general
        total_rating = sum(r.rating for r in reviews)
        average_rating = total_rating / len(reviews)

        # Calcular distribución de ratings
        distribution = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0}
        for review in reviews:
            star = int(review.rating)
            distribution[star] = distribution.get(star, 0) + 1

        # Calcular promedios por categoría
        category_sums = {}
        category_counts = {}
        for review in reviews:
            if review.category_ratings:
                for cat_id, rating in review.category_ratings.items():
                    category_sums[cat_id] = category_sums.get(cat_id, 0) + rating
                    category_counts[cat_id] = category_counts.get(cat_id, 0) + 1

        average_category_ratings = {
            cat_id: category_sums[cat_id] / category_counts[cat_id]
            for cat_id in category_sums
        }

        return {
            'average_rating': round(average_rating, 1),
            'total_reviews': len(reviews),
            'rating_distribution': distribution,
            'average_category_ratings': average_category_ratings
        }
