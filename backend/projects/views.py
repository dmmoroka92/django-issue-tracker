from django.db.models import Count, Q
from rest_framework import status
from rest_framework.generics import (
    GenericAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from common.pagination import ApiPageNumberPagination

from .models import Project
from .serializers import ProjectSerializer


class ProjectListCreateView(ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = ApiPageNumberPagination

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
                "data": {
                    "projects": response.data["results"],
                    "pagination": response.data["pagination"],
                    **stats,
                },
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


class ProjectDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.select_related("created_by")
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)

        return Response(
            {
                "data": response.data,
            }
        )

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)

        return Response(
            {
                "message": "Project updated successfully",
                "data": response.data,
            }
        )

    def destroy(self, request, *args, **kwargs):
        project = self.get_object()
        self.perform_destroy(project)

        return Response(
            {"message": "Project deleted successfully"},
            status=status.HTTP_200_OK,
        )
