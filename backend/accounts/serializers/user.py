from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers

from accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "full_name",
            "email",
            "role",
        ]
        read_only_fields = ["id"]

        extra_kwargs = {
            "first_name": {
                "required": True,
                "allow_blank": False,
            },
            "last_name": {
                "required": True,
                "allow_blank": False,
            },
        }

    def validate(self, attrs):
        user = User(**attrs)

        try:
            user.full_clean()
        except DjangoValidationError as exc:
            raise serializers.ValidationError(exc.message_dict) from exc

        return attrs

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
