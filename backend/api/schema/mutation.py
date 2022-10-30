import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.utils import timezone
from api.models import User
from api.serializer import UserSerializer

class UserType(DjangoObjectType):
    class Meta:
        model = User
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


class Mutation(graphene.ObjectType):
    signin_user = SignInUserMutation.Field()
    signup_user = SignUpUserMutation.Field()
