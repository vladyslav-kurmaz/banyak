from django.db import models
from django.conf import settings
from slugify import slugify
from src.users.models import Speciality, Stack
import uuid


class AvatarIdea(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, blank=True, null=True, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars_ideas/')
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.id}-{self.user}'


class Idea(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, blank=True, null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    avatar = models.OneToOneField(AvatarIdea, blank=True, null=True, on_delete=models.CASCADE)
    specialization = models.ManyToManyField(Speciality)
    stack = models.ManyToManyField(Stack, blank=True, null=True)
    slug = models.SlugField(unique=True, db_index=True, max_length=78, blank=True, null=True)    # додати більше унікалтності для слагу
    idea_views = models.IntegerField(default=0)
    is_published = models.BooleanField(default=False)   # додати дату створеня та дату редагування для всіх таблиць
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            user_id = str(self.user.id)
            full_slug = f'{self.title} {user_id[0:7]}'
            self.slug = slugify(full_slug)
        return super().save(*args, **kwargs)


class JoinIdea(models.Model):   # поміняти назву класу на нормальну
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    idea = models.ForeignKey(Idea, blank=True, null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, blank=True, null=True, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.idea} - {self.user}'
