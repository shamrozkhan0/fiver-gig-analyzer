from fastapi import FastAPI, Form
from fastapi import HTTPException
from entity.user import User
from services.database import Database

app = FastAPI()


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
def login_user(user: User):
    db = Database()
    response = db.verify_user(user)





