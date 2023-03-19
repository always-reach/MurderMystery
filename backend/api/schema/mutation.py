import graphene
from graphql_auth import mutations
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.utils import timezone
from ..models import User, Game
from ..serializer import UserSerializer
from api.schema.mutations.game import CreateGameMutation,UpdateGameMutation


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

    @staticmethod
    def mutate(_, __, username, password):
        serializer = UserSerializer(data={"username": username, "password": password })
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=username)
        else:
            return GraphQLError(serializer.errors)
        return SignUpUserMutation(user=user)





class Mutation(AuthMutation, graphene.ObjectType):
    signin_user = SignInUserMutation.Field()
    signup_user = SignUpUserMutation.Field()
    create_game = CreateGameMutation.Field()
    update_game = UpdateGameMutation.Field()
