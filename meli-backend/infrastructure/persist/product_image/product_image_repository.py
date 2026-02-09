"""Repositorio CSV para ProductImage"""

import csv
import os
from typing import List
from domain.product_image.entity.product_image import ProductImage, ImageType


class ProductImageRepository:
    """Repositorio que lee imágenes del producto desde CSV"""

    def __init__(self):
        current_dir = os.path.dirname(__file__)
        self.csv_path = os.path.join(current_dir, "data", "product_image.csv")

    def get_by_product_id(self, product_id: str) -> List[ProductImage]:
        """
        Obtiene todas las imágenes de un producto, ordenadas por el campo 'order'.

        Args:
            product_id: ID del producto

        Returns:
            Lista de ProductImage ordenada por el campo 'order'
        """
        images = []
        try:
            with open(self.csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['product_id'] == product_id:
                        # Parsear el tipo de imagen
                        image_type = ImageType.DETAIL if row['type'].lower() == 'detail' else ImageType.DESCRIPTION

                        image = ProductImage(
                            url=row['url'],
                            type=image_type,
                            order=int(row['order'])
                        )
                        images.append(image)

        except FileNotFoundError:
            pass
        except Exception as e:
            print(f"Error reading product_image CSV: {e}")

        # Ordenar por el campo 'order'
        images.sort(key=lambda img: img.order)

        return images
