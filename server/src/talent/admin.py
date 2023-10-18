from django.contrib import admin
from .models import InviteTalentIdea


# admin.site.register(InviteTalentIdea)


@admin.register(InviteTalentIdea)
class InviteAdmin(admin.ModelAdmin):
    list_display = ('id',)

