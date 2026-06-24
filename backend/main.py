import logging as log

from fastapi import FastAPI, Form, Response, Cookie
from fastapi import HTTPException
from entity.user import User
from services.database import Database
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
app = FastAPI()
load_dotenv()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL"), os.getenv("EXTENSION_ID")],           # Allows requests from specified origins
    allow_credentials=True,         # Allows cookies and credentials (e.g., Authorization headers)
    allow_methods=["*"],            # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],            # Allows all request headers
)

log.basicConfig(level=log.INFO, format='%(asctime)s - %(levelname)s - %(filename)s - %(message)s',)

@app.get("/")
def hello_world(data: str = Form(...)):
    return {
        "recieved" : data
    }


@app.post("/signup")
def register_user(user: User ):
        db = Database()
        response = db.register_user(user)
        if response.status:
            return {"status": 200, "message": response.message }
        raise HTTPException(status_code=400, detail=response.message)


@app.post("/login")
def login_user(user: User, response: Response):
    log.info("| Reviewed Login request")
    db = Database()
    result = db.verify_user(user)
    print(result)

    token = result["token"]

    response.set_cookie(
        key="jwt_token",
        value=token,
        # domain=f"{os.getenv('FRONTEND_URL')}",
        httponly=True,
        secure=False,
        samesite="lax",
        max_age= 60 * 60 * 24 * 1
    )
    return result


@app.get("/me")
def get_me(jwt_token: str = Cookie(None)):
    if not jwt_token:
        raise HTTPException(401, "Not authenticated")
    db = Database()
    user = db.verify_jwt(jwt_token)
    return user


@app.post("/logout")
def logout(response: Response):
    response.delete_cookie(key="jwt_token")
    log.info("| logout completed")
    return {"message": "logout"}