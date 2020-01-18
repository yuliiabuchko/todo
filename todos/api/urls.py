from rest_framework import routers

from .views import TaskViewSet

router = routers.DefaultRouter()
router.register('todos', TaskViewSet, 'todos')

urlpatterns = router.urls
