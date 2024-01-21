from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import *

router = DefaultRouter()
router.register('talent', TalentsViews, basename='talents')
# router.register('talent-create', TalentsViews, basename='talent-cearte')
