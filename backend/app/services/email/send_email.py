from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from app.settings import settings


def send_email(to_email, subject, content):

	api_key = settings.email_api_key
	from_email = settings.from_email

	message = Mail(from_email, to_email, subject, content)
	send_grid = SendGridAPIClient(api_key)
	response = send_grid.send(message)
