# Using Python to get JSON from http and save as json file
# by seaniwei

import requests
import json
data = requests.get(url=r"https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=5")
with open("indie_music.json","w",encoding="utf-8") as myFile:
    json.dump(data.json(), myFile, ensure_ascii=False)
myFile.close()
print(data.json())