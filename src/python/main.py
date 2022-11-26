# main.py

from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel

item_dict = {}
playlist_dict = {}
skip_dict = {}

class Item(BaseModel):
    token: str
    name: Optional[str] = None

class Player(BaseModel):
    playlist:str

class Skip(BaseModel):
    user: str
    song_id: str
    skip: Optional[int] = None


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
    return item_dict


@app.get("/items/playlist/")
async def get_item():
    return playlist_dict["playlist"]

@app.post("/playlist/")
async def create_item(item:Player):
    try:
        print("Posting playlist")
        playlist_dict.update({"playlist": item.playlist})
        return playlist_dict["playlist"]
    except Exception as e:
        print(e)


@app.post("/skip/")
async def create_item(item:Skip):
    try:
        print({item.user:item.song_id})
        skip_dict.update({item.user:item.song_id})
    except Exception as e:
            print(e)

@app.get("/skip/")
async def get_item():
    print(f"length of dict {len(skip_dict)}")
    return skip_dict

