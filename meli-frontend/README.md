# MELI App - React + TypeScript + Vite + Atomic Design

Una aplicación moderna construida con React, TypeScript, Vite, Tailwind CSS y Shadcn/ui siguiendo los principios de Atomic Design.

## 🚀 Stack Tecnológico

- **React 18** - Biblioteca UI moderna
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Build tool ultrarrápido con HMR
- **Tailwind CSS** - Framework CSS utilitario
- **Shadcn/ui** - Sistema de componentes accesibles
- **React Router v6** - Navegación declarativa
- **Lucide React** - Biblioteca de íconos
- **ESLint + Prettier** - Calidad de código

## 📁 Arquitectura: Atomic Design

El proyecto está organizado siguiendo la metodología **Atomic Design**, que divide los componentes en 5 niveles jerárquicos:

```
src/
├── components/
│   ├── atoms/           # Componentes básicos (Button, Input, Card, Badge)
│   ├── molecules/       # Combinaciones simples (SearchBar, FormField, NavLink)
│   ├── organisms/       # Secciones complejas (Header, Footer, ProductCard)
│   └── templates/       # Estructuras de página (MainLayout, AuthLayout)
├── pages/               # Páginas con datos (HomePage, ProductsPage, AboutPage)
├── hooks/               # Custom hooks (useFetch, useLocalStorage, useDebounce)
├── services/            # Servicios de API (api.ts, products.service.ts)
├── types/               # Tipos TypeScript (common.ts, product.ts)
├── lib/                 # Utilidades (utils.ts con función cn())
└── styles/              # Estilos globales (index.css con Tailwind)
```

### Flujo de composición

```
Pages → Templates → Organisms → Molecules → Atoms
```

**Ejemplo:**
```
HomePage → MainLayout → Header → NavLink → Button + Icon
```

### Niveles de Atomic Design

1. **Atoms (Átomos)**: Componentes básicos más pequeños
   - Button, Input, Label, Badge, Card, Icon
   - No pueden dividirse más sin perder funcionalidad
   - Altamente reutilizables

2. **Molecules (Moléculas)**: Combinaciones simples de átomos
   - SearchBar (Input + Button)
   - FormField (Label + Input + Error)
   - NavLink (Icon + Link)

3. **Organisms (Organismos)**: Secciones complejas de UI
   - Header, Footer, ProductCard, HeroSection
   - Combinan moléculas y átomos

4. **Templates**: Estructuras de página sin datos
   - MainLayout, AuthLayout, DashboardLayout
   - Definen la disposición de organismos

5. **Pages (Páginas)**: Instancias específicas de templates
   - HomePage, AboutPage, ProductsPage, NotFoundPage
   - Templates con datos reales

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
```

## 🏃 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en http://localhost:3000

# Build
npm run build        # Compila para producción
npm run preview      # Preview del build de producción

# Linting y formateo
npm run lint         # Verifica código con ESLint
npm run lint:fix     # Corrige automáticamente errores de ESLint
npm run format       # Formatea código con Prettier
npm run format:check # Verifica formato con Prettier
```

## 🎨 Shadcn/ui

Este proyecto utiliza **Shadcn/ui** como sistema de componentes. Los componentes se instalan como código fuente (no como dependencia npm), lo que permite personalización total.

### Agregar componentes Shadcn

```bash
# Ver lista de componentes disponibles
npx shadcn-ui@latest add

# Agregar un componente específico
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add tabs

# Los componentes se instalan automáticamente en src/components/atoms/
```

### Componentes Shadcn incluidos

- ✅ Button - Botón con variantes (default, destructive, outline, etc.)
- ✅ Input - Campo de entrada de texto
- ✅ Label - Etiqueta para formularios
- ✅ Card - Tarjeta con subcomponentes (Header, Content, Footer, etc.)
- ✅ Badge - Etiqueta pequeña con variantes

## 🔧 Path Aliases

El proyecto está configurado con path aliases para imports limpios:

```typescript
import { Button } from '@/components/atoms/Button';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Header } from '@/components/organisms/Header';
import { MainLayout } from '@/components/templates/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { cn } from '@/lib/utils';
import { api } from '@/services/api';
import { Product } from '@/types/product';
```

## 📦 Características

### Componentes

- **Sistema de diseño consistente** con Shadcn/ui
- **Componentes reutilizables** organizados por nivel de complejidad
- **Variantes de componentes** con Class Variance Authority (CVA)
- **Función `cn()`** para merge inteligente de clases Tailwind

### Estilos

- **Tailwind CSS** con configuración personalizada
- **CSS Variables** para temas (light/dark)
- **Animaciones** con tailwindcss-animate
- **Fuente Inter** de Google Fonts

### Funcionalidades

- **Routing** con React Router v6
- **Búsqueda de productos** con debounce
- **Filtrado por categorías**
- **Fetch de datos** con custom hooks
- **LocalStorage** para persistencia de datos
- **Responsive design** mobile-first

### Herramientas de desarrollo

- **TypeScript strict mode** para máxima seguridad de tipos
- **ESLint** configurado para React + TypeScript
- **Prettier** para formateo consistente
- **Hot Module Replacement (HMR)** con Vite

## 🌐 API

El proyecto consume la API de [Fake Store API](https://fakestoreapi.com) para datos de ejemplo.

Puedes cambiar la URL de la API en el archivo `.env`:

```env
VITE_API_URL=https://fakestoreapi.com
```

## 📝 Estructura de un Componente Típico

### Atom (Componente básico de Shadcn)

```tsx
import { Button } from '@/components/atoms/Button';

<Button variant="default">Click me</Button>
```

### Molecule (Combina Atoms)

```tsx
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';

<SearchBar onSearch={handleSearch} />
```

### Organism (Combina Molecules y Atoms)

```tsx
import { SearchBar } from '@/components/molecules/SearchBar';
import { Card } from '@/components/atoms/Card';

<Header />
```

### Template (Define estructura)

```tsx
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';

<MainLayout />
```

### Page (Template con datos)

```tsx
import { MainLayout } from '@/components/templates/MainLayout';
import { HeroSection } from '@/components/organisms/HeroSection';

<HomePage />
```

## 🎯 Ventajas de Atomic Design

1. **Organización clara**: Componentes organizados por nivel de complejidad
2. **Reutilización máxima**: Los Atoms son altamente reutilizables
3. **Escalabilidad**: Fácil agregar nuevos componentes
4. **Design System**: Sistema de diseño consistente
5. **Mantenibilidad**: Fácil encontrar y modificar componentes
6. **Composición**: Componentes complejos se construyen componiendo simples
7. **Consistency**: Todos los componentes usan el mismo sistema de diseño

## 📚 Recursos

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/)
- [Lucide Icons](https://lucide.dev/)
- [Atomic Design](https://atomicdesign.bradfrost.com/)

## 📄 Licencia

MIT

---

**🤖 Construido con Claude Code**
