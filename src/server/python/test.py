from badwords import bad

msg = {'1669494233347': {'name': 'Travis', 'message': 'Hey you good'}, '1669494234821': {'name': 'Travis', 'message': 'stunky'}, '1669494238299': {'name': 'Travis', 'message': 'stunky'}}

dic = {'1694357103424': {'time': '1694357103424', 'author': 'Stank', 'message': 'Test', 'mod': None}}



def bad_word_check(id,dic):
    for badwords in bad:
        if badwords in dic[id].get("message").lower():
            new_message = dic[id].get("message").lower().replace(badwords,'*'*len(badwords))
            return new_message
    else:
        return 0

test = bad_word_check('1669494233347',msg)

print(test)