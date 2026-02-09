# Archivos Estáticos

Esta carpeta contiene archivos estáticos servidos por el backend.

## Estructura

```
static/
├── images/          # Imágenes (productos, logos, etc.)
└── README.md        # Este archivo
```

## Uso

Los archivos en esta carpeta son accesibles vía HTTP en la ruta `/static/`.

### Ejemplos:

- Archivo: `static/images/logo.png`
- URL: `http://localhost:8001/static/images/logo.png`

- Archivo: `static/images/products/producto-123.jpg`
- URL: `http://localhost:8001/static/images/products/producto-123.jpg`

## Agregar Nuevas Imágenes

1. Coloca tus imágenes en la carpeta `static/images/` (o subcarpetas)
2. Accede a ellas vía `/static/images/nombre-archivo.ext`

## Tipos de Archivos Soportados

- Imágenes: .jpg, .jpeg, .png, .gif, .webp, .svg
- Otros: cualquier archivo estático

## Notas

- En producción, considera usar un CDN o servicio de almacenamiento de objetos (S3, GCS, etc.)
- Esta carpeta está excluida de git (agregada a .gitignore) excepto el README
