from rest_framework import viewsets, permissions, views
from rest_framework.response import Response
from knox import auth

from todos.models import Entry, Week, Status
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

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class StatisticViewSet(viewsets.ModelViewSet):
    serializer_class = StatisticSerializer
    permission_classes = [permissions.IsAuthenticated, ]
    authentication_classes = [auth.TokenAuthentication, ]

    def get_queryset(self):
        return self.request.user.statistics.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class EntryViewSet(viewsets.ModelViewSet):
    serializer_class = EntrySerializer
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = Entry.objects.all()


class StatusViewSet(viewsets.ModelViewSet):
    serializer_class = StatusSerializer
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = Status.objects.all()


class WeekViewSet(viewsets.ViewSet):
    serializer_class = WeekSerializer
    permission_classes = [permissions.IsAuthenticated, ]
    authentication_classes = [auth.TokenAuthentication, ]

    def list(self, request):
        user = self.request.user
        monday = date.fromisoformat(request.query_params.get("monday"))
        week = Week(owner=user, monday=monday)
        return Response(WeekSerializer(many=False, instance=week).data)
        
    @classmethod
    def get_extra_actions(cls):
        return []
