from django.contrib import admin

from todos.models import Event, Statistic, Entry

@admin.register(Event, Statistic, Entry)
class TodoAdmin(admin.ModelAdmin):
    pass



# Register your models here.
