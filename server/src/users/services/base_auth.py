import datetime
from django.conf import settings
from datetime import timedelta, datetime
import jwt
import uuid


def create_token(user_id) -> dict:
    access_token_expire = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    user_uuid = str(user_id)
    return {
        'user_id': user_uuid,
        'access_token': create_access_token(
            data={
                'user_id': user_uuid,
                'expires_delta': access_token_expire
            },
        ),
        'token-type': 'Token'
    }


def create_access_token(data: dict, expire_data: timedelta = None):
    to_encode = data.copy()

    if expire_data is not None:
        expire_data = datetime.utcnow() + expire_data
    else:
        expire_data = datetime.utcnow() + timedelta(hours=48)

    to_encode.update({
        'exp': str(expire_data),
        'sub': 'access'
    })
    encode_jwt = jwt.encode(to_encode, settings.GITHUB_SECRET_KEY, algorithm=settings.ALGORITHM)
    return encode_jwt
