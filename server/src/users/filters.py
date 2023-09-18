import django_filters
from .models import UserProfile
from .serializers import SpecialitySerializer


class FilterTalents(django_filters.FilterSet):
    speciality = SpecialitySerializer

    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'speciality')
