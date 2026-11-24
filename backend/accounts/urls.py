from django.urls import path

from .views import LoginView, LogoutView, MeView, RegistrationView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("signup/", RegistrationView.as_view(), name="signup"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("me/", MeView.as_view(), name="me"),
]
