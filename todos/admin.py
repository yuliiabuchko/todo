from django.contrib import admin

from todos.models import *

@admin.register(Event, Statistic, Entry, Task, Status)
class TodoAdmin(admin.ModelAdmin):
    pass



# Register your models here.
