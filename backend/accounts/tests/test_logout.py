from datetime import timedelta

import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.token_blacklist.models import (
    BlacklistedToken,
)
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import User


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def refresh_token(user):
    return RefreshToken.for_user(user)


@pytest.fixture
def user():
    return User.objects.create_user(
        first_name="Test",
        last_name="User",
        email="test@example.com",
        password="Qwerty123!",
        role=User.Role.USER,
    )


@pytest.mark.django_db
def test_logout_success(api_client, refresh_token):
    api_client.cookies["refresh_token"] = str(refresh_token)

    response = api_client.post(reverse("logout"))

    assert response.status_code == status.HTTP_200_OK
    assert response.data["message"] == "Logged out successfully"

    assert BlacklistedToken.objects.filter(token__jti=refresh_token["jti"]).exists()

    cookie = response.cookies["refresh_token"]

    assert cookie.value == ""
    assert cookie["max-age"] == 0
    assert cookie["path"] == "/api/auth/"


@pytest.mark.django_db
def test_logout_without_refresh_token(api_client):
    response = api_client.post(reverse("logout"))

    assert response.status_code == status.HTTP_200_OK
    assert response.cookies["refresh_token"]["max-age"] == 0
    assert BlacklistedToken.objects.count() == 0


@pytest.mark.django_db
def test_logout_with_invalid_refresh_token(api_client):
    api_client.cookies["refresh_token"] = "invalid-token"

    response = api_client.post(reverse("logout"))

    assert response.status_code == status.HTTP_200_OK
    assert response.cookies["refresh_token"]["max-age"] == 0
    assert BlacklistedToken.objects.count() == 0


@pytest.mark.django_db
def test_logout_with_expired_refresh_token(
    api_client,
    refresh_token,
):
    refresh_token.set_exp(lifetime=timedelta(seconds=-60))

    api_client.cookies["refresh_token"] = str(refresh_token)

    response = api_client.post(reverse("logout"))

    assert response.status_code == status.HTTP_200_OK
    assert response.cookies["refresh_token"]["max-age"] == 0
    assert BlacklistedToken.objects.count() == 0


@pytest.mark.django_db
def test_logout_with_blacklisted_refresh_token(
    api_client,
    refresh_token,
):
    refresh_token.blacklist()

    api_client.cookies["refresh_token"] = str(refresh_token)

    response = api_client.post(reverse("logout"))

    assert response.status_code == status.HTTP_200_OK
    assert response.cookies["refresh_token"]["max-age"] == 0
    assert BlacklistedToken.objects.count() == 1


@pytest.mark.django_db
def test_logout_with_expired_access_token(
    api_client,
    refresh_token,
):
    access_token = refresh_token.access_token
    access_token.set_exp(lifetime=timedelta(seconds=-60))

    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

    api_client.cookies["refresh_token"] = str(refresh_token)

    response = api_client.post(reverse("logout"))

    assert response.status_code == status.HTTP_200_OK

    assert BlacklistedToken.objects.filter(token__jti=refresh_token["jti"]).exists()


@pytest.mark.django_db
def test_logout_without_csrf_token(refresh_token):
    client = APIClient(enforce_csrf_checks=True)

    client.cookies["refresh_token"] = str(refresh_token)

    response = client.post(reverse("logout"))

    assert response.status_code == status.HTTP_403_FORBIDDEN

    assert not BlacklistedToken.objects.filter(token__jti=refresh_token["jti"]).exists()
