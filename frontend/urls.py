from django.urls import path

from .views import index, TodoDetailView, WeekDetailView

urlpatterns = [
    path('', index),
    path('weeks', index),
    path('login', index),
    path('register', index),
    path('edit/<int:pk>', TodoDetailView.as_view()),
    path('delete/<int:pk>', TodoDetailView.as_view()),
]
