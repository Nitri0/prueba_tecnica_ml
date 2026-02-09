# Dockerfile para meli-frontend (React + Vite)

# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Argumentos de build para variables de entorno
ARG VITE_PRODUCT_SERVICE=api
ARG VITE_API_URL=http://localhost:8001

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Configurar variables de entorno para el build
ENV VITE_PRODUCT_SERVICE=$VITE_PRODUCT_SERVICE
ENV VITE_API_URL=$VITE_API_URL

# Build de producción
RUN npm run build

# Etapa 2: Production con nginx
FROM nginx:alpine

# Copiar build desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Comando para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]
