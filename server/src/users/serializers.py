from rest_framework import serializers
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework.authtoken.models import Token
from django.utils.encoding import force_str, smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from .register import *
from .models import *


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email')


class UserRegisterSerializer(serializers.ModelSerializer):
    """Серіалайзер реєстрації користувача"""

    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(min_length=8, write_only=True)
    # password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'password')

    # def validate(self, attrs):
    #     password = attrs.get('password')
    #     password_confirm = attrs.get('password_confirm')
    #
    #     if password != password_confirm:
    #         raise AuthenticationFailed('The entered passwords do not match')
    #
    #     return attrs

    def create(self, validated_data):
        email = validated_data.get('email')
        password = validated_data.get('password')
        user = CustomUser.objects.create(email=email)
        user.set_password(password)
        user.save()
        return user


class AuthUserSerializer(serializers.ModelSerializer):
    """Серіалайзер входу в систему"""

    email = serializers.EmailField()
    password = serializers.CharField(min_length=2)

    class Meta:
        model = Token
        fields = ('email', 'password', 'created')


class GoogleAuthSerializer(serializers.Serializer):
    email = serializers.EmailField()
    auth_token = serializers.CharField()


# class GoogleAuthSerializer(serializers.Serializer):
#     """Серіалайзер входу в систему через Google"""
#
#     auth_token = serializers.CharField()
#
#     def validate_token(self, auth_token):
#         user_data = Google.validate(auth_token)
#         try:
#             user_data['sub']
#         except:
#             raise serializers.ValidationError(
#                 'Token invalid'
#             )
#
#         if user_data['aud'] != settings.GOOGLE_CLIENT_ID:
#             raise AuthenticationFailed('Error token')
#
#         user_id = user_data['sub']
#         email = user_data['email']
#         name = user_data['name']
#         provider = 'google'
#
#         return register_google_user(
#             provider=provider,
#             user_id=user_id,
#             name=name,
#             email=email
#         )


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
    speciality = SpecialitySerializer(many=True)
    stack = StackSerializer(many=True)

    class Meta:
        model = UserProfile
        fields = '__all__'


class SearchUsersSerializer(serializers.ModelSerializer):
    stack = StackSerializer(many=True)

    class Meta:
        model = UserProfile
        fields = '__all__'
