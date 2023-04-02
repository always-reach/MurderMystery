import graphene
from django.utils import timezone
from graphene_django import DjangoObjectType
from graphql import GraphQLError

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


class Mutation(graphene.ObjectType):
    signin_user = SignInUserMutation.Field()
    signup_user = SignUpUserMutation.Field()
