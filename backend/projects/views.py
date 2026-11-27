from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Project
from .serializers import ProjectSerializer


class ProjectListCreateView(ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        return Response(
            {
                "data": {
                    "projects": response.data,
                    "total": self.get_queryset().count(),
                },
            }
        )

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
