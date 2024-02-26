from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
from .models import *
from .serializers import MessageSerializer
import json
import base64
import secrets


class ChatConsumer(AsyncWebsocketConsumer):
    """
    The ChatConsumer class handles WebSocket connections and message processing between users in a chat.
    It includes methods for connection, disconnection, message handling, and message broadcasting via WebSocket
    using Django Channels.

    Methods:
    - connect(): Establishes a WebSocket connection when a user connects.
    - disconnect(): Disconnects the WebSocket connection when the conversation ends.
    - receive(): Processes received messages from the client and sends them to the chat.
    - chat_message(): Processes and saves received messages in the chat.
    - chat_all_message(): Sends all chat messages to the client.
    - delete_message_chat(): Deletes a message from the chat and updates clients.
    - chat_message_update(): Updates a message in the chat.
    - get_or_create_chat(): Retrieves an existing chat or creates a new chat with the receiver user.

    This class uses asynchronous processing with the Django Channels library.
    """

    async def connect(self):
        self.user = self.scope['user']

        if self.user.is_anonymus:
            await self.close()
        else:
            # self.room_name = self.scope['url_route']['kwargs']['room_name']
            receiver_user = self.scope['url_route']['kwargs']['receiver_id']

            chat = await self.get_or_create_chat(self.user, receiver_user)
            self.room_name = chat.id

            self.room_group_name = f'chat_{self.room_name}'
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        user = self.scope['user']
        text_data_json = json.loads(text_data)
        message = text_data_json.get('message', None)
        room_name = text_data_json.get('room_name', None)
        if not Chat.objects.get(id=room_name, initiator=user):
            return None
        if message and room_name:
            await self.channel_layer.group_send(
                room_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'user_email': self.user.email
                }
            )

    async def chat_message(self, event):
        text_data_json = event.copy()
        text_data_json.pop('type')
        message, attachment = (
            text_data_json['message'],
            text_data_json['attachment']
        )
        chat = Chat.objects.get(id=self.room_name)
        sender = self.scope['user']

        if attachment:
            file_str, file_ext = attachment['data'], attachment['format']
            file_data = ContentFile(
                base64.b64decode(file_str), name=f'{secrets.token_hex(8)}.{file_ext}'
            )
            _message = Message.objects.create(
                author=sender,
                receiver=chat.receiver,
                body=message,
                chat=chat,
                attachment=file_data
            )
        else:
            _message = Message.objects.create(
                author=sender,
                receiver=chat.receiver,
                body=message,
                chat=chat
            )
        serializer = MessageSerializer(instance=_message)
        await self.channel_layer.group_send(
            text_data=json.dumps(serializer.data)
        )

    async def chat_all_message(self, room_name):
        user = self.scope['user']
        chat = get_object_or_404(Chat, id=room_name)

        if chat.initiator == user or chat.receiver == user:
            messages = Message.objects.filter(chat=chat).order_by('created')
            serializer = MessageSerializer(messages, many=True)
            await self.send(json.dumps({
                'messages': serializer.data
            }))

    @database_sync_to_async
    def delete_message_chat(self, room_name, message_id):
        user = self.scope['user']
        chat = get_object_or_404(Chat, id=room_name)
        message = get_object_or_404(Message, id=message_id)
        if chat.messages == message and message.author == user:
            message.delete()

            messages = Message.objects.filter(chat=chat).order_by('created')
            serializer = MessageSerializer(messages, many=True)
            self.channel_layer.group_send({
                'type': 'chat_all_messages',  # який метод буде обробляти запит
                'room_name': room_name,
                'messages': serializer.data
            })

    @database_sync_to_async
    def chat_message_update(self, room_name, message_id, upd_message):
        user = self.scope['user']
        chat = get_object_or_404(Chat, id=room_name)
        message = get_object_or_404(Message, id=message_id, chat=chat)
        if message.author == user and chat.initiator == user or chat.receiver == user:
            message.body = upd_message
            message.save()

            # Receive an updated notification
            updated_message = get_object_or_404(Message, id=message_id)
            serializer = MessageSerializer(instance=updated_message)

            # Send an updated message to everyone in the chat
            self.channel_layer.group_add(
                room_name,
                {
                    'type': 'chat_message_update',
                    'message': serializer.data
                }
            )

    @database_sync_to_async
    def get_or_create_chat(self, user, receiver):
        existing_chat_room = Chat.objects.filter(initiator=user, receiver=receiver).first()

        if existing_chat_room:
            return existing_chat_room
        else:
            new_chat_room = Chat.objects.create(initiator=user, receiver=receiver)
            return new_chat_room
