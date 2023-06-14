from flask import Flask, request
import pymongo
import json
from flask_cors import CORS
app = Flask(__name__)

# Initialize the Flask-CORS extension
CORS(app)

# Set the Access-Control-Allow-Origin header for all routes
@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response


#total data

@app.route("/data", methods=["GET"])
def get_data():
    client = pymongo.MongoClient()
    db = client["database_sample"]
    collection = db["collection"]
    data = collection.find()
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
    client = pymongo.MongoClient()
    db = client["database_sample"]
    collection = db["collection"]
    data = collection.find()
    d=[]
    a = ['x','y']
    l = request.args.get('list').split(',')
    for i in data:
        temp = {}
        for j in range(2):
            temp[a[j]]=i[l[j]]
        d.append(temp)
    return json.dumps(d)


if __name__ == '__main__':
    app.run(port=8888)