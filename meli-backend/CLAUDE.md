# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Este es un backend para una aplicación tipo Mercado Libre, estructurado siguiendo principios de Clean Architecture / Hexagonal Architecture con una clara separación entre capas.

## Architecture

La arquitectura sigue un patrón de tres capas principales:

### Domain Layer (`domain/`)
Contiene las entidades de negocio y lógica de dominio pura, sin dependencias externas:
- `payment/` - Entidades y excepciones relacionadas con pagos
- `product/` - Entidades de productos
- `rating/` - Sistema de calificaciones
- `review/` - Reseñas de productos
- `seller/` - Información de vendedores
- `stock/` - Gestión de inventario

### Application Layer (`application/`)
Contiene los casos de uso y la lógica de aplicación:
- `dto/` - Data Transfer Objects para entrada/salida de servicios
- `service/` - Servicios de aplicación que orquestan casos de uso
- `entrypoint/` - Puntos de entrada de la aplicación (controllers, CLI, etc.)

### Infrastructure Layer (`infrastructure/`)
Contiene las implementaciones técnicas y adaptadores:
- `persist/` - Adaptadores de persistencia y repositorios

## Python Environment

- **Python Version**: 3.9.x (el proyecto usa Python 3.9.6+ según el virtualenv)
- **Virtual Environment**: `.venv/` en la raíz del proyecto

## Type Hints

El proyecto usa type hints de Python 3.10+ con el operador `|` para Union types:
```python
property: GenericProperty | PrincipalProperty
```

Si necesitas compatibilidad con Python 3.9, usa `Union` de `typing`:
```python
from typing import Union
property: Union[GenericProperty, PrincipalProperty]
```

## Dataclasses

Los DTOs y entidades usan `@dataclass` de Python. Ejemplo del patrón usado:
```python
from dataclasses import dataclass

@dataclass
class DetailProductOutputDto:
    product_images: [str]
    title: str
    description: str
    # ...
```

## Service Pattern

Los servicios siguen este patrón:
```python
class DetailProductService:
    def __init__(self):
        pass

    def get_detail_product_by_id(self, id: str) -> DetailProductOutputDto:
        ...
```

## Directory Structure Conventions

- Las entidades de dominio van en `domain/<aggregate>/`
- Los DTOs van en `application/dto/`
- Los servicios de aplicación van en `application/service/`
- Los entrypoints (controllers, handlers) van en `application/entrypoint/`
- Los repositorios y adaptadores van en `infrastructure/persist/`

## Development Commands

### Activar el entorno virtual
```bash
source .venv/bin/activate  # Unix/macOS
# o
.venv\Scripts\activate     # Windows
```

### Instalar dependencias
```bash
pip install -r requirements.txt  # Si existe
```
