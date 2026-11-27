from django.urls import path

from .views import ProjectArchiveView, ProjectListCreateView, ProjectRestoreView

urlpatterns = [
    path("projects/", ProjectListCreateView.as_view(), name="projects"),
    path(
        "projects/<int:pk>/archive/",
        ProjectArchiveView.as_view(),
        name="project-archive",
    ),
    path(
        "projects/<int:pk>/restore/",
        ProjectRestoreView.as_view(),
        name="project-restore",
    ),
]
