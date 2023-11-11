from django.contrib.auth.models import AnonymousUser
from rest_framework.authtoken.models import Token
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from urllib.parse import parse_qs


@database_sync_to_async
def get_user(token_key):
    try:
        token = Token.objects.get(key=token_key)
        return token.user
    except Token.DoesNotExist:
        return AnonymousUser()


class JWTMiddlewareAuthentication(BaseMiddleware):
    def __init__(self, inner):
        super().__init__(inner)

    async def __call__(self, scope, receive, send):
        headers = dict(scope['headers'])
        if b'authorization' in headers:
            auth_headers = headers['authorization']
            if auth_headers.startswith('Bearer '):
                token = auth_headers[7:]
                try:
                    user, value = JWTAuthentication().authenticate(token)
                    scope['user'] = user
                except AuthenticationFailed:
                    return None
        return await super().__call__(scope, receive, send)


