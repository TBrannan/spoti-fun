# main.py
#uvicorn --host 192.168.254.19 main:app

from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel

item_dict = {}

class Item(BaseModel):
    token: str
    name: Optional[str] = None

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/items/")
async def create_item(item:Item):
    item_dict.update({"name": item.name})
    item_dict.update({"token": item.token})
    print(item_dict)
    return item_dict

@app.get("/items/token/")
async def get_item():
    print("test")
    return item_dict