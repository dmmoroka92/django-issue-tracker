
.DEFAULT_GOAL := help

DC := docker compose
BACKEND := $(DC) exec -T backend
FRONTEND := $(DC) exec -T frontend

.PHONY: help build up down restart ps logs \
        install run shell dbshell \
        test lint format format-check typecheck check \
        frontend-lint frontend-typecheck frontend-check \
        migrations migrate showmigrations superuser

# -----------------------------
# Help
# -----------------------------

help:
	@echo "Docker:"
	@echo "  make build              Build Docker images"
	@echo "  make up                 Start all containers"
	@echo "  make down               Stop all containers"
	@echo "  make restart            Restart containers"
	@echo "  make ps                 Show container status"
	@echo "  make logs               Follow container logs"
	@echo ""
	@echo "Backend:"
	@echo "  make install            Sync Python dependencies"
	@echo "  make run                Start backend container"
	@echo "  make shell              Open Django shell"
	@echo "  make dbshell            Open PostgreSQL shell"
	@echo "  make test               Run pytest"
	@echo "  make lint               Run Ruff linting"
	@echo "  make format             Format Python code"
	@echo "  make format-check       Check Python formatting"
	@echo "  make typecheck          Run mypy"
	@echo "  make check              Run backend checks and tests"
	@echo ""
	@echo "Frontend:"
	@echo "  make frontend-lint      Run ESLint"
	@echo "  make frontend-typecheck Run TypeScript checks"
	@echo "  make frontend-check     Run frontend checks"
	@echo ""
	@echo "Database:"
	@echo "  make migrations         Generate migrations"
	@echo "  make migrate            Apply migrations"
	@echo "  make showmigrations     List migrations"
	@echo "  make superuser          Create Django superuser"

# -----------------------------
# Docker
# -----------------------------

build:
	$(DC) build

up:
	$(DC) up -d

down:
	$(DC) down

restart:
	$(DC) restart

ps:
	$(DC) ps

logs:
	$(DC) logs -f

# -----------------------------
# Backend
# -----------------------------

install:
	$(BACKEND) uv sync --locked --dev

run:
	$(DC) up -d backend

shell:
	$(BACKEND) uv run --no-sync python manage.py shell

dbshell:
	$(DC) exec db psql -U $${POSTGRES_USER} -d $${POSTGRES_DB}

test:
	$(BACKEND) uv run --no-sync pytest

lint:
	$(BACKEND) uv run --no-sync ruff check .

lint-fix:
	$(BACKEND) uv run --no-sync ruff check --fix .

format:
	$(BACKEND) uv run --no-sync ruff format .

format-check:
	$(BACKEND) uv run --no-sync ruff format --check .

typecheck:
	$(BACKEND) uv run --no-sync mypy .

check: lint format-check typecheck test

# -----------------------------
# Frontend
# -----------------------------

frontend-lint:
	$(FRONTEND) npm run lint

frontend-typecheck:
	$(FRONTEND) npx tsc --noEmit

frontend-check: frontend-lint frontend-typecheck

# -----------------------------
# Database
# -----------------------------

migrations:
	$(BACKEND) uv run --no-sync python manage.py makemigrations

migrate:
	$(BACKEND) uv run --no-sync python manage.py migrate

showmigrations:
	$(BACKEND) uv run --no-sync python manage.py showmigrations

superuser:
	$(DC) exec backend uv run --no-sync python manage.py createsuperuser
