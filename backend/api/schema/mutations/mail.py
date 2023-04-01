import graphene
from django.conf import settings
from django.core.mail import send_mail, BadHeaderError
from django_graphql_ratelimit import ratelimit
from graphql import GraphQLResolveInfo
from smtplib import SMTPException

from api.models import User


class SendEmailMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        email = graphene.String(required=True)
        message = graphene.String(required=True)

    success = graphene.Boolean()

    @staticmethod
    @ratelimit(key="ip", rate="10/m", block=True)
    @ratelimit(key="gql:email", rate="5/m", block=True)
    def mutate(_, info: GraphQLResolveInfo, name, email, message):
        user: User = info.context.user
        if user.is_authenticated:
            try:
                mail_message = f"{name}さんからのお問合せです。{message}"
                send_mail("MurderMysteryお問合せ",
                          mail_message,
                          email,
                          [settings.EMAIL_HOST_USER],
                          fail_silently=False)
                return SendEmailMutation(success=True)
            except (BadHeaderError, SMTPException) as e:
                print(e)
                return SendEmailMutation(success=False)
        else:
            return SendEmailMutation(success=False)


class Mutation(graphene.ObjectType):
    send_mail = SendEmailMutation.Field()
