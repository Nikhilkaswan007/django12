from django.contrib import admin
from .models import Course, Lesson, Instructor, Learner, Question, Choice, Enrollment

class LessonInline(admin.StackedInline):
    model = Lesson
    extra = 5

class QuestionInline(admin.StackedInline):
    model = Question
    extra = 5

class ChoiceInline(admin.StackedInline):
    model = Choice
    extra = 4

class CourseAdmin(admin.ModelAdmin):
    inlines = [LessonInline]
    list_display = ('name', 'description')
    list_filter = ['name']
    search_fields = ['name']

class LessonAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]
    list_display = ['title']

class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]
    list_display = ('question_text', 'grade')

# Register your models here.
admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Instructor)
admin.site.register(Learner)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
admin.site.register(Enrollment)
