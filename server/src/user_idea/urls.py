from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('ideas', IdeaViewSet, basename='ideas')


urlpatterns = [
    path('', include(router.urls)),
    # path('ideas/', ListIdeas.as_view()),
    # path('idea/<str:idea_url>/', DetailIdea.as_view()),
    # path('idea/<str:idea_url>/', CreateUpdateDeleteIdea.as_view()),
    # path('join-idea/', JoinUserIdea.as_view()),
    # path('list-join-user-idea/<str:idea_url>/', ListJoinUser.as_view()),
    # path('add-user-idea/<str:idea_url>/', AddUserIdea.as_view()),
    # path('talents-list/', ListTalents.as_view()),
    # path('detail-talent/<uuid:talent_id>/', DetailTalent.as_view()),
    path('down/', downland_swagger)
]
