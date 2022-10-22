import graphene
from graphql import GraphQLError
from django.contrib.auth.hashers import make_password
from django.utils.datetime_safe import datetime
from graphene_django import DjangoObjectType
from .models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class SignInUserMutation(graphene.Mutation):
    id = graphene.String()
    username = graphene.String()
    email = graphene.String()
    user = graphene.Field(UserType)

    class Arguments:
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    @staticmethod
    def mutate(_, password, email):
        user = User.objects.filter(email=email).first()
        if not (user and user.check_password(password)):
            return GraphQLError("ユーザーが存在しません")
        user.last_login = datetime.now()
        user.save()
        return SignInUserMutation(user=user)


class Query(graphene.ObjectType):
    """
    Queryの実装
    命名規則としてstaticmethodがresolve_xxxとなる必要がある
    """
    all_users = graphene.List(graphene.NonNull(UserType), description="ユーザー取得API")
    user_by_email = graphene.Field(graphene.NonNull(UserType), email=graphene.String(required=True),
                                   description="メールアドレス検索API")
    user_by_username = graphene.Field(graphene.NonNull(UserType), username=graphene.String(required=True),
                                      description="ユーザー名検索API")

    @staticmethod
    def resolve_all_users(_, __):
        """
        Userテーブル全件検索
        Parameters
        ----------
        _ 使わない変数 root
        __ 使わない変数 info
        Returns User全件
        -------

        """
        return User.objects.all()

    @staticmethod
    def resolve_user_by_email(_, __, email):
        """
        メールアドレスでUserを検索
        メールアドレスはユニーク項目なので一件のみ取得される
        Parameters
        ----------
        _ 使わない変数 root
        __ 使わない変数 info
        email 検索するメールアドレス

        Returns emailを持つUser
        -------

        """
        try:
            return User.objects.all().get(email=email)
        except User.DoesNotExist:
            return GraphQLError("ユーザーが存在しません")

    @staticmethod
    def resolve_user_by_username(_, __, username):
        try:
            return User.objects.all().get(username=username)
        except User.DoesNotExist:
            return GraphQLError("ユーザーが存在しません")


class Mutation(graphene.ObjectType):
    login_user = SignInUserMutation.Field()
