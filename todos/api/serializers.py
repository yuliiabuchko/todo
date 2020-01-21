from rest_framework import serializers

from todos.models import Todo, Entry, Event, Statistic


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
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
