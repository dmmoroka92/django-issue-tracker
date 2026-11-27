from django.db.models import Count, Q
from rest_framework.generics import (
    GenericAPIView,
    ListCreateAPIView,
    RetrieveUpdateAPIView,
)
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
        queryset = self.get_queryset()

        stats = queryset.aggregate(
            total=Count("id"),
            active_total=Count(
                "id",
                filter=Q(status=Project.Status.ACTIVE),
            ),
            archived_total=Count(
                "id",
                filter=Q(status=Project.Status.ARCHIVED),
            ),
        )

        return Response(
            {
                "data": {"projects": response.data, **stats},
            }
        )

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ProjectArchiveView(GenericAPIView):
    queryset = Project.objects.select_related("created_by")
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        project = self.get_object()
        project.archive()

        return Response(
            {
                "message": "Project archived successfully",
                "data": self.get_serializer(project).data,
            }
        )


class ProjectRestoreView(GenericAPIView):
    queryset = Project.objects.select_related("created_by")
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        project = self.get_object()
        project.restore()

        return Response(
            {
                "message": "Project restored successfully",
                "data": self.get_serializer(project).data,
            }
        )


class ProjectDetailView(RetrieveUpdateAPIView):
    queryset = Project.objects.select_related("created_by")
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
