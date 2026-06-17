from pydantic import BaseModel
import random

class User(BaseModel):
    email: str
    password: str
    is_logged: bool = True

