from django.db import models
from src.user_idea.models import Idea
from src.users.models import UserProfile, CustomUser
import uuid


class InviteTalentIdea(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    letter = models.TextField(blank=True, null=True)
    owner = models.ForeignKey(UserProfile, blank=True, null=True, on_delete=models.CASCADE, related_name='owner')
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE)
    talent = models.ForeignKey(UserProfile, blank=True, null=True, on_delete=models.CASCADE, related_name='talent')
    accept_invite = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.idea} - {self.talent}'
