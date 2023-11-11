from rest_framework.permissions import BasePermission


class UpdateAccessTokenPermission(BasePermission):
    def has_permission(self, request, view):
        if request.type == 'PUT':
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.type == 'PUT':
            if request.user.is_superuser:
                return True
            if request.user == obj.member:
                return True
