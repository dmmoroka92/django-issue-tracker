from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny

from .serializers.registration import RegistrationSerializer


class RegistrationView(CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]
