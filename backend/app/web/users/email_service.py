from asyncio import exceptions
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from app.settings import settings
from app.constants.constants import FORGOT_PASSWORD_EMAIL_SUBJECT, INVITE_USER_EMAIL_SUBJECT
from app.constants.html_constants import FORGOT_PASSWORD, INVITE_USER


class Users:
    def __init__(self):
        pass

    def invite_user_for_onboarding(self, data):
        api_key = settings.email_api_key
        from_email = settings.from_email
        name = str(from_email).split("@")[0]
        url = f'''{settings.frontend_service}/auth/set-user-details?user_uuid={data.get('user_uuid')}&token={
        data.get("token")}&action={data.get('action')}'''

        content = INVITE_USER.format(name=name, url=url)
        message = Mail(from_email, data.get("email"), INVITE_USER_EMAIL_SUBJECT, html_content=content)

        send_grid = SendGridAPIClient(api_key)
        response = send_grid.send(message)


    def forget_password(self, data):
        api_key = settings.email_api_key
        from_email = settings.from_email
        name = str(from_email).split("@")[0]

        url = f'''{settings.frontend_service}/auth/reset-password?user_uuid={data.get('user_uuid')}&token={
        data.get("token")}&action={data.get('action')}'''

        content = FORGOT_PASSWORD.format(name=name, url=url)
        message = Mail(from_email, data.get("email"), FORGOT_PASSWORD_EMAIL_SUBJECT, html_content=content)

        send_grid = SendGridAPIClient(api_key)
        response = send_grid.send(message)
