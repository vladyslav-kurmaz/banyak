from django.shortcuts import render
from django.urls import reverse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions, generics
from rest_framework.decorators import permission_classes, api_view
from rest_framework.authtoken.views import ObtainAuthToken
from django.utils.encoding import force_bytes
from django.contrib.sites.shortcuts import get_current_site
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import filters
from datetime import datetime, timedelta
from .models import *
from .serializers import *
from .services.google_auth import check_google_auth
from .utils import Utils
from .token import token_generator
from .services import github_auth
import jwt


class UserRegister(generics.GenericAPIView):
    """Реєстрація користувача"""

    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        request_body=UserRegisterSerializer,
        responses={
            status.HTTP_201_CREATED: openapi.Response(description='User registered successfully'),
            status.HTTP_400_BAD_REQUEST: openapi.Response(description='Invalid input data'),
        }
    )
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        #  Activate email

        token = token_generator.make_token(user)
        user_id = urlsafe_base64_encode(force_bytes(user.pk))

        current_site = get_current_site(request=request).domain
        relative_link = reverse('email-verify', kwargs={'token': token, 'user_id': user_id})
        absolute_url = 'http://' + current_site + relative_link

        email_body = f'Activation email {absolute_url}'

        data = {
            'email_subject': 'Verify',
            'current_site': current_site,
            'email_body': email_body,
            'to_email': user.email,
            'absolute_url': absolute_url
        }
        Utils.send_mail(data)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserAuthLogin(ObtainAuthToken):
    """Логін"""

    serializer_class = AuthUserSerializer

    @swagger_auto_schema(
        request_body=AuthUserSerializer,
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Login successful',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'token': openapi.Schema(type=openapi.TYPE_STRING)
                    }
                )
            ),
            status.HTTP_400_BAD_REQUEST: openapi.Response(description='Invalid input data'),
            status.HTTP_404_NOT_FOUND: openapi.Response(description='User not found'),
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        email = serializer.data['email']

        try:
            user = CustomUser.objects.get(email=email)
            user_profile = UserProfile.objects.get(user=user)
            user_avatar = user_profile.avatar.url if user_profile.avatar else None
            payload = {
                'user_email': user_profile.user.email,
                'user_first_name': user.first_name,
                'user_last_name': user.last_name,
                'user_description': user_profile.description,
                'user_is_talent': user_profile.is_talent,
                'user_avatar': user_avatar,
                'exp': datetime.utcnow() + timedelta(minutes=2)
            }
            access_token = jwt.encode(payload, key='secret key', algorithm='HS256')
            return Response({
                'access_token': access_token
            }, status=status.HTTP_201_CREATED)
        except CustomUser.DoesNotExist:
            return Response({'message': 'Invalid data'}, status=status.HTTP_404_NOT_FOUND)

        # token, created = Token.objects.get_or_create(user=user)
        #
        # return Response({'token': token.key})


