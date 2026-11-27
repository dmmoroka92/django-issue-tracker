from rest_framework import serializers

from accounts.serializers.user import UserSerializer

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Project

        fields = [
            "id",
            "name",
            "description",
            "status",
            "created_by",
            "created_at",
            "updated_at",
            "archived_at",
        ]

        read_only_fields = [
            "id",
            "status",
            "created_by",
            "created_at",
            "updated_at",
            "archived_at",
        ]
