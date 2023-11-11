from django.urls import re_path, path
from ..chat.cunstomers import ChatConsumer

websocket_urlpatterns = [
    re_path('ws/chat/<str:room_name/', ChatConsumer.as_asgi())
]
