from flask import Flask, request
import pymongo
import json

app = Flask(__name__)

client = pymongo.MongoClient()
db = client["database_sample"]
collection = db["collection"]
data = collection.find()


#total data

@app.route("/data", methods=["GET"])
def get_data():
    l=[]
    for i in data[0]:
        l.append(i)

    l.pop(0)
    d=[]
    for i in data:
        temp = {}
        for j in l:
            temp[j]=i[j]
        d.append(temp)
    return json.dumps(d)

# http://127.0.0.1:8888/var?list=intensity%2Crelevance
@app.route("/var", methods=["GET"])
def get():
    d=[]
    l = request.args.get('list').split(',')
    for i in data:
        temp = {}
        for j in l:
            temp[j]=i[j]
        d.append(temp)
    return json.dumps(d)


if __name__ == '__main__':
    app.run(port=8888)