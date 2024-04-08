from passlib.context import CryptContext
from app.exception import CustomException
from app import constants
from app.settings import settings
PWD_CONTEXT = CryptContext(schemes=['bcrypt'], deprecated='auto')


def verify_password(plain_password, hashed_password):
    verified = PWD_CONTEXT.verify(plain_password, hashed_password)
    if not verified:
        raise CustomException(constants.BAD_PASSWORD)
    return True


def get_password_hash(password):
    return PWD_CONTEXT.hash(password)
