from rest_framework import serializers
from .models import PizzaTable

class PizzaTableSerializers(serializers.ModelSerializer):
    class Meta:
        model = PizzaTable
        fields = '__all__'
