"""Utilidades para serialización de DTOs a JSON"""

from dataclasses import asdict, is_dataclass
from enum import Enum
from typing import Any, Dict, List


def to_camel_case(snake_str: str) -> str:
    """Convierte snake_case a camelCase"""
    components = snake_str.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])


def serialize_to_dict(obj: Any) -> Any:
    """
    Serializa un objeto (dataclass, enum, dict, list) a un diccionario
    con nombres en camelCase para compatibilidad con TypeScript.

    Args:
        obj: Objeto a serializar (dataclass, enum, dict, list, primitivo)

    Returns:
        Objeto serializado compatible con JSON
    """
    # Enums
    if isinstance(obj, Enum):
        return obj.value

    # Dataclasses
    if is_dataclass(obj):
        result = {}
        for key, value in asdict(obj).items():
            camel_key = to_camel_case(key)
            result[camel_key] = serialize_to_dict(value)
        return result

    # Diccionarios
    if isinstance(obj, dict):
        result = {}
        for key, value in obj.items():
            # Si la key es string, convertir a camelCase
            if isinstance(key, str):
                camel_key = to_camel_case(key)
            else:
                # Si la key es int (como en rating_distribution), dejar como está
                camel_key = key
            result[camel_key] = serialize_to_dict(value)
        return result

    # Listas
    if isinstance(obj, (list, tuple)):
        return [serialize_to_dict(item) for item in obj]

    # Primitivos
    return obj
