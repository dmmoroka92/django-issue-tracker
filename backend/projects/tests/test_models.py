import pytest
from django.core.exceptions import ValidationError
from django.db import IntegrityError, transaction

from accounts.models import User
from projects.models import Project


@pytest.fixture
def user():
    return User.objects.create_user(
        first_name="Test",
        last_name="User",
        email="testuser@example.com",
        password="SecurePassword123!",
        role=User.Role.USER,
    )


@pytest.fixture
def project(user):
    return Project.objects.create(
        name="Test Project", description="Project description", created_by=user
    )


@pytest.mark.django_db
def test_valid_project_creation(user):
    project = Project.objects.create(
        name="Test Project",
        description="Test Description",
        created_by=user,
    )

    assert Project.objects.filter(pk=project.pk).exists()

    assert project.created_by == user
    assert project.status == Project.Status.ACTIVE
    assert project.created_at is not None
    assert project.updated_at is not None
    assert project.archived_at is None


@pytest.mark.django_db
@pytest.mark.parametrize(
    ("field", "value"),
    [
        ("name", "a" * 256),
        ("description", ""),
        ("status", "invalid_status"),
        ("created_by", None),
    ],
)
def test_project_invalid_fields(user, field, value):
    project = Project(
        name="Project name", description="Project description", created_by=user
    )

    setattr(project, field, value)

    with pytest.raises(ValidationError) as exc_info:
        project.full_clean()

    assert field in exc_info.value.message_dict


@pytest.mark.django_db
def test_archived_project_requires_archived_at(user):
    with pytest.raises(IntegrityError):
        with transaction.atomic():
            Project.objects.create(
                name="Test project",
                description="Test description",
                created_by=user,
                status=Project.Status.ARCHIVED,
                archived_at=None,
            )


@pytest.mark.django_db
def test_project_archive(project):
    project.archive()

    assert project.status == Project.Status.ARCHIVED
    assert project.archived_at is not None


@pytest.mark.django_db
def test_project_restore(project):
    project.archive()

    project.restore()

    assert project.status == Project.Status.ACTIVE
    assert project.archived_at is None
