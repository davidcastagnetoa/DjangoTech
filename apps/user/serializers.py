from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

# * Conviert Datos Complejos a Formato Simple y viceversa
# * Puede tomar los datos de un modelo de la DB y convertirlos
# * en un formato simple (json, xml, csv, etc.)


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User  # - Especifica que este serializador se usa para el modelo de usuario
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'get_full_name',
            'get_short_name'
        )
