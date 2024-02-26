from django.db import models
from django.conf import settings
from django.core.validators import FileExtensionValidator
from django.utils.text import slugify
from .validators import validate_file_size
import uuid


class Chat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    initiator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank=True, null=True,
        on_delete=models.PROTECT,
        related_name='initiated_chat'
    )   # відправник
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank=True, null=True,
        on_delete=models.PROTECT,
        related_name='receiver_chat'
    )   # отримувач
    messages = models.ManyToManyField('Message', related_name='message')
    slug = models.SlugField(db_index=True, unique=True, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.users

    # def save(self, *args, **kwargs):
    #     if not self.slug:
    #         self.slug = slugify(self.id)
    #     return super().save(*args, **kwargs)


class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name='author_message'
    )
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, blank=True, null=True, on_delete=models.SET_NULL)
    chat = models.ForeignKey(Chat, blank=True, null=True, on_delete=models.CASCADE)
    body = models.TextField()
    attachment = models.FileField(
        blank=True,
        null=True,
        upload_to='attachment/',
        validators=[validate_file_size]
    )
    seen = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.body

