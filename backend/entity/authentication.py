from pydantic import BaseModel

class LoginUser(BaseModel):
    email: str
    password: str

class SignupUser(BaseModel):
    username: str = None
    email: str = None
    password: str = None
