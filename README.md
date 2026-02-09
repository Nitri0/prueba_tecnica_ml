# 🛒 Meli Test - Aplicación Fullstack

Aplicación tipo Mercado Libre desarrollada con React + TypeScript (frontend) y FastAPI + Python (backend).

## 🚀 Inicio Rápido con Docker

La forma más sencilla de ejecutar la aplicación completa es usando Docker Compose:

### Opción 1: Docker Compose (Recomendado)

```bash
# Desde la raíz del proyecto
docker compose up --build 
```

Luego abre tu navegador en:
- **Frontend**: http://localhost:3000/producto/MLC137702355
- **Backend API**: http://localhost:8001/docs

### Opción 2: Makefile (Más fácil)

```bash
# Ver comandos disponibles
make help

# Levantar servicios
make rebuild

# Ver logs
make logs

# Detener servicios
make down
```

### Detener los servicios

```bash
docker compose down
```

## 🏗️ Arquitectura

```
┌─────────────────────────────────────┐
│         Frontend (React)             │
│    Port: 3000 (Nginx + Vite)        │
│  - Atomic Design                     │
│  - TypeScript                        │
│  - Tailwind CSS                      │
└────────────┬────────────────────────┘
             │ HTTP/JSON
             │
┌────────────▼────────────────────────┐
│       Backend (FastAPI)              │
│         Port: 8001                   │
│  - Domain Driven Design              │
│  - Repository Pattern (CSV)          │
│  - Dependency Injection              │
└─────────────────────────────────────┘
```

## 🛠️ Stack Tecnológico

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- React Router v7
- Radix UI components
- Vitest + Testing Library

### Backend
- Python 3.9
- FastAPI
- Clean Architecture / DDD
- CSV para persistencia
- Pytest (90% coverage)

## 🧪 Testing

### Backend
```bash
make test-backend
make coverage-backend
```

### Frontend
```bash
# Local (requiere npm install)
cd meli-frontend
npm test
npm run test:coverage
```

## 📊 Coverage Actual

- **Backend**: 90% ✅
- **Frontend**: 80% ✅

## 🗂️ Estructura del Proyecto

```
meli-test/
├── docker-compose.yml          # Orquestación de servicios
├── Makefile                    # Comandos rápidos
├── BRIEF.md                    # Documentación y analisis de problemas
├── CLAUDE.md                   # Especificación para ClaudeCli
│
├── meli-backend/               # Backend (FastAPI)
│   ├── Dockerfile
│   ├── application/            # Capa de aplicación
│   ├── domain/                 # Capa de dominio
│   ├── infrastructure/         # Capa de infraestructura
│   │   └── persist/            # Repositorios CSV
│   └── tests/                  # Tests (155 tests, 90% coverage)
│
└── meli-frontend/              # Frontend (React)
    ├── Dockerfile
    ├── nginx.conf
    ├── src/
    │   ├── components/         # Atomic Design
    │   │   ├── atoms/
    │   │   ├── molecules/
    │   │   ├── organisms/
    │   │   └── templates/
    │   ├── pages/
    │   ├── services/
    │   ├── hooks/
    │   └── types/
    └── tests/
```

## 🎯 Características

### Frontend
- ✅ Diseño responsive
- ✅ Atomic Design
- ✅ TypeScript strict mode
- ✅ Routing con React Router
- ✅ Componentes reutilizables
- ✅ Testing con Vitest
- ✅ 80% test coverage

### Backend
- ✅ DDD
- ✅ Repository Pattern
- ✅ Dependency Injection
- ✅ 90% test coverage
- ✅ OpenAPI/Swagger docs
- ✅ Persistencia en CSV
- ✅ CORS habilitado

## 🔧 Desarrollo Local (sin Docker)

### Backend
```bash
cd meli-backend
python -m venv .venv
source .venv/bin/activate  # En Windows: .venv\Scripts\activate
pip install -r requirements.txt
python application/entrypoint/main.py
```

### Frontend
```bash
cd meli-frontend
npm install
npm run dev
```

## Test

### Backend

```bash
# Sin Docker
cd meli-backend
python -m venv .venv
source .venv/bin/activate  # En Windows: .venv\Scripts\activate
pytest
```

```bash
# Con docker
docker compose up --build -d

make test-backend  

# Con converage
make coverage-backend
```


### Frontend
```bash
cd meli-frontend
npm install
npm run test
```

## 📝 Variables de Entorno

### Frontend
```env
VITE_PRODUCT_SERVICE=api        # 'mock' o 'api'
VITE_API_URL=http://localhost:8001
```

### Backend
No requiere variables de entorno por defecto.

## 📄 Licencia

Este proyecto es parte de un desafío técnico.
