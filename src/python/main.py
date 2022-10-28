# main.py
#uvicorn main:app --reload

from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel

item_dict = {}



class Item(BaseModel):
    token: str
    name: Optional[str] = None

app = FastAPI()

app.add_middleware(
    # We add the middleware here
    CORSMiddleware,
    # These are the options we give the middleware and they map easily to their
    # associated CORS headers
    allow_origins=['http://localhost:3000', 'http://localhost'],
    allow_methods=['GET', 'POST']
)

@app.post("/items/")
async def create_item(item: Item):
    item_dict.update({"name": item.name})
    item_dict.update({"token": item.token})
    print(item_dict)
    return item_dict

@app.get("/items/token")
async def get_item():
    return item_dict

@app.get("/items/showall")
async def get_item():
    return item_dict