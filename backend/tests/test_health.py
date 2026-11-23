from django.conf import settings


def test_django_settings():
    assert "django.contrib.auth" in settings.INSTALLED_APPS
