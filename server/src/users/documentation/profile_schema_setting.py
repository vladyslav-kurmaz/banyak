from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status


create_profile_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'user': openapi.Schema(type=openapi.TYPE_STRING)
    }
)

get_update_profile_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'description': openapi.Schema(type=openapi.TYPE_STRING, description='Profile description'),
        'avatar': openapi.Schema(type=openapi.TYPE_STRING, description='Profile avatar'),
        'ideas': openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'title': openapi.Schema(type=openapi.TYPE_STRING, description='Idea title')
                }
            )
        ),
        'speciality': openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'name': openapi.Schema(type=openapi.TYPE_STRING, description='Specialities names')
                }
            )
        ),
        'stack': openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'name': openapi.Schema(type=openapi.TYPE_STRING, description='Stack')
                }
            )
        ),
        'is_talent': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='Profile is talent')
    }
)


profile_doc = {
    'post': {
        'operation_description': 'Create user profile',
        'request_body': create_profile_schema,
        'responses': {
            status.HTTP_201_CREATED: 'Profile created',
            status.HTTP_400_BAD_REQUEST: 'Invalid data'
        }
    },
    'put': {
        'operation_description': 'Update data profile',
        'request_body': get_update_profile_schema,
        'responses': {
            status.HTTP_200_OK: 'Profile updated',
            status.HTTP_400_BAD_REQUEST: 'Invalid user data'
        }
    }
}
