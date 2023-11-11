from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str, smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
# from src.user_idea.serializers import IdeasListSerializer
from .models import *


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
        fields = '__all__'


class StackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stack
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(many=False, required=False)
    speciality = SpecialitySerializer(many=True, required=False)
    stack = StackSerializer(many=True, required=False)

    class Meta:
        model = UserProfile
        fields = '__all__'


class SearchUsersSerializer(serializers.ModelSerializer):
    stack = StackSerializer(many=True)

    class Meta:
        model = UserProfile
        fields = '__all__'


class AllUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'



