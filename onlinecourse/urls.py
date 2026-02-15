from django.contrib import admin
from django.urls import path
from . import views

app_name = 'onlinecourse'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.CourseListView.as_view(), name='index'),
    path('course/<int:pk>/', views.CourseDetailView.as_view(), name='course_details'),
    path('submit/<int:course_id>/', views.submit, name='submit'),
    path('course/<int:course_id>/submission/<int:submission_id>/result/', views.show_exam_result, name='show_exam_result'),
]
