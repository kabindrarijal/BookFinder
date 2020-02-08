
# backend/urls.py

from django.contrib import admin
from django.urls import path, include               # add this
from rest_framework import routers                    # add this
# from sympy.codegen.cnodes import static
from todo import views
from todo.views import FacebookLogin # add this

router = routers.DefaultRouter()                      # add this
router.register(r'todos', views.TodoView, 'todo')     # add this
        
urlpatterns = [
    path('admin/',admin.site.urls),
    path('api/', include(router.urls)),
    path('accounts/',include('allauth.urls')),
    path('rest-auth', include('rest_auth.urls')),
    path('rest-auth/registration', include('rest_auth.registration.urls')),

]
