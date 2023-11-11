"""
ASGI config for banyak project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

# import os
#
# from django.core.asgi import get_asgi_application
# from django.urls import path
# from channels.auth import AuthMiddlewareStack
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.security.websocket import AllowedHostsOriginValidator
# # from .routing import ws_urlpatterns
# # from banyak.server.src.chat.cunstomers import ChatConsumer
# # from ..src.chat.cunstomers import ChatConsumer
# # from ..src.chat.middleware import TokenMiddlewareAuthentication
#
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'banyak.settings')
#
# django_asgi_app = get_asgi_application()
#
# application = ProtocolTypeRouter({
#     'http': django_asgi_app
#     # 'websocket': AllowedHostsOriginValidator(
#     #     AuthMiddlewareStack(
#     #         URLRouter(ws_urlpatterns)
#     #         # URLRouter([
#     #         #     path('ws/chat/<str:chat_id>/', ChatConsumer.as_asgi()),
#     #         #     # path('token/', TokenMiddlewareAuthentication.as_asgi())
#     #         # ])
#     #     )
#     # )
# })

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'banyak.settings')

django.setup()


from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator

from src.chat.routing import websocket_urlpatterns
from src.chat.middleware import JWTMiddlewareAuthentication


django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    'http': django_asgi_app,
    'websocket': AllowedHostsOriginValidator(
        JWTMiddlewareAuthentication(URLRouter(websocket_urlpatterns))
    )
})

