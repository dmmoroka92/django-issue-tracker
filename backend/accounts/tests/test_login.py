import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from accounts.models import User


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user():
    return User.objects.create_user(
        first_name="Test",
        last_name="User",
        email="testuser@example.com",
        password="SecurePassword123!",
        role=User.Role.USER,
    )


@pytest.mark.django_db
def test_login(api_client, user):
    response = api_client.post(
        reverse("login"),
        {
            "email": user.email,
            "password": "SecurePassword123!",
        },
        format="json",
    )

    assert response.status_code == status.HTTP_200_OK
    assert "access" in response.data["data"]

    refresh_cookie = response.cookies.get("refresh_token")

    assert refresh_cookie is not None
    assert refresh_cookie["httponly"] is True


@pytest.mark.django_db
def test_login_invalid_credentials(api_client, user):
    response = api_client.post(
        reverse("login"),
        {
            "email": user.email,
            "password": "InvalidPassword123!",
        },
        format="json",
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED

    assert "access" not in response.data
    assert "refresh" not in response.data
    assert "data" not in response.data

    # No refresh token cookie is issued
    assert "refresh_token" not in response.cookies
