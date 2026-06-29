import pymysql
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Response, Cookie, HTTPException
from services.jwt_token import verify_jwt
from services.database import Database
from dotenv import load_dotenv
from entity.data import Data
from entity.user import User
import logging as log
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
        # domain=f"{os.getenv('FRONTEND_URL')}",
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
    # print("data: ", data)
    user = verify_jwt(jwt_token)
    print(user["email"])
    db = Database()
    result = db.setContent(data, user["email"])
    if not result:
        raise HTTPException(401, "| Error: saving gig content")
    return {"status": True, "message": "Save successfully"}


# For testing
@app.get("/get")
def analyze():
    query = f""" SELECT * FROM data"""
    db = Database()
    conn = db._connect_with_database()
    try:
       with conn.cursor() as cursor:
           cursor.execute(query)
           content = cursor.fetchall()
           print(content)
           return content
    except pymysql.Error as e:
        print(e)
