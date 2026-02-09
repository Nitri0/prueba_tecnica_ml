"""Servicio para características de productos"""

from typing import List
from application.dto.detail_product_output_dto import (
    CharacteristicDto,
    RangeCharacteristicDto,
    HighlightCharacteristicDto,
    CategoryCharacteristicDto,
    SimpleCharacteristicDto
)
from domain.characteristic.entity.characteristic import (
    RangeCharacteristic,
    HighlightCharacteristic,
    CategoryCharacteristic
)
from infrastructure.persist.characteristic.characteristic_repository import CharacteristicRepository


class CharacteristicService:
    """Servicio para obtener características de productos"""

    def __init__(self, repository: CharacteristicRepository = None):
        self.repository = repository or CharacteristicRepository()
        self.DEFAULT_SEGMENT = 5

    def get_characteristics_by_product_id(self, product_id: str) -> List[CharacteristicDto]:
        """Obtiene características desde CSV"""
        characteristics = self.repository.get_by_product_id(product_id)

        result = []
        for char in characteristics:
            if isinstance(char, RangeCharacteristic):
                result.append(RangeCharacteristicDto(
                    type=char.type.value,
                    name=char.name,
                    value=char.value,
                    current=char.current,
                    min=char.min,
                    max=char.max,
                    min_label=char.min_label,
                    max_label=char.max_label,
                    icon=char.icon,
                    segments=char.segments or self.DEFAULT_SEGMENT
                ))
            elif isinstance(char, HighlightCharacteristic):
                result.append(HighlightCharacteristicDto(
                    type=char.type.value,
                    name=char.name,
                    value=char.value,
                    icon=char.icon
                ))
            elif isinstance(char, CategoryCharacteristic):
                simple_chars = [
                    SimpleCharacteristicDto(name=sc.name, value=sc.value)
                    for sc in char.characteristics
                ]
                result.append(CategoryCharacteristicDto(
                    type=char.type.value,
                    category_name=char.category_name,
                    characteristics=simple_chars
                ))

        return result
