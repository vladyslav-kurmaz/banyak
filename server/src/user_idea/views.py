from rest_framework.response import Response
from rest_framework import permissions, status, viewsets
from django.http import HttpResponse
# from banyak.server.src.decorators.decorators import swagger_decorator
from ..decorators.decorators import swagger_decorator
from .documentation.schema_setting import ideas_doc
from .paginate_class import CustomPaginate
from .serializers import *
import requests
import json


@swagger_decorator(
    ['list', 'retrieve', 'create', 'partial_update', 'destroy'], 'Idea', ideas_doc
)
class IdeaViewSet(viewsets.ModelViewSet):
    """
    GET - Отримуємо список ідей,
    GET <slug> - Отримуємо детальну інформацію про ідею за допомогою її slug,
    POST - Створення нової ідеї
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = IdeasListSerializer
    pagination_class = CustomPaginate
    lookup_field = 'slug'

    def get_queryset(self):
        if self.request.user.is_authenticated:
            ideas = Idea.objects.all()
        else:
            ideas = Idea.objects.filter(is_published=True)
        return ideas

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        slug = kwargs.get('slug')
        try:
            # idea = Idea.objects.get(slug=slug)
            idea = self.get_queryset().get(slug=slug)
            serializer = DetailIdeaSerializer(idea)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Idea.DoesNotExist:
            return Response({'message': 'Idea not found'}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request, *args, **kwargs):
        specialization = request.data.pop('specialization', [])
        serializer = UpdateCreateIdeaSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        idea = serializer.save()
        idea.specialization.set(specialization)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def partial_update(self, request, *args, **kwargs):
        user = request.user
        print(user)
        slug = kwargs.get('slug')
        try:
            specialization = request.data.pop('specialization', [])
            title = request.data.pop('title', None)
            idea = self.get_queryset().get(user=user, slug=slug)
            serializer = UpdateCreateIdeaSerializer(idea, data=request.data)
            if serializer.is_valid():
                upd_idea = serializer.save()

                if title:
                    upd_idea.slug = slugify(title)
                    upd_idea.save()
                upd_idea.specialization.set(specialization)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Idea.DoesNotExist:
            return Response({'message': 'Idea not found'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        user = request.user
        slug = kwargs.get('slug')
        try:
            idea = self.get_queryset().get(user=user, slug=slug)
            idea.delete()
            return Response({'message': 'Delete'})
        except Idea.DoesNotExist:
            return Response({'message': 'Idea not found'}, status=status.HTTP_404_NOT_FOUND)


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

