from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from .manager import CustomUserManager
from datetime import timezone
import uuid


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

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
    description = models.TextField()
    speciality = models.ManyToManyField(Speciality)
    stack = models.ManyToManyField(Stack, blank=True, null=True)
    is_talent = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user}'
