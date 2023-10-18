from django.urls import path, include
from .routers import router
from .views import *


urlpatterns = [
    path('', include(router.urls)),
    path('talent-create/<uuid:talent_id>/', TalentsViews.as_view({'post': 'create'}), name='talent-create')
]
