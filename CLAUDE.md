# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Descripción del Proyecto

Este es un proyecto fullstack tipo Mercado Libre con:
- **Frontend**: React + TypeScript + Vite, estructura atómica de componentes
- **Backend**: FastAPI + Python, arquitectura hexagonal/clean architecture

El proyecto está organizado en un monorepo con dos carpetas principales: `meli-frontend` y `meli-backend`.

## Arquitectura Backend (meli-backend/)

### Estructura de Clean Architecture

El backend sigue arquitectura hexagonal con separación estricta de responsabilidades:

#### Domain Layer (`domain/`)
- Entidades de negocio y lógica pura sin dependencias externas
- Agregados: `payment`, `product_info`, `seller_information`, `category`, `image`, `price`, `property`, `stock`, `additional_details`
- Cada agregado tiene: `entity/`, `interfaces/`, y opcionalmente `mapper/`
- Las interfaces definen contratos de repositorio (ej: `IPaymentRepository`)

#### Application Layer (`application/`)
- `dto/`: Data Transfer Objects para input/output
- `service/`: Servicios de aplicación que orquestan casos de uso
  - `detail_product_orchestrator_service.py`: orquestador principal que coordina múltiples servicios
  - Servicios específicos por agregado (ej: `payment_service.py`, `category_service.py`)
- `entrypoint/main.py`: Factory de FastAPI y configuración de la aplicación

#### Infrastructure Layer (`infrastructure/`)
- `persist/`: Repositorios concretos y mappers para cada agregado
- `api/FastAPI/`: Routers y endpoints HTTP
- `container/dependency_container.py`: Contenedor de inyección de dependencias

### Python Environment

- Python 3.9.x
- Virtual environment: `.venv/` en `meli-backend/`
- Activar: `source meli-backend/.venv/bin/activate`
- Dependencias: `fastapi`, `uvicorn`, `pydantic`, `python-multipart`

### Comandos Backend

```bash
# Activar entorno virtual
cd meli-backend
source .venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor de desarrollo
python application/entrypoint/main.py
# O alternativamente:
uvicorn application.entrypoint.main:app --reload --port 8001

# Ejecutar tests
pytest

# Ejecutar tests con cobertura
pytest --cov=application --cov=domain --cov=infrastructure

# Ejecutar un test específico
pytest tests/application/service/test_detail_product_orchestrator_service.py
```

El servidor corre en `http://localhost:8001` por defecto. Documentación auto-generada en `/docs` y `/redoc`.

## Arquitectura Frontend (meli-frontend/)

### Estructura de Componentes Atómicos

El frontend sigue metodología Atomic Design:

- **Atoms** (`components/atoms/`): Componentes básicos reutilizables (Button, Badge, Input, Label, etc.)
- **Molecules** (`components/molecules/`): Combinaciones simples de atoms (SearchBar, ProductImage, StarRating, etc.)
- **Organisms** (`components/organisms/`): Componentes complejos con lógica de negocio (ProductCard, Header, ProductReviews, etc.)
- **Templates** (`components/templates/`): Layouts de página (ProductDetailLayout)
- **Pages** (`pages/`): Páginas completas que combinan templates y data (ProductDetailPage)

### Organización Adicional

- **types/**: Definiciones TypeScript compartidas (`product.ts`, etc.)
- **services/**: Lógica de acceso a APIs y datos externos
- **hooks/**: Custom React hooks reutilizables
- **lib/**: Utilidades y helpers (ej: `cn()` para clases CSS)
- **utils/**: Funciones auxiliares (ej: `variantUrl.ts`)
- **data/**: Datos mock o estáticos

### Path Aliases

El proyecto usa aliases configurados en `vite.config.ts`:
- `@/` → `src/`
- `@/components/atoms` → `src/components/atoms/`
- `@/components/molecules` → `src/components/molecules/`
- `@/components/organisms` → `src/components/organisms/`
- `@/components/templates` → `src/components/templates/`
- `@/pages` → `src/pages/`
- `@/hooks`, `@/lib`, `@/services`, `@/types`, `@/styles`

### Comandos Frontend

```bash
cd meli-frontend

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Tests
npm test

# Tests con UI
npm run test:ui

# Tests con coverage
npm run test:coverage

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format
npm run format:check
```

El servidor de desarrollo corre en `http://localhost:3000`.

### Stack de UI

- **Styling**: Tailwind CSS con `tailwindcss-animate`
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives (Dialog, Select, Tabs, Tooltip, etc.)
- **Routing**: React Router DOM v7
- **Testing**: Vitest + Testing Library

## Integración Frontend-Backend

- El backend expone API REST en puerto 8001
- CORS configurado para aceptar cualquier origen (en dev)
- El frontend consume endpoints como `/api/products/{id}` (definido en `infrastructure/api/FastAPI/detail_product.py`)

## Patrones y Convenciones

### Backend
- Usar `@dataclass` para DTOs y entidades
- Los servicios reciben dependencias por constructor
- Los repositorios implementan interfaces del dominio
- El orquestador coordina múltiples servicios para casos de uso complejos

### Frontend
- Componentes funcionales con TypeScript
- Props tipados estrictamente
- Uso de `clsx` y `tailwind-merge` para estilos condicionales
- Tests ubicados junto a componentes en carpetas `__tests__/`

## Testing

### Backend
- Framework: pytest
- Ubicación: `meli-backend/tests/`
- Estructura espejo de `application/`, `domain/`, `infrastructure/`
- Markers disponibles: `@pytest.mark.unit`, `@pytest.mark.integration`, `@pytest.mark.slow`

### Frontend
- Framework: Vitest + @testing-library/react
- Ubicación: tests colocados en `__tests__/` dentro de cada carpeta de componentes
- Configuración: jsdom como entorno de pruebas
- Coverage: disponible con vitest

## Notas Importantes

- El proyecto actualmente usa datos mock en el frontend (`mockProduct` en ProductDetailPage)
- La rama principal es `main`, no `master` (aunque existe una rama `master`)
- El backend ya tiene un CLAUDE.md específico en `meli-backend/CLAUDE.md` con detalles adicionales sobre arquitectura limpia
