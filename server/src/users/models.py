from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.urls import reverse
from .manager import CustomUserManager
from ..user_idea.models import Idea
from datetime import timezone
import uuid


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_verify = models.BooleanField(default=False)
    data_joined = models.DateTimeField(auto_now_add=True)
    last_login_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email


class Speciality(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.name}'


class Stack(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=15)

    def __str__(self):
        return f'{self.name}'


class UserProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, blank=True, null=True, on_delete=models.CASCADE)
    avatar = models.ImageField(blank=True, null=True, upload_to='avatars/')
    upload_military = models.ImageField(blank=True, null=True, upload_to='military/')
    upload_vpo = models.ImageField(blank=True, null=True, upload_to='vpo')
    ideas = models.ManyToManyField(Idea, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    speciality = models.ManyToManyField(Speciality, blank=True)
    stack = models.ManyToManyField(Stack, blank=True)
    portfolio = models.URLField(blank=True, null=True)
    is_talent = models.BooleanField(default=False)
    is_military = models.BooleanField(default=False)    # військовий
    is_vpo = models.BooleanField(default=False)  # вимушено переселена особа

    def __str__(self):
        return f'{self.user}'

    def get_absolute_url(self):
        return reverse('profile', args=[str(self.id)])


class BlackListToken(models.Model):
    token = models.CharField(max_length=500)
    user = models.ForeignKey(CustomUser, related_name='user_token', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.token
