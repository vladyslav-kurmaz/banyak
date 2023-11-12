from django.urls import path
from .views import *


urlpatterns = [
    path('chats/', Chats.as_view()),
    path('chat/<str:chat_slug>/', CurrentChat.as_view()),
    path('chat-create/', CreateDeleteChat.as_view()),
    path('delete-chat/<str:chat_slug>/', CreateDeleteChat.as_view())
]
