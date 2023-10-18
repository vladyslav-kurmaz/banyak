from rest_framework import serializers
from src.users.models import UserProfile
from src.users.serializers import CustomUserTalentSerializer
from src.user_idea.models import Idea
from src.user_idea.serializers import DetailIdeaSerializer
from .models import InviteTalentIdea


class ListTalentSerializer(serializers.ModelSerializer):
    user = CustomUserTalentSerializer()

    class Meta:
        model = UserProfile
        fields = ('id', 'user')


class TalentDetailField(serializers.RelatedField):

    def to_internal_value(self, data):
        return DetailIdeaSerializer(data)

    def to_representation(self, value):
        return value


class InviteTalentIdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = InviteTalentIdea
        fields = '__all__'


class AcceptInviteTalentIdeaSerializer(serializers.ModelSerializer):
    class Meta:
        mode = InviteTalentIdea
        fields = ('id', 'accept_invite')
