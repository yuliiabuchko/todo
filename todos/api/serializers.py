from rest_framework import serializers
from django.core import serializers as ser
from todos.models import *
import json


class FunctionField(serializers.Field):
    def to_representation(self, value):
        return str(value)

class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    statuses = StatusSerializer(many=True)

    is_done = FunctionField()

    class Meta:
        model = Task
        fields = '__all__'


class TaskStatusSerializer:
    statuses = StatusSerializer(many=True)

    class Meta:
        model = Task
        fields = '__all__'


class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class StatisticSerializer(serializers.ModelSerializer):
    entries = EntrySerializer(many=True)

    class Meta:
        model = Statistic
        fields = '__all__'


class WeekSerializer(serializers.ModelSerializer):
    events = serializers.SerializerMethodField()
    statuses = serializers.SerializerMethodField()
    entries = serializers.SerializerMethodField()
    
    def get_events(self, week):
        end_date = Week.saturday(week)
        qs = Event.objects.filter(owner=week.owner.id, date__gte=week.monday, date__lte=end_date)
        return EventSerializer(many=True, instance=qs).data

    def get_statuses(self, week):
        end_date = Week.saturday(week)
        qs = Status.objects.filter(day__gte=week.monday, day__lte=end_date)
        qs = [status for status in qs if status.task.owner.id==week.owner.id]
        return StatusSerializer(many=True, instance=qs).data

    def get_entries(self, week):
        end_date = Week.saturday(week)
        qs = Entry.objects.filter(date__gte=week.monday, date__lte=end_date)
        qs = [entry for entry in qs if entry.statistic.owner.id==week.owner.id]
        return EntrySerializer(many=True, instance=qs).data

    class Meta:
        model = Week
        fields = ('id', 'monday', 'owner', 'events', 'statuses', 'entries')

