from django.urls import path

import views

urlpatterns = [
	path('task-list/', views.taskList, name="task-list"),
]
