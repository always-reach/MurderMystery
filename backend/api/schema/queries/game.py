import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError

from api.models import Game


class GameType(DjangoObjectType):
    class Meta:
        model = Game
        fields = '__all__'


class Query(graphene.ObjectType):
    game_by_id = graphene.Field(GameType, id=graphene.Int(required=True))


    @staticmethod
    def resolve_game_by_id(_,__,id):
        try:
            return Game.objects.get(id=id)
        except Game.DoesNotExist:
            return GraphQLError('Game object not found.')


schema = graphene.Schema(query=Query)
