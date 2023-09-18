from ..serializers import GoogleAuthSerializer
from ..models import CustomUser
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from google.auth.transport import requests
from google.oauth2 import id_token
from . import base_auth


def check_google_auth(google_user: GoogleAuthSerializer) -> dict:
    try:
        id_token.verify_oauth2_token(google_user['token'], requests.Request(), settings.GOOGLE_CLIENT_ID)
    except ValueError:
        raise AuthenticationFailed(code=403, detail='Bad google token')

    user, _ = CustomUser.objects.get_or_create(email=google_user['email'])
    return base_auth.create_access_token(user.id)
