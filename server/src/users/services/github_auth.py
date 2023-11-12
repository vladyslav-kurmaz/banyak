import base64
import requests
from . import base_auth
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from ..models import CustomUser


def get_github_jwt(code: str):
    url = 'https://github.com/login/oauth/access_token'
    print('code:', code)
    data = {
        'client_id': settings.GITHUB_CLIENT_ID,
        'client_secret': settings.GITHUB_SECRET_KEY,
        'code': code,
        'redirect_uri': 'http://localhost:8000/api/v1/users/github-auth/'
    }
    headers = {
        'Accept': 'application/json',
        # 'Authorization': f"Basic {str_basic_encode.decode('ascii')}"
    }
    response = requests.post(url=url, data=data, headers=headers)
    print('response:', response.text)

    if response.status_code == 200:
        res = response.json()
        print(res)
        print('code:', code)
        return res.get('access_token')
    else:
        return None


def get_github_user(token: str):
    url_get_user = 'https://api.github.com/user'
    headers = {
        'Authorization': f'Bearer {token}'
    }
    response = requests.get(url=url_get_user, headers=headers)
    if response.status_code == 200:
        res = response.json()
        print(res)
        email = res.get('email')
        return email
    else:
        return None


def get_github_email(code: str):
    token = get_github_jwt(code)
    print('token:', token)
    if token is not None:
        return get_github_user(token)
    else:
        return None


def auth_github(code: str):
    email = get_github_email(code)
    if email is not None:
        user, _ = CustomUser.objects.get_or_create(email=email)
        return base_auth.create_token(user.id)
    else:
        raise AuthenticationFailed(code=403, detail='Bad github token')
