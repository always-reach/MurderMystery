import graphene
from graphql_auth import mutations
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.utils import timezone
from ..models import User, Game
from ..serializer import UserSerializer
from api.schema.mutations.game import CreateGameMutation


class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    verify_account = mutations.VerifyAccount.Field()
    resend_activation_email = mutations.ResendActivationEmail.Field()
    send_password_reset_email = mutations.SendPasswordResetEmail.Field()
    password_reset = mutations.PasswordReset.Field()
    password_change = mutations.PasswordChange.Field()
    update_account = mutations.UpdateAccount.Field()
    archive_account = mutations.ArchiveAccount.Field()
    delete_account = mutations.DeleteAccount.Field()
    send_secondary_email_activation = mutations.SendSecondaryEmailActivation.Field()
    verify_secondary_email = mutations.VerifySecondaryEmail.Field()
    swap_emails = mutations.SwapEmails.Field()
    remove_secondary_email = mutations.RemoveSecondaryEmail.Field()

    token_auth = mutations.ObtainJSONWebToken.Field()
    verify_token = mutations.VerifyToken.Field()
    refresh_token = mutations.RefreshToken.Field()
    revoke_token = mutations.RevokeToken.Field()


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class GameType(DjangoObjectType):
    class Meta:
        model = Game
        fields = "__all__"


class SignInUserMutation(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    @staticmethod
    def mutate(_, __, username, password):
        try:
            user = User.objects.get(username=username)
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
    game = graphene.Field(GameType)

    class Arguments:
        game_id = graphene.Int(required=True)
        user_id = graphene.Int(required=True)

    @staticmethod
    def mutate(_, __, game_id, user_id):
        try:
            game_object = Game.objects.get(id=game_id)
            user_object = User.objects.get(id=user_id)
        except Game.DoesNotExist:
            return GraphQLError("Game does not exist")
        except User.DoesNotExist:
            return GraphQLError("User does not exist")
        game_object.played_users.add(user_object)
        return PlayedGameMutation(game=game_object)


class RemovePlayedGameMutation(graphene.Mutation):
    game = graphene.Field(GameType)

    class Arguments:
        game_id = graphene.Int(required=True)
        user_id = graphene.Int(required=True)

    @staticmethod
    def mutate(_, __, game_id, user_id):
        try:
            game_object = Game.objects.get(id=game_id)
            user_object = User.objects.get(id=user_id)
        except Game.DoesNotExist:
            return GraphQLError("Game does not exist")
        except User.DoesNotExist:
            return GraphQLError("User does not exist")

        game_object.played_users.remove(user_object)
        return RemovePlayedGameMutation(game=game_object)


class Mutation(AuthMutation, graphene.ObjectType):
    signin_user = SignInUserMutation.Field()
    signup_user = SignUpUserMutation.Field()
    played_game = PlayedGameMutation.Field()
    create_game = CreateGameMutation.Field()
    remove_played_game = RemovePlayedGameMutation.Field()
