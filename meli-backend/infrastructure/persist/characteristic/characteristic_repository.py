"""Repositorio CSV para Characteristic"""

import csv
import os
import json
from typing import List, Union
from domain.characteristic.entity.characteristic import (
    SimpleCharacteristic,
    RangeCharacteristic,
    HighlightCharacteristic,
    CategoryCharacteristic, CharacteristicType
)


class CharacteristicRepository:
    """Repositorio que lee características desde CSV"""

    def __init__(self):
        current_dir = os.path.dirname(__file__)
        self.csv_path = os.path.join(current_dir, "data", "characteristic.csv")

    def get_by_product_id(self, product_id: str) -> List[Union[RangeCharacteristic, HighlightCharacteristic, CategoryCharacteristic]]:
        """Obtiene todas las características de un producto"""
        characteristics = []
        try:
            with open(self.csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['product_id'] == product_id:
                        char_type = row['type']

                        if char_type == 'range':
                            char = RangeCharacteristic(
                                type=CharacteristicType.RANGE,
                                name=row['name'],
                                value=row['value'],
                                current=float(row['current']),
                                min=float(row['min']),
                                max=float(row['max']),
                                min_label=row['min_label'],
                                max_label=row['max_label'],
                                icon=row['icon'] if row['icon'] else None,
                                segments=int(row['segments']) if row['segments'] else 5  # Default: 5
                            )
                            characteristics.append(char)

                        elif char_type == 'highlight':
                            char = HighlightCharacteristic(
                                type=CharacteristicType.HIGHLIGHT,
                                name=row['name'],
                                value=row['value'],
                                icon=row['icon']
                            )
                            characteristics.append(char)

                        elif char_type == 'category':
                            # Parse JSON para características
                            char_list = json.loads(row['characteristics_json'])
                            simple_chars = [
                                SimpleCharacteristic(name=c['name'], value=c['value'])
                                for c in char_list
                            ]

                            char = CategoryCharacteristic(
                                type=CharacteristicType.CATEGORY,
                                category_name=row['category_name'],
                                characteristics=simple_chars
                            )
                            characteristics.append(char)

        except FileNotFoundError:
            pass
        except Exception as e:
            print(f"Error reading characteristic CSV: {e}")

        return characteristics
