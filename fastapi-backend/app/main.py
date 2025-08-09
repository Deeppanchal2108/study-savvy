from fastapi import FastAPI
from app.routes import course_routes
app = FastAPI()

app.include_router(course_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to StudySavvy API 🚀"}

@app.get("/ping")
def ping():
    return {"message": "pong"}
