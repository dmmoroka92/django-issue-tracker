from django.db import models
from django.utils import timezone

from accounts.models import User

from .querysets import ProjectQuerySet


class Project(models.Model):
    class Status(models.TextChoices):
        ACTIVE = "active", "Active"
        ARCHIVED = "archived", "Archived"

    name = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.ACTIVE
    )
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="projects"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    archived_at = models.DateTimeField(null=True, blank=True, default=None)

    objects = ProjectQuerySet.as_manager()

    def archive(self) -> None:
        if self.status == self.Status.ARCHIVED:
            return

        self.status = self.Status.ARCHIVED
        self.archived_at = timezone.now()
        self.save()

    def restore(self) -> None:
        if self.status == self.Status.ACTIVE:
            return

        self.status = self.Status.ACTIVE
        self.archived_at = None
        self.save()

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"

        constraints = [
            models.CheckConstraint(
                condition=(
                    models.Q(
                        status="active",
                        archived_at__isnull=True,
                    )
                    | models.Q(
                        status="archived",
                        archived_at__isnull=False,
                    )
                ),
                name="project_archive_status_consistency",
            ),
        ]
