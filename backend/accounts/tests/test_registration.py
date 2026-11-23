import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from accounts.models import User


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def valid_user_payload():
    return {
        "email": "testuser@example.com",
        "first_name": "Test",
        "last_name": "User",
        "password": "SecurePassword123!",
    }


@pytest.mark.django_db
def test_user_registration(api_client, valid_user_payload):
    response = api_client.post(
        reverse("signup"),
        valid_user_payload,
        format="json",
    )

    assert response.status_code == status.HTTP_201_CREATED

    user = User.objects.get(email="testuser@example.com")

    assert user.role == User.Role.USER
    assert user.check_password("SecurePassword123!")
    assert "password" not in response.data


@pytest.mark.django_db
@pytest.mark.parametrize(
    ("field", "value"),
    [
        ("first_name", ""),
        ("last_name", ""),
        ("email", "invalid-email"),
        ("password", "short"),
        ("password", "lowercase123!"),
        ("password", "UPPERCASE123!"),
        ("password", "NoSpecial123"),
    ],
)
def test_registration_with_invalid_data(api_client, field, value, valid_user_payload):
    payload = valid_user_payload.copy()
    payload[field] = value

    response = api_client.post(
        reverse("signup"),
        payload,
        format="json",
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert field in response.data
    assert User.objects.count() == 0


@pytest.mark.django_db
def test_registration_email_taken(api_client, valid_user_payload):
    user = User.objects.create_user(**valid_user_payload)

    payload = {
        "email": user.email,
        "first_name": "Bob",
        "last_name": "User",
        "password": "SecurePassword123!",
    }

    response = api_client.post(
        reverse("signup"),
        payload,
        format="json",
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "already exists" in str(response.data["email"][0]).lower()
    assert User.objects.count() == 1