class TokenDestroy(generics.DestroyAPIView):
    """Вихід з системи"""

    queryset = Token.objects.all()

    @swagger_auto_schema(
        responses={
            status.HTTP_204_NO_CONTENT: openapi.Response(description='Token invalidated and user logged out'),
            status.HTTP_404_NOT_FOUND: openapi.Response(description='Token not found'),
        },
        manual_parameters=[
            openapi.Parameter('Authorization', openapi.IN_HEADER, description="Bearer token", type=openapi.TYPE_STRING)
        ]
    )
    def delete(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(user=self.request.user)
        except Token.DoesNotExist:
            return Response('Token invalid', status=status.HTTP_404_NOT_FOUND)

        token.delete()
        return Response({'message': 'Delete'})


class Profile(APIView):
    """Профіль користувача"""
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Get a list of published ideas",
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Successful',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'id': openapi.Schema(type=openapi.TYPE_INTEGER),
                            'user': openapi.Schema(type=openapi.TYPE_OBJECT),
                            'description': openapi.Schema(type=openapi.TYPE_STRING),
                            'speciality': openapi.Schema(type=openapi.TYPE_OBJECT),
                            'stack': openapi.Schema(type=openapi.TYPE_OBJECT)
                        }
                    )
                )
            ),
            status.HTTP_404_NOT_FOUND: openapi.Response(
                description='Profile not found'
            )
        }
    )
    def get(self, request):
        current_user = request.user
        token = request.META.get('HTTP_AUTHORIZATION', None)
        if not token:
            return Response({'message': 'error'})

        try:
            user_profile = UserProfile.objects.get(user=current_user)
            serializer = self.serializer_class(user_profile, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'message': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(
        request_body=UserProfileSerializer,
        responses={
            status.HTTP_201_CREATED: openapi.Response(
                description='Profile update'
            ),
            status.HTTP_404_NOT_FOUND: openapi.Response(
                description='Profile not found'
            ),
            status.HTTP_400_BAD_REQUEST: openapi.Response(
                description='Error'
            )
        }
    )
    def post(self, request):
        current_user = request.user
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save(user=current_user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        current_user = request.user
        user_profile = UserProfile.objects.get(user=current_user)
        serializer = self.serializer_class(user_profile, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        current_user = request.user
        try:
            user_profile = Profile.objects.get(user=current_user)
            user_profile.delete()
            user_email = current_user.email
            custom_user = CustomUser.objects.get(email=user_email)
            custom_user.is_active = False
            custom_user.save()
            return Response({'message': f'Profile {current_user} delete'}, status=status.HTTP_204_NO_CONTENT)
        except Profile.DoesNotExist:
            return Response({'message': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)


class ResetPasswordRequestEmail(generics.GenericAPIView):
    """Відправка email на пошту з посиланням на скидання паролю"""

    serializer_class = ResetPasswordRequestEmailSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = request.data['email']

        if CustomUser.objects.filter(user=self.request.user).exists():
            user = CustomUser.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            relative_link = reverse('reset-password-confirm', kwargs={'token': token, 'uid': uid})
            absolute_url = 'http://' + current_site + relative_link
            email_body = f'Hello, Use link below to reset your password {absolute_url}'
            data = {
                'email_body': email_body,
                'to_email': user.email,
                'absolute_url': absolute_url,
                'emai_subject': 'Reset password'
            }

            Utils.send_mail(data)
            return Response({'message': 'Check email'}, status=status.HTTP_200_OK)


class PasswordTokenCheck(generics.GenericAPIView):
    """Перевірка токена"""
    def get(self, request, user_id, token):
        try:
            id = smart_str(urlsafe_base64_decode(user_id))
            user = CustomUser.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token not found'}, status=status.HTTP_404_NOT_FOUND)

            return Response({'user_id': user_id, 'token': token}, status=status.HTTP_200_OK)
        except DjangoUnicodeDecodeError:
            raise AuthenticationFailed('Invalid data')


class NewPassword(generics.GenericAPIView):
    """Збереження нового пароля"""
    serializer_class = NewPasswordSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'message': 'Password reset'}, status=status.HTTP_201_CREATED)


class VerifyEmail(generics.GenericAPIView):

    def get(self, request, user_id, token):
        try:
            id = smart_str(urlsafe_base64_decode(user_id))
            user = CustomUser.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Invalid token'})

            return Response({'user_id': user_id, 'token': token}, status=status.HTTP_200_OK)
        except DjangoUnicodeDecodeError:
            pass


class VerifyUserEmail(generics.GenericAPIView):
    """Активація email"""

    serializer_class = EmailUserVerifySerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_id = serializer.validated_data['user_id']
        token = serializer.validated_data['token']
        id = force_str(urlsafe_base64_decode(user_id))
        user = CustomUser.objects.get(id=id)

        if not user:
            user.is_verify = True
            user.save()
            return Response({'message': 'Account has been verified'}, status=status.HTTP_200_OK)

        # verify_token = CustomUserVerify.objects.create(token=token)

        return Response({'message': 'Invalid'}, status=status.HTTP_400_BAD_REQUEST)


class GoogleAuth(APIView):
    serializer_class = GoogleAuthSerializer

    def post(self, request):
        google_data = self.serializer_class(data=request.data)
        if google_data.is_valid():
            token = check_google_auth(google_data.data)
            return Response(token)
        else:
            return AuthenticationFailed('Invalid data google', code=403)


class GitHubAuth(APIView):
    def get(self, request):
        code = request.data.get('code')
        print('code views:', code)
        token = github_auth.auth_github(request.query_params.get('code'))
        return Response(token)


class LinkedInAuth(APIView):
    def get(self):
        pass


class SearchUsers(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = SearchUsersSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['stack__name']


def google_page(request):
    return render(request, 'google.html')


def github_page(request):
    return render(request, 'github.html')


def linkedin_page(request):
    return render(request, 'linkedin.html')


# @api_view(['POST'])
# def google_auth(request):
#     google_data = GoogleAuthSerializer()
#     if google_data.is_valid():
#         token = check_google_auth(google_data)
#         return Response(token)
#     else:
#         return AuthenticationFailed('Invalid google data', code=403)


# class GoogleAuth(generics.GenericAPIView):
#     serializer_class = GoogleAuthSerializer
#
#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         data = serializer.validated_data['auth_token']
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#
# @api_view(['GET', 'POST'])
# def get_profile(request):
#     user = request.user
#     try:
#         user_profile = UserProfile.objects.get(user=user)
#     except UserProfile.DoesNotExist:
#         user_profile = UserProfile.objects.create(user=user)
#
#     serializer = UserProfileSerializer(user_profile, many=False)
#     return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def private(request):
    if request.user.is_authenticated:
        return Response({'message': 'error'})
    users = CustomUser.objects.all()
    serializer = AllUsersSerializer(users, many=True)
    return Response(serializer.data)

