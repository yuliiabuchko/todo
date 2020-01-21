from django.db import models
from django.contrib.auth.models import User
from datetime import date


class Task(models.Model):
    task = models.CharField(max_length=255)
    owner = models.ForeignKey(
        User, related_name="todos", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    # TODO when change to DateField error in frontend occurs
    # created_at = models.DateField(auto_now=False, auto_now_add=False, default=datetime.date.today)
    start_day = models.DateField(auto_now_add=False, auto_now=False, null=True)

    def __str__(self):
        return self.task


class Statistic(models.Model):
    owner = models.ForeignKey(
        User, related_name="statistics", on_delete=models.CASCADE, null=False
    )
    name = models.CharField(max_length=255)
    HOURS = "h"
    MINUTES = "min"
    PIECES = "pcs"
    UNITS_CHOISES = [
        (HOURS, "HOURS"),
        (PIECES, "PIECES"),
        (MINUTES, "MINUTES")
    ]
    unit = models.CharField(
        choices=UNITS_CHOISES,
        default=HOURS,
        max_length=3
    )

    def __str__(self):
        return self.name


class Entry(models.Model):
    statistic = models.ForeignKey(
        Statistic, related_name="entries", on_delete=models.CASCADE, null=False
    )
    value = models.FloatField()
    date = models.DateField(
        auto_now=False, auto_now_add=False, default=date.today
    )

    def __float__(self):
        return self.value

    def __int__(self):
        return float(self.__float__())


class Event(models.Model):
    owner = models.ForeignKey(
        User, related_name="events", on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255 * 10)
    date = models.DateField(
        auto_now=False, auto_now_add=False, default=date.today
    )

    def __str__(self):
        return self.name


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
