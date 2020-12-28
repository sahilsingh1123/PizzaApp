from django.contrib import admin
from django.urls import path, include
from pizza import views

urlpatterns = [
    path('', views.getHomePage),
    path(r'pizza/save', views.savePizzaData),
    path(r'pizza/getData', views.getPizzaData),
    path(r'pizza/delete', views.deletePizzaData),
    path(r'pizza/edit', views.editPizzaData)

]