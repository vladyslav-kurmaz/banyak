from drf_yasg import openapi
from rest_framework import status

user_register_doc_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'email': openapi.Schema(type=openapi.FORMAT_EMAIL, description='User email'),
        'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password'),
        'first_name': openapi.Schema(type=openapi.TYPE_STRING, description='User first name'),
        'last_name': openapi.Schema(type=openapi.TYPE_STRING, description='User last name')
    },
    required=['email', 'password']
)

user_login_doc_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'email': openapi.Schema(type=openapi.FORMAT_EMAIL, description='User email'),
        'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password')
    },
    required=['email', 'password']
)

update_access_token_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'refresh_token': openapi.Schema(type=openapi.TYPE_STRING, description='Refresh token')
    },
    required=['refresh_token']
)

users_doc = {
    'post': {
        'operation_description': 'Register new user',
        'request_body': user_register_doc_schema,
        'responses': {
            status.HTTP_201_CREATED: 'User register',
            status.HTTP_400_BAD_REQUEST: 'Invalid data'
        }
    },
    'put': {
        'operation_description': 'Update access token',
        'request_body': update_access_token_schema,
        'responses': {
            status.HTTP_200_OK: 'Access token update',
            status.HTTP_400_BAD_REQUEST: 'Refresh token has expired'
        }
    }
}
