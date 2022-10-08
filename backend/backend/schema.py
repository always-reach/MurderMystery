import graphene
from graphene_django import DjangoObjectType
from api.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class Query(graphene.ObjectType):
    """
    Queryの実装
    命名規則としてstaticmethodがresolve_xxxとなる必要がある
    """
    all_users = graphene.List(UserType)
    user_by_email = graphene.Field(UserType, email=graphene.String(required=True))

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
            return None


schema = graphene.Schema(query=Query)
