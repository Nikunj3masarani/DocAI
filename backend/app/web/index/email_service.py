import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from app.settings import settings
from app.constants.constants import INVITE_INDEX_USER_EMAIL_SUBJECT
from app.constants.html_constants import INDEX_INVITE_USER


class Users:
    def __init__(self):
        api_key = settings.email_api_key
        self.send_grid = SendGridAPIClient(api_key)

    def invite_user_for_index(self, data):
        from_email = settings.from_email
        name = str(from_email).split("@")[0]

        url = f'''{settings.frontend_service}/index-invite?user_uuid={data.get("user_uuid")}&token={data.get("token")}&status={data.get("status")}&index_uuid={data.get("index_uuid")}'''

        content = INDEX_INVITE_USER.format(name=name, url=url)
        message = Mail(from_email, data.get("email"), INVITE_INDEX_USER_EMAIL_SUBJECT, html_content=content)

        response = self.send_grid.send(message)
