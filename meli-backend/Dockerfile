# Dockerfile para meli-backend (FastAPI)
FROM python:3.9-slim

# Variables de entorno
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PYTHONPATH=/app

# Directorio de trabajo
WORKDIR /app

# Copiar requirements
COPY requirements.txt .

# Instalar dependencias
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 8001

# Comando para ejecutar la aplicación
CMD ["uvicorn", "application.entrypoint.main:app", "--host", "0.0.0.0", "--port", "8001"]
