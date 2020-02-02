from rest_framework import routers

from .views import *

router = routers.DefaultRouter()
router.register('todos', TaskViewSet, 'todos')
router.register('events', EventViewSet, 'events')
router.register('stats', StatisticViewSet, 'stats')
router.register('entries', EntryViewSet, 'entries')
router.register('weeks', WeekViewSet, 'weeks')
router.register('statuses', StatusViewSet, 'statuses')

urlpatterns = router.urls
