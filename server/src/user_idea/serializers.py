from rest_framework import serializers
from ..users.models import UserProfile, CustomUser, Speciality
from .models import *
from ..users.serializers import SpecialitySerializer, CustomUserSerializer


# class SpecializationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Specialization
#         fields = '__all__'


# class SpecializationField(serializers.RelatedField):
#     def to_representation(self, value):
#         return value
#
#     def to_internal_value(self, data):
#         return SpecializationSerializer(data)


class IdeasListSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(many=False)
    specialization = SpecialitySerializer(many=True)

    class Meta:
        model = Idea
        fields = '__all__'


class DetailIdeaSerializer(serializers.ModelSerializer):
    specialization = SpecialitySerializer(many=True)
    user = CustomUserSerializer(many=False)

    class Meta:
        model = Idea
        exclude = ('is_published',)


class UpdateCreateIdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = '__all__'
        extra_kwargs = {
            'title': {'required': False},
            'specialization': {'required': False}
        }

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
