from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework.views import APIView
from rest_framework import status, permissions, generics, views
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.utils.encoding import force_bytes
from django.contrib.sites.shortcuts import get_current_site
from rest_framework import filters
from .serializers import *
from .services.google_auth import check_google_auth
from .authentication import JWTAuthentication
from .utils import Utils
from .token import token_generator
from .services import github_auth
from .documentation.users_schema_setting import users_doc
from .documentation.profile_schema_setting import profile_doc
from ..decorators.decorators import swagger_decorator


@swagger_decorator(['post'], 'Users', users_doc)
class UserRegister(generics.GenericAPIView):
    """Реєстрація користувача"""

    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        print('Register')
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data.get('email')
        user = CustomUser.objects.filter(email=email)
        if user:
            return Response({'message': 'Such a user exists'}, status=status.HTTP_409_CONFLICT)

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


@swagger_decorator(['post'], 'Users', users_doc)
class UserAuthLogin(views.APIView):
    """Логін"""

    serializer_class = AuthUserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        print('Login')
        print(request.data)
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        email = serializer.data['email']
        password = serializer.data['password']

        user = CustomUser.objects.filter(email=email).first()
        if not user:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        if not user.check_password(password):
            return Response({'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

        access_token = JWTAuthentication.create_access(user)
        refresh_token = JWTAuthentication.create_refresh(user)
        return Response({'access_token': access_token, 'refresh_token': refresh_token})


class Logout(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        user = request.user
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.data['refresh_token']
        JWTAuthentication.logout(user, token)
        return Response({'message': f'User {user} logout'}, status=status.HTTP_204_NO_CONTENT)


@swagger_decorator(['put'], 'Users', users_doc)
class UpdateAccessToken(views.APIView):
    def put(self, request):
        serializer = UpdateAccessTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.data['refresh_token']
        new_access_token = JWTAuthentication.update_access_token(token)
        return Response({'access_token': new_access_token}, status=status.HTTP_200_OK)


class UserAvatar(APIView):
    """Створення оновлення аватарки користувача"""
    serializer_class = AvatarSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        current_user = request.user
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save(user=current_user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        current_user = request.user
        avatar = Avatar.objects.get(user=current_user)
        serializer = self.serializer_class(avatar, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


@swagger_decorator(['get', 'post', 'put'], 'Users', profile_doc)
class Profile(APIView):
    """Профіль користувача"""
    serializer_class = UserProfileCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        current_user = request.user
        try:
            user_profile = UserProfile.objects.get(user=current_user)
            serializer = UserProfileSerializer(user_profile, many=False)
            print(request.data)
            print('data', serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'message': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        current_user = request.user
        print('request data', request.data)
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            avatar = Avatar.objects.create(user=current_user)
            new_profile = serializer.save(user=current_user)
            new_profile.avatar = avatar
            new_profile.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        current_user = request.user
        user_profile = UserProfile.objects.get(user=current_user)
        serializer = self.serializer_class(user_profile, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
        # context = {}
        # path = None
        #
        # if serializer.is_valid():
        #     upd_profile = serializer.save()
        #     if not (upd_profile.is_military or upd_profile.is_vpo):
        #         # чи є користувач військовим або впо
        #         if upd_profile.upload_military:
        #             # чи є користувач військовим
        #             path = upd_profile.upload_military.path
        #             context.update({
        #                 'upload': upd_profile.upload_military,
        #                 'url': verify(user=current_user, request=request)
        #             })
        #         elif upd_profile.upload_vpo:
        #             # чи є користувач впо
        #             path = upd_profile.upload_vpo.path
        #             context.update({
        #                 'upload': upd_profile.upload_vpo,
        #                 'url': verify(user=current_user, request=request)
        #             })
        #
        #         email = current_user.email
        #         template_letter = render_to_string('email.html', context)
        #         data_message = strip_tags(template_letter)
        #         subject = 'Verify Banyak'
        #         message = EmailMultiAlternatives(
        #             subject=subject,
        #             body=data_message,
        #             from_email=email,
        #             to=[settings.EMAIL_HOST_USER]
        #         )
        #         message.attach_file(path, 'image/jpg')
        #         message.attach_alternative(template_letter, 'text/html')
        #         message.send()
        #     user_profile.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)

        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    serializer_class = ResetPasswordRequestEmailSerializer

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
        return Response({'message': 'Password reset'}, status=status.HTTP_200_OK)


class VerifyEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordRequestEmailSerializer

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
        id = force_str(urlsafe_base64_decode(user_id))
        user = CustomUser.objects.get(id=id)

        if not user:
            user.is_verify = True
            user.save()
            return Response({'message': 'Account has been verified'}, status=status.HTTP_200_OK)

        return Response({'message': 'Invalid'}, status=status.HTTP_400_BAD_REQUEST)


class UserMilitaryOrVpoProfile(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserMilitaryOrVpoProfileSerializer

    def put(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class StackList(generics.ListAPIView):
    queryset = Stack.objects.all()
    serializer_class = StackSerializer


class SpecialityList(generics.ListAPIView):
    queryset = Speciality.objects.all()
    serializer_class = SpecialitySerializer


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
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SearchUsersSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['stack__name']


def google_page(request):
    return render(request, 'google.html')


def github_page(request):
    return render(request, 'github.html')


def linkedin_page(request):
    return render(request, 'linkedin.html')


@api_view(['GET'])
def get_ip(request):
    pass
    # address = '22.24.124.253'
    # db_path = os.path.join(settings.BASE_DIR, 'users/db/GeoLite2-Country.mmdb')
    # # print(db)
    # db = database.Reader(db_path)
    # res = db.country(ip_address=address)
    # print(res)
    # return Response({'message': True})


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

