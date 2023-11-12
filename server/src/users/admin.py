from django.contrib import admin
from .models import CustomUser, UserProfile, Speciality, Stack

# admin.site.register(CustomUser)
# admin.site.register(UserProfile)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user')


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email')


@admin.register(Speciality)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id',)


admin.site.register(Stack)
