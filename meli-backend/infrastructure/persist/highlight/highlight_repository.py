"""Repositorio CSV para Highlights"""

import csv
import os
from typing import List


class HighlightRepository:
    """Repositorio que lee highlights desde CSV"""

    def __init__(self):
        current_dir = os.path.dirname(__file__)
        self.csv_path = os.path.join(current_dir, "data", "highlight.csv")

    def get_by_product_id(self, product_id: str) -> List[str]:
        """Obtiene todos los highlights de un producto"""
        highlights = []
        try:
            with open(self.csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['product_id'] == product_id:
                        highlights.append(row['highlight'])
        except FileNotFoundError:
            pass
        except Exception as e:
            print(f"Error reading highlight CSV: {e}")
        return highlights
