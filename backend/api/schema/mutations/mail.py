from smtplib import SMTPException

import graphene
from django.core.mail import send_mail, BadHeaderError


class SendEmailMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        email = graphene.String(required=True)
        message = graphene.String(required=True)

    success = graphene.Boolean()

    @staticmethod
    def mutate(_, __, name, email, message):
        try:
            mail_message = f"{name}さんからのお問合せです。{message}"
            count=send_mail("MurderMysteryお問合せ", mail_message, email, ["bytheway811@gmail.com"], fail_silently=False)
            print("---------------送信件数---------------")
            print(count)

            return SendEmailMutation(success=True)
        except BadHeaderError | SMTPException:
            return SendEmailMutation(success=False)
