from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, generics, status
from rest_framework.decorators import api_view, permission_classes
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from uuid import UUID
from django.shortcuts import get_object_or_404
from .models import *
from .serializer import *


class ListIdeas(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        ideas = Idea.objects.filter(is_published=True)
        serializer = IdeasListSerializer(ideas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DetailIdea(APIView):

    def get(self, request, idea_url):
        try:
            idea = Idea.objects.get(slug=idea_url)
            serializer = DetailIdeaSerializer(idea, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Idea.DoesNotExist:
            return Response({'message': 'Idea not found'})


class CreateUpdateDeleteIdea(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UpdateCreateIdeaSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, idea_url):
        try:
            idea = Idea.objects.get(slug=idea_url)

            if idea.user == request.user:
                serializer = self.serializer_class(idea, data=request.data)
                serializer.is_valid(raise_exception=True)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Idea.DoesNotExist:
            return Response({'message': 'Idea not found'})

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




