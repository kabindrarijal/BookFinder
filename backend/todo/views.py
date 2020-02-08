
# todo/views.py

from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import TodoSerializer      # add this
from .models import Todo
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView


# add this
        
class TodoView(viewsets.ModelViewSet):       # add this
  serializer_class = TodoSerializer          # add this
  queryset = Todo.objects.all()              # add this

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter