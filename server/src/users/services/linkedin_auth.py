from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from ..models import CustomUser
from . import base_auth
import requests


def get_github_jwt(code: str):
    url = 'https://www.linkedin.com/oauth/v2/accessToken'
    data = {
        'grand_type': 'authorization_code',
        'code': code,
        'client_id': settings.LINKEDIN_CLIENT_ID,
        'client_secret': settings.LINKEDIN_SECRET_KEY,
        'redirect_uri': 'http://localhost:8000/api/v1/users/linkedin-auth/'
    }
    headers = {
        'Accept': 'application/json'
    }
    response = requests.post(url=url, data=data, headers=headers)

    if response.status_code == 200:
        res = response.json()
        print('data:', res)
        token = res.get('access_token')
        return token


def get_linkedin_user_data(code):
    url = 'https://api.linkedin.com/v2/me'
