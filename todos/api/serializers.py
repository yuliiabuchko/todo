from rest_framework import serializers
from django.core import serializers as ser
from todos.models import *
import json


class TaskSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

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


class TaskInWeekSerializer(serializers.ModelSerializer):
    statuses = serializers.SerializerMethodField()

    def get_statuses(self, task):
        qs = Status.objects.filter(task=task, day__gte=self.context['start'], day__lte=self.context['end'])
        return StatusSerializer(many=True, instance=qs).data

    class Meta:
        model = Task
        fields = ('id', 'task', 'is_done', 'statuses')


class StatisticInWeekSerializer(serializers.ModelSerializer):
    entries = serializers.SerializerMethodField()

    def get_entries(self, statistic):
        qs = Entry.objects.filter(statistic=statistic, date__gte=self.context['start'], date__lte=self.context['end'])
        return EntrySerializer(many=True, instance=qs).data

    class Meta:
        model = Statistic
        fields = ('id', 'name', 'unit', 'entries')


class WeekSerializer(serializers.ModelSerializer):
    events = serializers.SerializerMethodField()
    tasks = serializers.SerializerMethodField()
    statistics = serializers.SerializerMethodField()

    def saturday(monday):
        return monday + timedelta(days=6)

    def get_events(self, week):
        end_date = WeekSerializer.saturday(week.monday)
        qs = Event.objects.filter(owner=week.owner.id, date__gte=week.monday, date__lte=end_date)
        return EventSerializer(many=True, instance=qs).data

    def task_in_week(task, week):
        start = week.monday
        end = WeekSerializer.saturday(week.monday)

        return (start <= task.start_day <= end) or (start <= task.last_date <= end) or (start >= task.start_day and task.last_date >= end)

    def get_tasks(self, week):
        end_date = WeekSerializer.saturday(week.monday)
        qs = Task.objects.filter(owner=week.owner.id)
        qs = [task for task in qs if WeekSerializer.task_in_week(task, week)]
        context = {'start':week.monday, 'end':end_date}
        serializer = TaskInWeekSerializer(context=context, many=True, instance=qs)
        return serializer.data

    def get_statistics(self, week):
        end_date = WeekSerializer.saturday(week.monday)
        qs = Statistic.objects.filter(owner=week.owner.id)
        context = {'start':week.monday, 'end':end_date}
        serializer = StatisticInWeekSerializer(context=context, many=True, instance=qs)
        return serializer.data
       
    class Meta:
        model = Week
        fields = ('monday', 'events', 'tasks', 'statistics')

