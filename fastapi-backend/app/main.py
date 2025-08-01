from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to StudySavvy API 🚀"}

@app.get("/ping")
def ping():
    return {"message": "pong"}
