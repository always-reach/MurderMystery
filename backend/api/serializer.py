from rest_framework import serializers
from django.utils.datetime_safe import datetime

from .models import User, Game


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        password = validated_data.pop("password", None)
        if password is None:
            return TypeError("パスワードが設定されていません")
        instance.set_password(password)
        instance.last_login = datetime.now()
        instance.save()
        return instance

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        if password is not None:
            instance.set_password(password)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = "__all__"
