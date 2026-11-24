import re

from django.core.exceptions import ValidationError


class PasswordComplexityValidator:
    def validate(self, password: str, user=None) -> None:
        if not re.search(r"[a-z]", password):
            raise ValidationError(
                "Password must contain at least one lowercase letter",
                code="password_no_lowercase",
            )

        if not re.search(r"[A-Z]", password):
            raise ValidationError(
                "Password must contain at least one uppercase letter.",
                code="password_no_uppercase",
            )

        if not re.search(r"[^a-zA-Z0-9]", password):
            raise ValidationError(
                "Password must contain at least one special character.",
                code="password_no_special",
            )

    def get_help_text(self):
        return (
            "Password must contain uppercase and lowercase letters "
            "and at least one special character."
        )


class MaximumPasswordLengthValidator:
    def __init__(self, max_length: int = 128):
        self.max_length = max_length

    def validate(self, password: str, user=None) -> None:
        if len(password) > self.max_length:
            raise ValidationError(
                f"Password must not exceed {self.max_length} characters.",
                code="password_too_long",
            )

    def get_help_text(self) -> str:
        return f"Password must not exceed {self.max_length} characters."
