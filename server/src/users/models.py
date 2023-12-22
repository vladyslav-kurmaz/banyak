from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.urls import reverse
from slugify import slugify
from .manager import CustomUserManager
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
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email


class Avatar(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, blank=True, null=True, on_delete=models.CASCADE)
    avatar_profile = models.ImageField(blank=True, null=True, upload_to='avatars/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user}'


class Speciality(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(unique=True, max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name}'


class Stack(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(unique=True, max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name}'


class UserProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, blank=True, null=True, on_delete=models.CASCADE)
    avatar = models.OneToOneField(Avatar, blank=True, null=True, on_delete=models.CASCADE)
    upload_military = models.ImageField(blank=True, null=True, upload_to='military/')
    upload_vpo = models.ImageField(blank=True, null=True, upload_to='vpo')
    description = models.TextField(blank=True, null=True)
    speciality = models.ManyToManyField(Speciality, blank=True)
    stack = models.ManyToManyField(Stack, blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True, null=True, db_index=True)
    portfolio = models.URLField(blank=True, null=True)
    is_talent = models.BooleanField(default=False)
    profile_view = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user}'

    def get_absolute_url(self):
        return reverse('profile', args=[str(self.id)])
    
    def save(self, *args, **kwargs):
        if not self.slug:
            user_id = str(self.user.id)
            user_description = self.description
            full_name = f'{self.user.first_name} {self.user.last_name} {user_id[1:7]}'
            self.slug = slugify(full_name)
        return super().save(*args, **kwargs)


class BlackListToken(models.Model):
    # додати поле uuid
    token = models.CharField(max_length=500)
    user = models.ForeignKey(CustomUser, related_name='user_token', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.token
