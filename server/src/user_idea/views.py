from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, generics, status, viewsets
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from uuid import UUID
from django.shortcuts import get_object_or_404
from .models import *
from ..users.models import UserProfile
from .paginate_class import CustomPaginate
from .serializers import *
import requests
import json


class IdeaViewSet(viewsets.ModelViewSet):
    """
    GET - Отримуємо список ідей,
    GET <slug> - Отримуємо детальну інформацію про ідею за допомогою її slug,
    POST - Створення нової ідеї
    """
    # queryset = Idea.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = IdeasListSerializer
    pagination_class = CustomPaginate
    lookup_field = 'slug'

    def get_queryset(self):
        ideas = Idea.objects.filter(is_published=True)
        return ideas

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, slug, *args, **kwargs):
        # slug = kwargs.get('slug')
        try:
            idea = Idea.objects.get(slug=slug)
            serializer = DetailIdeaSerializer(idea)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Idea.DoesNotExist:
            return Response({'message': 'Idea not found'}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request, *args, **kwargs):
        serializer = UpdateCreateIdeaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_update(self, serializer):
        pass

    def destroy(self, request, idea_slug, *args, **kwargs):
        user = request.user
        try:
            idea = self.get_queryset().get(user=user, slug=idea_slug)
            if idea.user == user:
                idea.delete()
                return Response({'message': 'Delete'})
            return Response({'message': 'Error'})
        except Idea.DoesNotExist:
            return Response({'message': 'Idea not found'}, status=status.HTTP_404_NOT_FOUND)


class ListIdeas(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = IdeasListSerializer

    @swagger_auto_schema(
        operation_description="Get a list of published ideas",
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Successful',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'id': openapi.Schema(type=openapi.TYPE_INTEGER),
                            'title': openapi.Schema(type=openapi.TYPE_STRING)
                        }
                    )
                )
            ),
            status.HTTP_400_BAD_REQUEST: openapi.Response(
                description='Error'
            )
        }
    )
    def get(self, request):
        ideas = Idea.objects.filter(is_published=True)
        serializer = self.serializer_class(ideas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DetailIdea(APIView):
    serializer_class = DetailIdeaSerializer

    @swagger_auto_schema(
        operation_description="Get a list of published ideas",
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Successful',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'id': openapi.Schema(type=openapi.TYPE_INTEGER),
                            'title': openapi.Schema(type=openapi.TYPE_STRING),
                            'description': openapi.Schema(type=openapi.TYPE_STRING),
                            'specialization': openapi.Schema(type=openapi.TYPE_OBJECT),
                            'slug': openapi.Schema(type=openapi.FORMAT_SLUG),
                            'idea_views': openapi.Schema(type=openapi.TYPE_NUMBER)
                        }
                    )
                )
            ),
            status.HTTP_404_NOT_FOUND: openapi.Response(
                description='Idea not found'
            )
        }
    )
    def get(self, request, idea_url):
        try:
            idea = Idea.objects.get(slug=idea_url)
            serializer = self.serializer_class(idea, many=False)

            if request.user.is_authentication:
                idea.idea_views += 1
                idea.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Idea.DoesNotExist:
            return Response({'message': 'Idea not found'})


class CreateUpdateDeleteIdea(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UpdateCreateIdeaSerializer

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'idea': openapi.Schema(type=openapi.TYPE_STRING)
            },
            required=[
                'idea'
            ]
        ),
        responses={
            status.HTTP_201_CREATED: openapi.Response(description='Idea create'),
            status.HTTP_400_BAD_REQUEST: openapi.Response(description='Invalid input data'),
        }
    )
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        request_body=UpdateCreateIdeaSerializer,
        responses={
            status.HTTP_201_CREATED: 'Idea update',
            status.HTTP_404_NOT_FOUND: 'Idea not found',
            status.HTTP_400_BAD_REQUEST: 'Invalid data'
        }
    )
    def put(self, request, idea_url):
        try:
            idea = Idea.objects.get(slug=idea_url)

            if idea.user == request.user:
                serializer = self.serializer_class(idea, data=request.data)
                serializer.is_valid(raise_exception=True)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Idea.DoesNotExist:
            return Response({'message': 'Idea not found'})

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: openapi.Response(description='Idea deleted successfully'),
            status.HTTP_404_NOT_FOUND: openapi.Response(description='Idea not found'),
        }
    )
    def delete(self, request, idea_url):
        try:
            idea = Idea.ibjects.get(slug=idea_url)

            if idea.user == request.user:
                idea.delete()
                return Response({'message': 'Delete'})
            return Response({'message': 'error'})
        except Idea.DoesNotExist:
            return Response({'message': 'Idea not found'})


class JoinUserIdea(APIView):
    serializer_class = JoinUserIdeaSerializer
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'idea': openapi.Schema(type=openapi.TYPE_STRING)
            },
            required=[
                'idea'
            ]
        ),
        responses={
            status.HTTP_201_CREATED: openapi.Response(description='Join successfully'),
            status.HTTP_400_BAD_REQUEST: openapi.Response(description='Invalid input data'),
        }
    )
    def post(self, request):
        current_user = request.user
        idea_id = request.data.get('idea')

        print(idea_id)

        # print(idea)

        try:
            idea = Idea.objects.get(id=UUID(idea_id))
            print(idea.id)
            serializer = self.serializer_class(data=request.data)

            if serializer.is_valid():
                # serializer.idea = idea
                serializer.save(idea=idea, user=current_user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors)

        except Idea.DoesNotExist:
            return Response({'message': 'Idea not found'})


class ListJoinUser(APIView):
    serializer_class = ListJoinUserIdeaSerializer
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Successful',
                schema=ListJoinUserIdeaSerializer(many=True)
            )
        }
    )
    def get(self, request, idea_url):
        current_user = request.user
        user_idea = Idea.objects.get(slug=idea_url)

        if current_user == user_idea.user:
            idea = JoinIdea.objects.filter(idea=user_idea)
            serializer = self.serializer_class(idea, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'It is not your idea'})


class AddUserIdea(APIView):
    """Додавання користувача на проект"""

    serializer_class = AddUserIdeaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, idea_url):
        current_user = request.user
        idea_join = JoinIdea.objects.get(slug=idea_url)

        if idea_join.idea.user == current_user:
            serializer = self.serializer_class(idea_join, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'It is not your idea'})

    # def post(self, request, idea_url):
    #     current_user = request.user
    #     idea = Idea.objects.get(slug=idea_url)
    #
    #     if current_user == idea.user:
    #         serializer = self.serializer_class(data=request.data)
    #         if serializer.is_valid():
    #             serializer.save(idea=idea)
    #             return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response({'message': 'You do not have access to the idea'})


class ListTalents(APIView):
    serializer_class = TalentsListSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        talents = UserProfile.objects.filter(is_talent=True)
        serializer = self.serializer_class(talents, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DetailTalent(APIView):
    serializer_class = DetailTalentSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, talent_id):
        try:
            talent = UserProfile.objects.get(id=talent_id)
            serializer = self.serializer_class(talent, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'message': 'Talent not found'})


class Search(generics.ListAPIView):
    queryset = Idea.objects.all()


def downland_swagger(request):
    url = 'http://127.0.0.1:8000/swagger.json'
    response = requests.get(url)

    if response.status_code == 200:
        json_schema = response.json()
        json_string = json.dumps(json_schema, indent=4)

        filename = 'banyak.json'
        response = HttpResponse(json_string, content_type='application/json')
        response['Content-Disposition'] = 'attachment; filename="{}"'.format(filename)
        return response
    else:
        return HttpResponse(status=response.status_code)

