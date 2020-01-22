from rest_framework import viewsets, permissions
from knox import auth

from todos.models import Entry, Week
from .serializers import *


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, ]
    authentication_classes = [auth.TokenAuthentication, ]

    def get_queryset(self):
        return self.request.user.todos.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated, ]
    authentication_classes = [auth.TokenAuthentication, ]

    def get_queryset(self):
        return self.request.user.events.all()


class StatisticViewSet(viewsets.ModelViewSet):
    serializer_class = StatisticSerializer
    permission_classes = [permissions.IsAuthenticated, ]
    authentication_classes = [auth.TokenAuthentication, ]

    def get_queryset(self):
        return self.request.user.statistics.all()


class EntryViewSet(viewsets.ModelViewSet):
    serializer_class = EntrySerializer
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = Entry.objects.all()


class WeekViewSet(viewsets.ModelViewSet):
    serializer_class = WeekSerializer
    permission_classes = [permissions.IsAuthenticated, ]
    authentication_classes = [auth.TokenAuthentication, ]
    # def get_queryset(self):
    #     queryset = self.request.user.weeks.all()
    queryset = Week.objects.all()
