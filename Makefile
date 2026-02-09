.PHONY: help up down build logs clean test

# Colores para output
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

help: ## Muestra este mensaje de ayuda
	@echo ''
	@echo 'Uso:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  ${YELLOW}%-15s${GREEN}%s${RESET}\n", $$1, $$2}' $(MAKEFILE_LIST)

up: ## Levanta los servicios
	@echo "${GREEN}Levantando servicios...${RESET}"
	docker-compose up -d
	@echo "${GREEN}✓ Servicios corriendo${RESET}"
	@echo "${YELLOW}Frontend: http://localhost:3000${RESET}"
	@echo "${YELLOW}Backend:  http://localhost:8001${RESET}"
	@echo "${YELLOW}API Docs: http://localhost:8001/docs${RESET}"

build: ## Construye las imágenes
	@echo "${GREEN}Construyendo imágenes...${RESET}"
	docker-compose build

rebuild: ## Reconstruye y levanta los servicios
	@echo "${GREEN}Reconstruyendo servicios...${RESET}"
	docker-compose up --build -d
	@echo "${GREEN}✓ Servicios reconstruidos y corriendo${RESET}"

down: ## Detiene los servicios
	@echo "${YELLOW}Deteniendo servicios...${RESET}"
	docker-compose down
	@echo "${GREEN}✓ Servicios detenidos${RESET}"

logs: ## Muestra logs en tiempo real
	docker-compose logs -f

logs-backend: ## Muestra logs del backend
	docker-compose logs -f backend

logs-frontend: ## Muestra logs del frontend
	docker-compose logs -f frontend

ps: ## Muestra el estado de los contenedores
	docker-compose ps

clean: ## Limpia contenedores, imágenes y volúmenes
	@echo "${YELLOW}Limpiando todo...${RESET}"
	docker-compose down -v --rmi all
	@echo "${GREEN}✓ Limpieza completa${RESET}"

restart: down up ## Reinicia los servicios

test-backend: ## Ejecuta tests del backend
	@echo "${GREEN}Ejecutando tests del backend...${RESET}"
	docker exec meli-backend pytest tests/ -v

coverage-backend: ## Ejecuta coverage del backend
	@echo "${GREEN}Ejecutando coverage del backend...${RESET}"
	docker exec meli-backend pytest tests/ --cov=application --cov=domain --cov=infrastructure --cov-report=term-missing

shell-backend: ## Abre shell en el contenedor del backend
	docker exec -it meli-backend sh

shell-frontend: ## Abre shell en el contenedor del frontend
	docker exec -it meli-frontend sh

health: ## Verifica el health de los servicios
	@echo "${GREEN}Verificando health checks...${RESET}"
	@echo -n "${YELLOW}Backend: ${RESET}"
	@curl -s http://localhost:8001/health | grep -q "healthy" && echo "${GREEN}✓ OK${RESET}" || echo "${RED}✗ FAIL${RESET}"
	@echo -n "${YELLOW}Frontend: ${RESET}"
	@curl -s http://localhost:3000/health | grep -q "healthy" && echo "${GREEN}✓ OK${RESET}" || echo "${RED}✗ FAIL${RESET}"

open: ## Abre la aplicación en el navegador
	@echo "${GREEN}Abriendo aplicación...${RESET}"
	@open http://localhost:3000 || xdg-open http://localhost:3000 || echo "Abre manualmente: http://localhost:3000"

.DEFAULT_GOAL := help
