from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
from channels.db import database_sync_to_async
from channels.auth import login
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AnonymousUser
from django.core.files.base import ContentFile
from .models import *
from .serializer import MessageSerializer
import json
import uuid
import base64
import secrets


class ChatConsumer(AsyncWebsocketConsumer):

    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     self.user = set()

    @database_sync_to_async
    async def fetch_messages(self, data):
        messages = Message.objects.all()
        content = {
            'command': messages,
            'messages': self.message_to_json(messages)
        }
        await self.send_message()

    @database_sync_to_async
    async def message_to_json(self, message):
        pass

    async def connect(self):
        # self.user = self.scope['user']

        if self.scope['user'].is_anonymus:
            await self.close()
        else:
            self.chat_name = self.scope['url_route']['kwargs']['chat_id']
            self.group_name = f'chat_{self.chat_name}'

            await self.channel_layer.group_add(self.group_name, self.channel_name)
            await self.accept()
            print(self.scope['user'].email)

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        email = text_data_json['email']

        chat_type = {'type': 'chat_message'}
        return_dict = {**chat_type, **text_data_json}

        await self.channel_layer.group_send(
            self.group_name,
            return_dict
            # {
            #     'type': 'chatbox_message',
            #     'message': message,
            #     'email': email
            # }
        )

        # await login(self.scope, user)
        # await self.send(text_data=json.dumps({'message': message}))

    # async def chat_message(self, event):
    #     message = event['message']
    #     await self.send(text_data=json.dumps({'message': message}))

    async def chat_message(self, event):
        text_data_json = event.copy()
        text_data_json.pop('type')
        message, attachment = (
            text_data_json['message'],
            text_data_json.get('attachment')
        )
        # try:
        #     chat = Chat.objects.get(id=uuid.UUID)
        # except Chat.DoesNotExist:
        #     raise ValueError('error')

        chat = None

        chat_id = self.room_name

        sender = self.scope('user')

        try:
            chat = Chat.objects.get(id=uuid.UUID(chat_id))
        except Chat.DoesNotExist:
            await self.send(text_data=json.dumps({
                'error': 'Chat not found'
            }))

        if not attachment:
            _message = Message.objects.create(
                author=sender,
                body=message,
                chat=chat
            )
            # serializer = MessageSerializer(instance=_message)
            # await self.send(text_data=json.dumps(
            #     serializer.data
            # ))
        else:
            file_str, file_ext = attachment['data'], attachment['format']
            file_data = ContentFile(
                base64.b64decode(file_str), name=f'{secrets.token_hex(8)}.{file_ext}'
            )
            _message = Message.objects.create(
                author=sender,
                attachment=file_data,
                body=message,
                chat=chat
            )
        serializer = MessageSerializer(instance=_message)
        await self.send(text_data=json.dumps(
            serializer.data
        ))

    async def send_message(self):
        pass
