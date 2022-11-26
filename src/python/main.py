# main.py

from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel

item_dict = {}
playlist_dict = {}
skip_dict = {}
current_song = {}

class Item(BaseModel):
    token: str
    name: Optional[str] = None

class Player(BaseModel):
    playlist:str

class Skip(BaseModel):
    user: str
    song_id: str
    skip: Optional[int] = None

class Current_song(BaseModel):
    song_id: str



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


def check_reset(user,song_id):
    if user == "reset" and song_id =="reset":
        print("Resetting")

def notify_once(user,song_id):
    try:
        if skip_dict[user] == song_id:
            print("Duper")
            return True
    except Exception as e:
        print(e)


@app.post("/skip/")
async def create_item(item:Skip):
    try:
        check_reset(item.user,item.song_id)
        duper = notify_once(item.user,item.song_id)
        if duper:
            return "duper"
        remove_dupes(item.user,item.song_id)
        skip_dict.update({item.user:item.song_id})
        number = len(skip_dict)
        print(f"NUMBER {number}")
        return number
    except Exception as e:
            print(e)

def remove_dupes(user,song_id):
    print("Removing old Songs")
    remove =[]
    for a,b in skip_dict.items():
        if song_id != b:
            remove.append(a)
    
    for i in remove:
        skip_dict.pop(i)

@app.get("/skip/")
async def get_item():
    return skip_dict

@app.post("/song/")
async def create_item(item:Current_song):
    current_song.update({"song_id":item.song_id})
    return current_song

@app.get("/song/")
async def get_item():
    return current_song

