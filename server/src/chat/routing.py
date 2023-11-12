from django.urls import re_path, path
from ..chat.cunstomers import ChatConsumer
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter([
            path('ws/chat/<str:email>/', ChatConsumer.as_asgi())
        ])
    )
})


# websocket_urlpatterns = [
#     re_path('ws/chat/<str:chat_slug/', ChatConsumer.as_asgi())
# ]
