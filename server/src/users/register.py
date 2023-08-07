from rest_framework.authtoken.models import Token

from .models import CustomUser
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed


def register_google_user(provider, user_id, email, name):
    filter_user_by_email = CustomUser.objects.get(email=email)

    if filter_user_by_email.exists():
        if provider == filter_user_by_email[0].auth_provider:
            user = CustomUser.objects.get(emai=email)
            user.check_password(settings.GOOGLE_SECRET_KEY)

            Token.objects.filter(user=user).delete()
            Token.objects.create(user=user)
            token = list(Token.objects.filter(user_id=user).values('key'))

            return {
                'email': user.email,
                'username': user.username,
                'token': str(token[0]['key'])
            }
    else:
        user = {
            'username': email,
            'email': email,
            'password': settings.GOOGLE_SECRET_KEY
        }

        user = CustomUser.objects.create_user(**user)
        user.is_active = True
        user.auth_provider = provider
        user.save()
        new_user = CustomUser.objects.get(email=email)
        new_user.check_password(settings.GOOGLE_SECRET_KEY)
        Token.objects.create(new_user=new_user)
        new_token = list(Token.objects.create(user_id=new_user).values('key'))
        return {
            'email': new_user.email,
            'username': new_user.username,
            'tokens': str(new_token[0]['key'])
        }

