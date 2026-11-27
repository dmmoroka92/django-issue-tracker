from typing import TYPE_CHECKING, Self

from django.db import models

if TYPE_CHECKING:
    from .models import Project  # noqa: F401


class ProjectQuerySet(models.QuerySet["Project"]):
    def active(self) -> Self:
        return self.filter(status=self.model.Status.ACTIVE)

    def archived(self) -> Self:
        return self.filter(status=self.model.Status.ARCHIVED)
