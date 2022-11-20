import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.utils import timezone
from api.models import User, GameMast
from api.serializer import UserSerializer


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class GameMastType(DjangoObjectType):
    class Meta:
        model = GameMast
        fields = "__all__"


class SignInUserMutation(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    @staticmethod
    def mutate(_, __, password, email):
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return GraphQLError("ユーザーが存在しません")

        if not user.check_password(password):
            return GraphQLError("ユーザーが存在しません")

        user.last_login = timezone.now()
        user.save()
        return SignInUserMutation(user=user)


class SignUpUserMutation(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    @staticmethod
    def mutate(_, __, username, password, email):
        serializer = UserSerializer(data={"username": username, "password": password, "email": email})
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(email=email, username=username)
        else:
            return GraphQLError(serializer.errors)
        return SignUpUserMutation(user=user)


class PlayedGameMutation(graphene.Mutation):
    game_mast = graphene.Field(GameMastType)

    class Arguments:
        game_id = graphene.Int(required=True)
        user_id = graphene.Int(required=True)

    @staticmethod
    def mutate(_, __, game_id, user_id):
        try:
            game_mast_object = GameMast.objects.get(id=game_id)
            user_object = User.objects.get(id=user_id)
        except GameMast.DoesNotExist:
            return GraphQLError("GameMast does not exist")
        except User.DoesNotExist:
            return GraphQLError("User does not exist")
        game_mast_object.played_users.add(user_object)
        return PlayedGameMutation(game_mast=game_mast_object)


class RemovePlayedGameMutation(graphene.Mutation):
    game_mast = graphene.Field(GameMastType)

    class Arguments:
        game_id = graphene.Int(required=True)
        user_id = graphene.Int(required=True)

    @staticmethod
    def mutate(_, __, game_id, user_id):
        try:
            game_mast_object = GameMast.objects.get(id=game_id)
            user_object = User.objects.get(id=user_id)
        except GameMast.DoesNotExist:
            return GraphQLError("GameMast does not exist")
        except User.DoesNotExist:
            return GraphQLError("User does not exist")

        game_mast_object.played_users.remove(user_object)
        return RemovePlayedGameMutation(game_mast=game_mast_object)



class Mutation(graphene.ObjectType):
    signin_user = SignInUserMutation.Field()
    signup_user = SignUpUserMutation.Field()
    played_game = PlayedGameMutation.Field()
    remove_played_game = RemovePlayedGameMutation.Field()
