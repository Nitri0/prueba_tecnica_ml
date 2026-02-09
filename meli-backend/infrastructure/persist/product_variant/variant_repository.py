"""Repositorio CSV para Variant"""

import csv
import os
from typing import Dict
from domain.product_variant.entity.variant import Variant, VariantGroup
from domain.product_variant.interfaces.ivariant_repository import IVariantRepository


class VariantRepository(IVariantRepository):
    """Repositorio que lee variantes desde CSV"""

    def __init__(self):
        current_dir = os.path.dirname(__file__)
        self.csv_path = os.path.join(current_dir, "data", "variant.csv")

    def get_by_product_id(self, product_id: str) -> Dict[str, VariantGroup]:
        """Obtiene todas las variantes de un producto agrupadas"""
        variant_groups = {}
        try:
            with open(self.csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['product_id'] == product_id:
                        group_key = row['group_key']

                        # Crear variante option
                        variant_option = Variant(
                            id=row['option_id'],
                            label=row['option_label'],
                            value=row['option_value'],
                            slug=row['option_slug'],
                            image=row['option_image'] if row['option_image'] else None,
                            available=row['option_available'].lower() == 'true'
                        )

                        # Si el grupo no existe, crearlo
                        if group_key not in variant_groups:
                            variant_groups[group_key] = {
                                'title': row['group_title'],
                                'selected_id': row['selected_id'],
                                'show_images': row['show_images'].lower() == 'true',
                                'order': int(row['group_order']),
                                'options': []
                            }

                        # Agregar opción al grupo
                        variant_groups[group_key]['options'].append(variant_option)

            # Convertir a VariantGroup entities
            result = {}
            for key, data in variant_groups.items():
                result[key] = VariantGroup(
                    title=data['title'],
                    options=data['options'],
                    selected_id=data['selected_id'],
                    show_images=data['show_images'],
                    order=data['order']
                )

        except FileNotFoundError:
            pass
        except Exception as e:
            print(f"Error reading variant CSV: {e}")

        return result
