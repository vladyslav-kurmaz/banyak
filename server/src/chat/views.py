from rest_framework.views import APIView
from rest_framework import permissions, status, viewsets, generics
from rest_framework.response import Response
from .serializers import *
from .models import *


class Chats(APIView):
    serializer_class = ChatsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            chats = Chat.objects.filter(user=request.user)
            serializer = self.serializer_class(chats, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Chat.DoesNotExist:
            return Response({'message': 'Rooms not found'}, status=status.HTTP_404_NOT_FOUND)


class CurrentChat(APIView):
    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, chat_slug):
        current_user = request.user

        try:
            current_room = Chat.objects.get(slug=chat_slug)
        except Chat.DoesNotExist:
            return Response({'message': 'Chat not found'}, status=status.HTTP_404_NOT_FOUND)

        if current_room.user == current_user:
            serializer = self.serializer_class(current_room, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'Chat not found'}, status=status.HTTP_404_NOT_FOUND)


class CreateDeleteChat(APIView):
    serializer_class = CreateChatSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        current_user = request.user
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            other_user = serializer.validated_data['other_user']
            new_chat = Chat.objects.create()
            new_chat.users.add(current_user, other_user)
            new_chat.save()
            return Response({'chat_id': new_chat.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, chat_slug):
        current_user = request.user
        chat = Chat.objects.get(slug=chat_slug)

        if chat.user == current_user:
            chat.delete()
            return Response({'message': 'Chat deleted'}, status=status.HTTP_200_OK)
        return Response({'message': 'Chat not found'}, status=status.HTTP_404_NOT_FOUND)


