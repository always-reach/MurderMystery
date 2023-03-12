import graphene
from graphene_django import DjangoObjectType
from graphene_file_upload.scalars import Upload
from api.models import Game
from api.serializer import GameSerializer


class GameType(DjangoObjectType):
    class Meta:
        model = Game
        fields = "__all__"


class CreateGameMutation(graphene.Mutation):
    game = graphene.Field(GameType)

    class Arguments:
        title = graphene.String(required=True)
        auther = graphene.String()
        play_time_minute = graphene.Int()
        max_player_count = graphene.Int()
        min_player_count = graphene.Int()
        note = graphene.String()
        image = Upload()
        played_at = graphene.Date()
        user = graphene.Int()

    def mutate(self, info, **kwargs):
        game_object = Game(**kwargs)
        serializer=GameSerializer(data=game_object)
        serializer.is_valid(raise_exception=True)
        return CreateGameMutation(game=serializer.data)
