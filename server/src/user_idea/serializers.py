from rest_framework import serializers
from ..users.models import UserProfile, CustomUser, Speciality
from .models import *
from ..users.serializers import SpecialitySerializer, CustomUserSerializer, StackSerializer


class IdeasListSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(many=False)
    specialization = SpecialitySerializer(many=True)
    stack = StackSerializer(many=True)

    class Meta:
        model = Idea
        fields = '__all__'


class DetailIdeaSerializer(serializers.ModelSerializer):
    specialization = SpecialitySerializer(many=True)
    user = CustomUserSerializer(many=False)
    stack = StackSerializer(many=True)

    class Meta:
        model = Idea
        exclude = ('is_published',)


class UpdateCreateIdeaSerializer(serializers.ModelSerializer):
    specialization = SpecialitySerializer(many=True, required=False)
    stack = StackSerializer(many=True, required=False)

    class Meta:
        model = Idea
        fields = '__all__'

    def create(self, validated_data):
        specialization_list = validated_data.pop('specialization', [])
        stack_list = validated_data.pop('stack', [])
        user = self.context['request'].user
        validated_data['user'] = user
        idea = Idea.objects.create(**validated_data)

        for specialization in specialization_list:
            specialization_name = specialization.get('name')
            if specialization_name:
                specialization_instance, _ = Speciality.objects.get_or_create(name=specialization_name)
                idea.specialization.add(specialization_instance)

        for stack in stack_list:
            stack_name = stack.get('name')
            if stack_name:
                stack_instance, _ = Stack.objects.get_or_create(name=stack_name)
                idea.stack.add(stack_instance)
        idea.save()
        return idea

    def update(self, instance, validated_data):
        specializations = validated_data.get('specialization', [])
        stack_list = validated_data.get('stack', [])
        specialization_ids = []
        stack_ids = []

        for specialization in specializations:
            specialization_name = specialization.get('name')
            if specialization_name:
                specialization_instance, _ = Speciality.objects.get_or_create(name=specialization_name)
                specialization_ids.append(specialization_instance.id)

        for stack in stack_list:
            stack_name = stack.get('name')
            if stack_name:
                stack_instance, _ = Speciality.objects.get_or_create(name=stack_name)
                stack_ids.append(stack_instance.id)

        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.is_published = validated_data.get('is_published', instance.is_published)
        instance.specialization.set(specialization_ids)
        instance.stack.set(stack_ids)
        instance.save()
        return instance


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
