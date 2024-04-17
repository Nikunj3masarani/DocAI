from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from app.settings import settings


class Users:
    def __init__(self):
        pass

    def invite_user_for_onboarding(self, to_email):
        # todo implement here
        pass

        # api_key = settings.email_api_key
        # from_email = settings.from_email
        #
        # message = Mail(from_email, to_email, subject, content)
        # send_grid = SendGridAPIClient(api_key)
        # response = send_grid.send(message)

    def forget_password(self, to_email):
        # todo implement here
        pass

        # api_key = settings.email_api_key
        # from_email = settings.from_email
        #
        # message = Mail(from_email, to_email, subject, content)
        # send_grid = SendGridAPIClient(api_key)
        # response = send_grid.send(message)