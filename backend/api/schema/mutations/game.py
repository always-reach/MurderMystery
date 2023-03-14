import graphene
from graphene_django import DjangoObjectType
from graphene_file_upload.scalars import Upload
from graphql import GraphQLResolveInfo, GraphQLError

from api.models import Game, User
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
        played_at = graphene.String()
        user = graphene.Int()

    @classmethod
    def mutate(cls, root, info: GraphQLResolveInfo, **kwargs):
        print("ユーザー取得開始")
        mutate_data = kwargs
        try:
            user = User.objects.get(id=mutate_data.get("user"))
        except User.DoesNotExist:
            print("does not exist user")
            return GraphQLError("ユーザーが存在しません")
        mutate_data["user"]=user
        print("mutate")
        serializer = GameSerializer(data=mutate_data)
        serializer.is_valid(raise_exception=True)
        return CreateGameMutation(game=serializer.data)
