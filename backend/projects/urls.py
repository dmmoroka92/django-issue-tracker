from django.urls import path

from .views import ProjectArchiveView, ProjectListCreateView

urlpatterns = [
    path("projects/", ProjectListCreateView.as_view(), name="projects"),
    path(
        "projects/<int:pk>/archive/",
        ProjectArchiveView.as_view(),
        name="project-archive",
    ),
]
