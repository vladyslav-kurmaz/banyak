from src.users.models import UserProfile
from src.users.serializers import SpecialitySerializer
import django_filters


class FilterTalentsBySpeciality(django_filters.FilterSet):
    speciality = SpecialitySerializer

    class Meta:
        model = UserProfile
        fields = ('speciality',)
