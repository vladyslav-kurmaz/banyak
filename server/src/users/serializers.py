from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str, smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from src.user_idea.models import Idea
from .models import *
import json


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name')


class CustomUserTalentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'first_name', 'last_name', 'email')


class UserRegisterSerializer(serializers.ModelSerializer):
    """Серіалайзер реєстрації користувача"""

    email = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    first_name = serializers.CharField(min_length=1, required=False)
    last_name = serializers.CharField(min_length=1, required=False)

    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'first_name', 'last_name')

    def create(self, validated_data):
        email = validated_data.get('email')
        password = validated_data.get('password')
        first_name = validated_data.get('first_name', '')
        last_name = validated_data.get('last_name', '')
        user = CustomUser.objects.create(email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        return user


class AuthUserSerializer(serializers.ModelSerializer):
    """Серіалайзер входу в систему"""

    email = serializers.EmailField()
    password = serializers.CharField(min_length=2)

    class Meta:
        model = CustomUser
        fields = ('email', 'password')


class LogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    def validate(self, attr):
        self.token = attr['refresh_token']
        return attr

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            raise AuthenticationFailed('Invalid token')


class UpdateAccessTokenSerializer(serializers.Serializer):
    refresh_token = serializers.CharField(min_length=1)


class GoogleAuthSerializer(serializers.Serializer):
    email = serializers.EmailField()
    auth_token = serializers.CharField()


class ResetPasswordRequestEmailSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(min_length=11)

    class Meta:
        model = CustomUser
        fields = ('email', 'password')


class UserMilitaryOrVpoProfileSerializer(serializers.ModelSerializer):
    token = serializers.CharField(min_length=1, write_only=True)
    user_id = serializers.CharField(min_length=1, write_only=True)
    is_military = serializers.BooleanField(default=False)
    is_vpo = serializers.BooleanField(default=False)

    class Meta:
        model = UserProfile
        fields = ('token', 'user_id', 'is_military', 'is_vpo')

    def validate(self, attrs):
        try:
            token = attrs.get('token')
            user_id = attrs.get('user_id')
            is_military = attrs.get('is_military')
            is_vpo = attrs.get('is_vpo')

            id = force_str(urlsafe_base64_decode(user_id))
            user = CustomUser.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('Invalid token')

            profile = UserProfile.objects.get(user=user)
            profile.is_military = is_military
            profile.is_vpo = is_vpo
            profile.save()
            return profile
        except DjangoUnicodeDecodeError:
            raise AuthenticationFailed('Invalid data')


class NewPasswordSerializer(serializers.ModelSerializer):
    token = serializers.CharField(min_length=1, write_only=True)
    uid = serializers.CharField(min_length=1, write_only=True)
    password = serializers.CharField(min_length=8, write_only=True)
    password_confirm = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('token', 'uid', 'password', 'password_confirm')

    def validate(self, attrs):
        try:
            token = attrs.get('token')
            uid = attrs.get('uid')
            password = attrs.get('password')
            password_confirm = attrs.get('password_confirm')

            id = force_str(urlsafe_base64_decode(uid))
            user = CustomUser.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('Invalid token')

            if password != password_confirm:
                raise AuthenticationFailed('Passwords do not match')

            user.set_password(password)
            user.save()
            return user
        except DjangoUnicodeDecodeError:
            raise AuthenticationFailed('Invalid data')


class EmailUserVerifySerializer(serializers.ModelSerializer):
    token = serializers.CharField(min_length=1)
    user_id = serializers.CharField(min_length=1)

    class Meta:
        model = CustomUser
        fields = ('token', 'user_id')

    def validate(self, attrs):
        token = attrs.get('token')
        user_id = attrs.get('user_id')

        id = force_str(urlsafe_base64_decode(user_id))
        user = CustomUser.objects.get(id=id)

        if not PasswordResetTokenGenerator().check_token(user, token):
            raise AuthenticationFailed('Invalid token')

        return attrs


class SpecialitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Speciality
        fields = ('name',)

    # def to_internal_value(self, data):
    #     if isinstance(data, str):
    #         try:
    #             data = json.loads(data)
    #         except json.JSONDecodeError:
    #             pass
    #
    #     if isinstance(data, list):
    #         speciality_list = []
    #         for speciality_item in data:
    #             speciality_dict = {
    #                 'name': speciality_item.get('name'),
    #             }
    #             speciality_list.append(speciality_dict)
    #         data = speciality_list
    #
    #     return super().to_internal_value(data)


class StackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stack
        fields = ('name', )


class IdeaProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = '__all__'


class AvatarSerializer(serializers.ModelSerializer):
    avatar_profile = serializers.ImageField(required=False)

    class Meta:
        model = Avatar
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.avatar_profile = validated_data.get('avatar_profile', instance.avatar_profile)
        instance.save()
        return instance


class UserProfileSerializer(serializers.ModelSerializer):
    """Отримання профіля"""
    user = CustomUserSerializer(many=False, required=False)
    ideas = serializers.SerializerMethodField()
    stack = StackSerializer(many=True, required=False)
    speciality = SpecialitySerializer(many=True, required=False)
    avatar = AvatarSerializer(many=False)

    class Meta:
        model = UserProfile
        fields = '__all__'

    def get_ideas(self, obj):
        # отримуємо ідеї які створив користувач і виводимо їх в профіль
        ideas = Idea.objects.filter(user=obj.user)
        serializer = IdeaProfileSerializer(ideas, many=True)
        return serializer.data


class UserProfileCreateUpdateSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(many=False, required=False)
    stack = StackSerializer(many=True, required=False)
    speciality = SpecialitySerializer(many=True, required=False)
    avatar = AvatarSerializer(many=False, required=False)

    class Meta:
        model = UserProfile
        fields = '__all__'

    def update(self, instance, validated_data):
        specialities = validated_data.get('speciality', [])
        stack = validated_data.get('stack', [])
        stack_ids = []
        speciality_ids = []

        for stack_item in stack:
            stack_name = stack_item.get('name')
            if stack_name:
                stack_instance, _ = Stack.objects.get_or_create(name=stack_name)
                stack_ids.append(stack_instance.id)

        for speciality_item in specialities:
            speciality_name = speciality_item.get('name')
            if speciality_name:
                speciality_instance, _ = Speciality.objects.get_or_create(name=speciality_name)
                speciality_ids.append(speciality_instance.id)
                print(speciality_ids)

        instance.upload_military = validated_data.get('upload_military', instance.upload_military)
        instance.upload_vpo = validated_data.get('upload_vpo', instance.upload_vpo)
        instance.description = validated_data.get('description', instance.description)
        instance.portfolio = validated_data.get('portfolio', instance.portfolio)
        instance.is_talent = validated_data.get('is_talent', instance.is_talent)
        instance.is_military = validated_data.get('is_military', instance.is_military)
        instance.is_vpo = validated_data.get('is_vpo', instance.is_vpo)
        instance.stack.set(stack_ids)
        instance.speciality.set(speciality_ids)
        instance.save()
        return instance


class SearchUsersSerializer(serializers.ModelSerializer):
    stack = StackSerializer(many=True)

    class Meta:
        model = UserProfile
        fields = '__all__'


class AllUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'



