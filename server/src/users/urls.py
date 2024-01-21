from django.urls import path
from django.conf.urls import static
from django.conf import settings
from .views import *


urlpatterns = [
    path('register/', UserRegister.as_view()),
    path('login/', UserAuthLogin.as_view()),
    path('logout/', Logout.as_view()),
    path('user-profile/', Profile.as_view()),
    path('user-profile-avatar/', UserAvatar.as_view()),
    path('stack-list/', StackList.as_view()),
    path('specilaity-list/', SpecialityList.as_view()),
    path('new-access/', UpdateAccessToken.as_view()),
    path('activate/<user_id>/<token>/', VerifyEmail.as_view(), name='email-verify'),
    path('user-verify/', VerifyUserEmail.as_view()),
    path('user-military-or-vpo/', UserMilitaryOrVpoProfile.as_view()),
    path('reset-password-email/', ResetPasswordRequestEmail.as_view()),
    path('password-reset/<user_id>/<token>/', PasswordTokenCheck.as_view(), name='reset-password-confirm'),
    path('reset-password-complete/', NewPassword.as_view()),
    path('google-auth/', GoogleAuth.as_view()),
    path('google/', google_page),
    path('github-auth/', GitHubAuth.as_view()),
    path('linkedin-auth/', LinkedInAuth.as_view()),
    path('github/', github_page),
    path('linkedin/', linkedin_page),
    # path('search/', SearchUsers.as_view()),
    path('ip/', get_ip)
]


