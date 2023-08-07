from django.db import models
from django.conf import settings
from django.utils.text import slugify
import uuid


class Chat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ManyToManyField(settings.AUTH_USER_MODEL)
    slug = models.SlugField(unique=True, blank=True, null=True)

    def __str__(self):
        return f'{self.user}'

    def save(self, *args, **kwargs):
        super(Chat, self).save(*args, **kwargs)


class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    message = models.TextField()

    def __str__(self):
        return f'{self.user} - {self.message}'
