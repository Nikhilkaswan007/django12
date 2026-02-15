from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import Course, Lesson, Enrollment, Question, Choice, Submission
from django.views.generic import ListView, DetailView
from django.contrib.auth.mixins import LoginRequiredMixin

class CourseListView(ListView):
    model = Course
    template_name = 'onlinecourse/course_list.html'

class CourseDetailView(DetailView):
    model = Course
    template_name = 'onlinecourse/course_details_bootstrap.html'

def submit(request, course_id):
    if request.method == 'POST':
        course = get_object_or_404(Course, pk=course_id)
        # Assuming the user is a Learner and is logged in
        try:
            learner = request.user.learner
        except AttributeError:
            # Handle cases where user is not a learner
            # This might involve creating a Learner object or redirecting
            # For simplicity, we'll assume the Learner object exists
            # In a real app, you'd want more robust handling
            pass
            
        enrollment, created = Enrollment.objects.get_or_create(course=course, learner=learner)
        submission = Submission(enrollment=enrollment)
        submission.save()

        total_score = 0
        
        # Get all selected choice IDs from the POST data
        selected_choice_ids = []
        for key, value in request.POST.items():
            if key.startswith('choice_'):
                selected_choice_ids.append(value)

        # Add selected choices to the submission
        submission.choices.add(*selected_choice_ids)
        
        # Calculate score
        for choice_id in selected_choice_ids:
            selected_choice = get_object_or_404(Choice, pk=choice_id)
            if selected_choice.is_correct:
                total_score += selected_choice.question.grade
        
        # The total_score is not saved on the Submission model in this implementation
        # It's calculated dynamically in the result view.

        return HttpResponseRedirect(reverse('onlinecourse:show_exam_result', args=(course.id, submission.id)))

def show_exam_result(request, course_id, submission_id):
    submission = get_object_or_404(Submission, pk=submission_id)
    total_score = 0
    
    # All choices submitted by the user
    submitted_choices = submission.choices.all()
    
    # All questions for the course
    course = get_object_or_404(Course, pk=course_id)
    all_questions = Question.objects.filter(lesson__course=course)
    
    results = []
    
    for question in all_questions:
        user_choices = submitted_choices.filter(question=question)
        correct_choices = Choice.objects.filter(question=question, is_correct=True)
        
        # Check if the user's selected choices for this question are correct
        is_question_correct = set(user_choices) == set(correct_choices)
        
        if is_question_correct:
            total_score += question.grade

        results.append({
            'question': question,
            'user_choices': user_choices,
            'correct_choices': correct_choices,
            'is_correct': is_question_correct
        })

    context = {
        'submission': submission,
        'total_score': total_score,
        'results': results,
        'course': course
    }
    return render(request, 'onlinecourse/exam_result.html', context)
