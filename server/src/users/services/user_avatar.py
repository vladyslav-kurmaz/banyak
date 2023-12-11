import base64

from django.core.files.base import ContentFile
from urllib import request


# def process_avatar_data(avatar_data):
#     if avatar_data.startswith('data:image'):
#         avatar_format, image_str = avatar_data.split(';base64')
#         ext = avatar_format.split('/')[-1]
#         avatar_data = ContentFile(base64.b64decode(image_str), name=f'avatar.{ext}')
#     elif avatar_data.startswith(('http://', 'https://')):
#         response = request.urlopen(avatar_data)
#         avatar_data = ContentFile(response.read(), name='avatar.jpg')
#
#     return avatar_data
