from rest_framework.views import status
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Value, IntegerField, Case, When
from src.users.models import UserProfile
from src.user_idea.models import Idea
from .serializers import ListTalentSerializer, InviteTalentIdeaSerializer, AcceptInviteTalentIdeaSerializer
from .models import InviteTalentIdea
from .paginate import CustomPaginate


class TalentsViews(viewsets.ModelViewSet):
    """
    - GET: Retrieves a list of talents.
    - GET <slug>: Retrieves detailed information about a talent using their ID.
    - POST: Allows an author of an idea to send a request to a talent for participation in a project.
    - GET list_invite_user: Retrieves a list of talent invitations for the authenticated user.
    - PATCH accept_invite: Accepts a talent invitation by updating the 'accept_invite' field.
    - POST talent_send_invite_idea: Allows a talent to send an invitation for an idea.

    Permissions:
    - GET: Publicly accessible.
    - POST, GET list_invite_user, PATCH, POST talent_send_invite_idea: Requires authentication.

    Note:
    - This class uses various serializers and models for talents and talent invitations.
    - The 'accept_invite' field can be updated partially using the PATCH request.
    - The 'talent_send_invite_idea' action allows talents to send invitations to participate in ideas.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = ListTalentSerializer
    pagination_class = CustomPaginate

    def get_queryset(self):
        talents = UserProfile.objects.filter(is_talent=True)
        return talents

    def get_owner_profile(self):
        owner = UserProfile.objects.all()
        return owner

    def invites(self):
        invite = InviteTalentIdea.objects.all()
        return invite

    def list(self, request, *args, **kwargs):
        talents = self.get_queryset()

        page = self.paginate_queryset(talents)
        if page is not None:
            serializer = self.serializer_class(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.serializer_class(talents, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        print(kwargs)
        talent_slug = kwargs.get('pk')
        try:
            talent = self.get_queryset().get(slug=talent_slug)
            serializer = self.serializer_class(talent, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'message': 'Talent not found'}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request, *args, **kwargs):
        talent_slug = kwargs.get('pk')
        owner = request.user
        try:
            talent = self.get_queryset().get(slug=talent_slug)
            serializer = InviteTalentIdeaSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            invite_talent = serializer.save()
            invite_talent.owner = owner
            invite_talent.talent = talent
            invite_talent.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except UserProfile.DoesNotExist:
            return Response({'message': 'Talent not found'})

    @action(methods=['GET'], detail=False, url_path='list-invites-talent')
    def list_invite_talent(self, request):
        """List of invitations for talent"""
        talent = request.user
        try:
            talent_profile = self.get_queryset().get(user=talent)
            invite = self.invites().filter(talent=talent_profile)
            serializer = InviteTalentIdeaSerializer(invite, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'message': 'Talent not found'})

    @action(methods=['POST'], detail=False)
    def talent_send_invite_idea(self, request, *args, **kwargs):
        """Talent sends an invitation to join the idea"""
        idea_id = kwargs.get('pk')
        talent = request.user
        try:
            idea = Idea.objects.get(id=idea_id)
            # idea = self.invites().get(id=idea_id)
            owner_idea = idea.owner
            serializer = InviteTalentIdeaSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            talent_invite = serializer.save()
            talent_invite.owner = owner_idea
            talent_invite.talent = talent
            talent_invite.save()
        except InviteTalentIdea.DoesNotExist:
            return Response({'message': 'Idea not found'})

    @action(methods=['GET'], detail=False, url_path='list-invites-owner')
    def list_invite_owner_idea(self, request):
        """List of invitations for owner"""
        owner = request.user
        try:
            owner_profile = self.get_queryset().get(user=owner)
            invite = self.invites().filter(owner=owner_profile)
            serializer = InviteTalentIdeaSerializer(invite, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'message': 'Profile not found'})

    @action(methods=['POST'], detail=True, url_path='send-invite-idea-talent')
    def owner_send_invite_talent(self, request, *args, **kwargs):
        """The client sends an invitation for talent to join the idea"""
        owner = request.user
        talent_id = kwargs.get('pk')
        idea_id = request.data.get('idea')
        try:
            owner_profile = self.get_owner_profile().get(user=owner)
            talent_profile = self.get_queryset().get(id=talent_id)
            idea = Idea.objects.get(id=idea_id)
            serializer = InviteTalentIdeaSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            invite = serializer.save()
            invite.owner = owner_profile
            invite.talent = talent_profile
            invite.idea = idea
            invite.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

            # owner_profile = self.get_owner_profile().get(user=owner)
            # talent_profile = UserProfile.objects.get(
            #     pk=talent_profile)  # Retrieve the talent's UserProfile instance by 'pk'
            # idea = Idea.objects.get(id=idea_id)
            #
            # serializer = InviteTalentIdeaSerializer(data=request.data)
            # serializer.is_valid(raise_exception=True)
            # invite = serializer.save(owner=owner_profile, talent=talent_profile, idea=idea)
            #
            # return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'message': str(e)})
        # except UserProfile.DoesNotExist:
        #     return Response({'message': 'Profile not found'})

    @action(methods=['PATCH'], detail=True)
    def accept_talent_invite(self, request, *args, **kwargs):
        invite_id = kwargs.get('invite_id')
        talent = request.user
        try:
            talent_profile = self.get_queryset().get(user=talent)
            invite = self.invites().get(id=invite_id, talent=talent_profile)
            serializer = AcceptInviteTalentIdeaSerializer(invite, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except InviteTalentIdeaSerializer.DoesNotExist:
            return Response({'message': 'Invite not found'})
