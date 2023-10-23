from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('talent', TalentsViews, basename='talents')
# router.register('talent-create', TalentsViews, basename='talent-create')
