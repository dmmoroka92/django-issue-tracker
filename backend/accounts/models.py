from typing import ClassVar

from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import CustomUserManager


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        MANAGER = "MANAGER", "Manager"
        USER = "USER", "Regular User"

    username = None  # type: ignore[assignment]

    email = models.EmailField(unique=True)

    role = models.CharField(
        max_length=10,
        choices=Role.choices,
        default=Role.USER,
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects: ClassVar[CustomUserManager] = CustomUserManager()  # type: ignore[assignment]
