# main.py
from badwords import bad
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from datetime import datetime
import json

item_dict = {}
playlist_dict = {}
skip_dict = {}
current_song = {}
users = {}
msg = {}
skip_number = {}

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

class User(BaseModel):
    name: str

class SkipNumber(BaseModel):
    skipnumber: int

class Message(BaseModel):
    stamp:str
    name: str
    message:str



app = FastAPI()

origins = ["*"]

app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
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

def user_dupe(user):
    try:
        print(users["name"])
        if users["name"].lower() ==user.lower():
            print("Duplicate")
            return "duplicate"
        
        print("Not duplicate")

        if bad in users["name"].lower():
            print("Very Bad")
            return "racist"
    except Exception as e:
        if user.lower() in bad:
            print("Very Bad")
            return "racist"
        else:
            pass
    

@app.post("/user/")
async def create_item(item:User):
    dupe_check = user_dupe(item.name)
    if dupe_check == "duplicate":
        return True
    if dupe_check =="racist":
        return "racist"

    users.update({"name":item.name})
    return users

@app.get("/users/")
async def get_item():
    return users

def add_to_list(msg):
    msg_list =[]
    for i in msg.values():
        msg_list.append(i)
    return msg_list

@app.post("/chat/")
async def create_item(item:Message):
    print(item.stamp,item.name,item.message)
    msg.update({item.stamp:{"stamp":item.stamp,"name":item.name,"message":item.message}})
    msg_list = add_to_list(msg)
    return msg_list

@app.get("/chat/")
async def get_item():
    msg_list = add_to_list(msg)
    return msg_list


@app.post("/skipnumber/")
async def create_item(item:SkipNumber):
    print(item.skipnumber)
    skip_number.update({"skipnumber":item.skipnumber})
    return skip_number["skipnumber"]

@app.get("/skipnumber/")
async def get_item():
    try:
        print(skip_number)
        return skip_number["skipnumber"]
    except Exception as e:
        return 0