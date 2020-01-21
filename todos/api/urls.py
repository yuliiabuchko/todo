from rest_framework import routers

from .views import TodoViewSet, EventViewSet, StatisticViewSet, EntryViewSet

router = routers.DefaultRouter()
router.register('todos', TodoViewSet, 'todos')
router.register('events', EventViewSet, 'events')
router.register('stats', StatisticViewSet, 'stats')
router.register('entries', EntryViewSet, 'entries')

urlpatterns = router.urls
