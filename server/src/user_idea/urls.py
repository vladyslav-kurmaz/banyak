from django.urls import path
from .views import *


urlpatterns = [
    path('ideas/', ListIdeas.as_view()),
    path('idea/<str:idea_url>/', DetailIdea.as_view()),
    path('idea/<str:idea_url>/', CreateUpdateDeleteIdea.as_view()),
    path('join-idea/', JoinUserIdea.as_view()),
    path('list-join-user-idea/<str:idea_url>/', ListJoinUser.as_view()),
    path('add-user-idea/<str:idea_url/', AddUserIdea.as_view())
]
