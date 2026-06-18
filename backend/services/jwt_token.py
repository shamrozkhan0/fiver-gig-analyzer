from dotenv import load_dotenv
from entity.user import User
import datetime
import logging as log
import jwt
import os

load_dotenv()
log.basicConfig(level=log.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",)

def create_token(user: User):
    pay_load = {
        "email": user.email,
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
    }

    secret_key = os.getenv("JWT_SECRET_KEY")
    algorithm = os.getenv("JWT_ALGORITHM")

    try:
        jwt_token = jwt.encode(pay_load, secret_key, algorithm=algorithm)
        log.info(f"| Success JWT token successfully created for user with email: {user.email} {jwt_token}")
        return jwt_token
    except jwt.PyJWKError as e:
        log.error(f"| Error creating JWT token:  {e}")
