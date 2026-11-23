FROM ghcr.io/astral-sh/uv:python3.14-bookworm-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_LINK_MODE=copy

COPY pyproject.toml uv.lock ./

RUN uv sync --locked --dev --no-install-project

COPY . .

EXPOSE 8000

CMD ["uv", "run", "--no-sync", "python", "manage.py", "runserver", "0.0.0.0:8000"]