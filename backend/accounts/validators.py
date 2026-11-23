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
