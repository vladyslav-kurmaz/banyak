from django.contrib import admin
from .models import CustomUser, UserProfile, Speciality

# admin.site.register(CustomUser)
admin.site.register(UserProfile)


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email')


@admin.register(Speciality)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id',)
