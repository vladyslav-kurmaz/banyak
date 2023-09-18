from rest_framework import serializers
from ..users.models import CustomUser
from ..users.models import UserProfile, CustomUser
from .models import *
from ..users.serializers import SpecialitySerializer


class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = '__all__'


class IdeasListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = ('id', 'title')


class DetailIdeaSerializer(serializers.ModelSerializer):
    specialization = SpecializationSerializer(many=True)

    class Meta:
        model = Idea
        exclude = ('is_published',)


class UpdateCreateIdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        idea = Idea.objects.create(**validated_data)
        return idea


class JoinUserIdeaSerializer(serializers.ModelSerializer):
    idea = serializers.UUIDField(write_only=True)

    class Meta:
        model = JoinIdea
        fields = '__all__'


class ListJoinUserIdeaSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(many=False, queryset=CustomUser.objects.all(), required=False)
    idea = DetailIdeaSerializer(read_only=True)

    class Meta:
        model = JoinIdea
        fields = '__all__'


class AddUserIdeaSerializer(serializers.ModelSerializer):
    user = serializers.UUIDField(write_only=True)
    idea = serializers.UUIDField(write_only=True)

    class Meta:
        model = JoinIdea
        fields = '__all__'


class TalentsListSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(many=False, queryset=CustomUser.objects.all(), required=False)
    speciality = SpecialitySerializer(many=True)

    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'speciality')


class DetailTalentSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(many=False, queryset=CustomUser.objects.all(), required=False)

    class Meta:
        model = UserProfile
        fields = '__all__'


# class TalentsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = JoinIdea
#         fields = '__all__'
