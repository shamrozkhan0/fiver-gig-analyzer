from fastapi import FastAPI, Response, Cookie, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.jwt_token import verify_jwt
from services.database import Database
from ai.analyzer import get_response
from dotenv import load_dotenv
from pydantic import BaseModel
from entity.data import Data
from entity.user import User
import logging as log
import pymysql
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


@app.post("/signup")
def register_user(user: User ):
        db = Database()
        response = db.register_user(user)
        print("response: ", response )
        if response["success"]:
            return {"status": 200, "message": response["message"] }
        raise HTTPException(status_code=400, detail=response["message"])


@app.post("/login")
def login_user(user: User, response: Response):
    log.info("| Reviewed Login request")
    db = Database()
    result = db.verify_user(user)
    print("result: ", result)

    token = result["token"]

    response.set_cookie(
        key="jwt_token",
        value=token,
        # domain=f"{os.getenv('FRONTEND_URL')}", # it runs on local store
        httponly=True,
        secure=False,
        samesite="lax",
        max_age= 60 * 60 * 24 * 1
    )
    return {"status" : True, "message": "Login Completed"}


@app.get("/me")
def get_me(jwt_token: str = Cookie(None)):
    log.info(f"| me alert {jwt_token}")
    if not jwt_token:
        log.error("| Error jwt token not found")
        raise HTTPException(401, "Not authenticated")
    user = verify_jwt(jwt_token)
    return user


@app.post("/logout")
def logout(response: Response):
    response.delete_cookie(key="jwt_token")
    log.info("| logout completed")
    return {"message": "logout"}


@app.post("/savecontent")
def save_content(data: Data, jwt_token: str = Cookie()):
    print("saving data")
    if not jwt_token:
        raise HTTPException(401, "Token not found")
    user = verify_jwt(jwt_token)
    print(user["email"])
    db = Database()
    result = db.setContent(data, user["email"])
    if not result:
        raise HTTPException(401, "| Error: saving gig content")
    return {"status": True, "message": "Save successfully", "content_id": result["content_id"], "user_id": result["user_id"]}


class ContentRequest(BaseModel):
    user_id:int
    content_id:int

@app.get("/getcontent/{user_id}/{content_id}")
def get_content(user_id:int, content_id:int,jwt_token=Cookie(...)):
    email = verify_jwt(jwt_token)
    print(f"getting content call by {email['email']}")
    request = ContentRequest(user_id=user_id, content_id=content_id)
    db = Database()
    content = db.get_content_by_id(request.user_id, request.content_id,email["email"])
    print("calling response")
    result = get_response(content["message"])
    return result


# For testing
@app.get("/get")
def analyze():
    query = f""" SELECT * FROM data"""
    db = Database()
    conn = db._connect_with_database()
    try:
       with conn.cursor(pymysql.cursors.DictCursor) as cursor:
           cursor.execute(query)
           content = cursor.fetchall()
           print(content)
           return content
    except pymysql.Error as e:
        print(e)