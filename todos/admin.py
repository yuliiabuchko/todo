from django.contrib import admin

from todos.models import *


@admin.register(Event, Statistic, Entry, Task, Status, Week)
class TodoAdmin(admin.ModelAdmin):
    pass
