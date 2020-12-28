from django.db import models

# Create your models here.

class PizzaTable(models.Model):
    type = models.CharField(max_length=64)
    size = models.CharField(max_length=64)
    toppings = models.TextField()

    def __str__(self):
        return self.type
