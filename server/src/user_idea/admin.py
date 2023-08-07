from django.contrib import admin
from .models import *


@admin.register(Idea)
class IdeaAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    prepopulated_fields = {'slug': ('title',)}


admin.site.register(Specialization)

admin.site.register(JoinIdea)

