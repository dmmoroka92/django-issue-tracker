from typing import TYPE_CHECKING, Any

from django.contrib.auth.base_user import BaseUserManager

if TYPE_CHECKING:
    from .models import User


class CustomUserManager(BaseUserManager["User"]):
    def create_user(
        self,
        email: str,
        password: str | None = None,
        **extra_fields: Any,
    ) -> User:
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(
        self,
        email: str,
        password: str | None = None,
        **extra_fields: Any,
    ) -> User:
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "ADMIN")

        if extra_fields["is_staff"] is not True:
            raise ValueError("Superuser must have is_staff=True")

        if extra_fields["is_superuser"] is not True:
            raise ValueError("Superuser must have is_superuser=True")

        if extra_fields["role"] != "ADMIN":
            raise ValueError("Superuser must have ADMIN role")

        return self.create_user(email, password, **extra_fields)
