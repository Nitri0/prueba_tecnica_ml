import csv
import os
from typing import Optional, Dict
from domain.product_variant.entity.product_variant_mapping import ProductVariantMapping
from domain.product_variant.interfaces.iproduct_variant_mapping_repository import IProductVariantMappingRepository


class ProductVariantMappingRepository(IProductVariantMappingRepository):
    """Repositorio CSV para mappings de variantes a product IDs."""

    def __init__(self):
        current_dir = os.path.dirname(__file__)
        self.csv_path = os.path.join(current_dir, "data", "variant_product_mapping.csv")

    def get_by_combination(
        self,
        base_product_id: str,
        variant_combination: Dict[str, str]
    ) -> Optional[ProductVariantMapping]:
        """Busca mapping en CSV."""
        try:
            # Normalizar combinación: ordenar por key alfabéticamente
            normalized_combo = self._normalize_combination(variant_combination)

            with open(self.csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['base_product_id'] == base_product_id:
                        row_combo = self._parse_combination(row['variant_combination'])
                        if row_combo == normalized_combo:
                            return ProductVariantMapping(
                                base_product_id=row['base_product_id'],
                                variant_combination=variant_combination,
                                product_variant_id=row['product_variant_id']
                            )
        except FileNotFoundError:
            pass
        except Exception as e:
            print(f"Error reading variant mapping CSV: {e}")

        return None

    def _normalize_combination(self, combo: Dict[str, str]) -> str:
        """Convierte dict a string normalizado: 'key1:val1|key2:val2'"""
        sorted_items = sorted(combo.items())
        return '|'.join(f"{k}:{v}" for k, v in sorted_items)

    def _parse_combination(self, combo_str: str) -> str:
        """Parsea string CSV a formato normalizado."""
        # Ya viene en formato normalizado desde CSV
        return combo_str
