from django.urls import path

from . import views

urlpatterns = [
	path('task-list/', views.taskList, name="task-list"),
	path('task-create/', views.taskCreate, name="task-create"),
]
