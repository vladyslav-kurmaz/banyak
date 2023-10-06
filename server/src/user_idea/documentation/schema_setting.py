from drf_yasg import openapi
from rest_framework import status

ideas_doc_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'title': openapi.Schema(type=openapi.TYPE_STRING, description='title'),
        'description': openapi.Schema(type=openapi.TYPE_STRING, description='description'),
        'specialization': openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(type=openapi.TYPE_STRING),
            description='specialization'
        ),
        'slug': openapi.Schema(type=openapi.TYPE_STRING, description='slug'),
        'is_published': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='idea is public')
    },
    required=['title', 'description']
)

ideas_doc = {
    # 'list': {
    #     'operation_description': 'Ideas list',
    #     'manual_parameters': ideas_doc_list_parameters
    # }
    'create': {
        'operation_description': 'Creation of a new idea',
        'request_body': ideas_doc_schema,
        'responses': {
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_403_FORBIDDEN: 'Forbidden'
        }
    },
    'retrieve': {
        'operation_description': 'Get detailed information about the idea',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Successful',
                schema=ideas_doc_schema
            ),
            status.HTTP_404_NOT_FOUND: 'Idea not found'
        }
    },
    'update': {
        'operation_description': 'Only the author of the idea can update the idea data',
        'request_body': ideas_doc_schema,
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Successful',
                schema=ideas_doc_schema
            ),
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_403_FORBIDDEN: 'Forbidden',
            status.HTTP_404_NOT_FOUND: 'Idea not found'
        }
    },
    'destroy': {
        'operation_description': 'Deletes the idea. Only the author can delete an idea',
        'responses': {
            status.HTTP_200_OK: 'Delete',
            status.HTTP_404_NOT_FOUND: 'Idea not found',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized',
            status.HTTP_403_FORBIDDEN: 'Forbidden'
        }
    }
}
