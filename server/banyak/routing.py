from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
# from ..src.chat.cunstomers import ChatConsumer
from django.urls import path

# ws_urlpatterns = ProtocolTypeRouter({
#     # 'websocket': AuthMiddlewareStack(
#     #     # URLRouter([
#     #     #     path('ws/chat/<str:email>/', ChatConsumer.as_asgi())
#     #     # ])
#     # )
# })
