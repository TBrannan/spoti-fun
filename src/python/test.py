skip_dict ={}

skip_dict.update({'farter': 'asdfasdfasdfa'})




def post(user,song_id):
    try:
        if skip_dict[user] == song_id:
            skip_dict["duper"] = "true"
            print(skip_dict)
    except Exception as e:
        pass
    
    


post("danker", "asdfasdfasdfa")