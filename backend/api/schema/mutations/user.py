import graphene
from django.utils import timezone
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphene_django.rest_framework.mutation import SerializerMutation

from api.models import User
from api.serializer import UserSerializer


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class SignInUserMutation(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    @staticmethod
    def mutate(_, __, email, password):
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise GraphQLError("ユーザーが存在しません")

        if not user.check_password(password):
            raise GraphQLError("ユーザーが存在しません")

        user.last_login = timezone.now()
        user.save()
        return SignInUserMutation(user=user)


class SignUpUserMutation(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    @staticmethod
    def mutate(_, info, username, email, password):
        serializer = UserSerializer(data={"username": username, "email": email, "password": password})
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=username)
        else:
            return GraphQLError(serializer.errors)
        return SignUpUserMutation(user=user)


class UpdateUserMutation(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        id = graphene.ID(required=True)
        username = graphene.String()
        email = graphene.String()
        password = graphene.String()

    @staticmethod
    def mutate(_, info, id, username, email, password):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            raise GraphQLError("ユーザーが存在しません")
        data = {}
        if username:
            data["username"] = username
        if email:
            data["email"] = email
        if password:
            data["password"] = password
        serializer=UserSerializer(user, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return UpdateUserMutation(user=user)


class Mutation(graphene.ObjectType):
    signin_user = SignInUserMutation.Field()
    signup_user = SignUpUserMutation.Field()
    update_user = UpdateUserMutation.Field()
