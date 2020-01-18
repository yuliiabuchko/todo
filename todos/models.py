from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    task = models.CharField(max_length=255)
    owner = models.ForeignKey(
        User, related_name="todos", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.task


class Status(models.Model):
    SELECTED = 'S'
    HALF_DONE = 'H'
    DONE = 'D'
    MOVED = 'M'
    CANCELED = 'C'

    DAY_PROPERTY = (
        (SELECTED, 'Selected'),
        (HALF_DONE, 'Half-Done'),
        (DONE, 'Done'),
        (MOVED, 'Moved'),
        (CANCELED, 'Canceled'),
    )

    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    day = models.DateField()
    result = models.CharField(max_length=1, choices=DAY_PROPERTY)

    def _str_(self):
        return self.task

    class Meta:
        unique_together = (("task", "day"),)
