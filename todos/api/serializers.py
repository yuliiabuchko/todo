from rest_framework import serializers

from todos.models import Task, Status


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'


class TaskStatusSerializer:
    statuses = StatusSerializer(many=True)

    class Meta:
        model = Task
        fields = '__all__'
