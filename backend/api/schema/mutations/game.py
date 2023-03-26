import graphene
from graphene_django import DjangoObjectType
from graphene_django.rest_framework.mutation import SerializerMutation

from api.models import Game
from api.serializer import GameSerializer


class GameType(DjangoObjectType):
    class Meta:
        model = Game
        fields = "__all__"


class CreateGameMutation(SerializerMutation):
    class Meta:
        serializer_class = GameSerializer
        model_operations = ['create', 'update']
        lookup_field = "id"

    game = graphene.Field(GameType)

    @classmethod
    def perform_mutate(cls, serializer, info):
        game = serializer.save()
        return CreateGameMutation(game=game)


class UpdateGameMutation(SerializerMutation):
    class Meta:
        serializer_class = GameSerializer
        model_operations = ['update']
        lookup_field = "id"

    game = graphene.Field(GameType)

    @classmethod
    def perform_mutate(cls, serializer, info):
        game = serializer.save()
        return CreateGameMutation(game=game)


class Mutation(graphene.ObjectType):
    create_game = CreateGameMutation.Field()
    update_game = UpdateGameMutation.Field()
