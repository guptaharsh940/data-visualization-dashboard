from flask import Flask, request
import pymongo
import json
from flask_cors import CORS
app = Flask(__name__)

# Initialize the Flask-CORS extension
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


def load_data():
    client = pymongo.MongoClient()
    db = client["database_sample"]
    collection = db["collection"]
    return collection.find()

# Set the Access-Control-Allow-Origin header for all routes
@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response


#total data

@app.route("/data", methods=["GET","POST"])
def get_data():
    client = pymongo.MongoClient()
    db = client["database_sample"]
    collection = db["collection"]
    
    content = request.json
    query = {}
    for i in content.keys():
        if(len(content[i]) == 0):
            continue
        elif(len(content[i])==1):
            query[i] = content[i][0]['value']
        else:
            t = []
            for j in content[i]:
                t.append(j['value'])
            query[i] = {"$in":t}
    # print(query)
    data = collection.find(query)
    ans = {}
    keys = ['title','pestle','insight','country','start_year','end_year','intensity','topic','region','sector','source','impact','relevance','likelihood','url']
    for i in keys:
        subl=[]
        if(i in list(query.keys())):
            tempquery=query.copy()
            del tempquery[i]
            print(tempquery, query)
            for j in collection.find(tempquery).distinct(i):
                subl.append({'value':j,'label':j})
        else:
            for j in data.distinct(i):
                subl.append({'value':j,'label':j})
        ans[i]=subl
    # print(ans)
    # if(len(query)==1):
    #     ans[list(query.keys())[0]]=collection.distinct(list(query.keys())[0])
    # print(ans)
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
    final = {"data":d,"options":ans}
    return json.dumps(final)

# http://127.0.0.1:8888/var?list=intensity%2Crelevance
@app.route("/var", methods=["GET"])
def get():
    data = load_data()
    d=[]
    a = ['x','y']
    l = request.args.get('list').split(',')
    for i in data:
        temp = {}
        for j in range(2):
            temp[a[j]]=i[l[j]]
        d.append(temp)
    return json.dumps(d)

@app.route("/pie", methods=["GET"])
def piechart():
    data = load_data()
    # d=[]
    ans = []
    key = request.args.get('key')
    d={}
    for i in data:
        if(i[key] == ""):
            i[key] = "Null"
        if(i[key] not in d.keys()):
            d[i[key]] = 1
        
        else:
            d[i[key]]+=1
    ans.append(list(d.keys()))
    ans.append(list(d.values()))
    return json.dumps(ans)


@app.route("/top", methods=["GET"])
def top():
    data = load_data()
    # d=[]
    ans = []
    key = request.args.get('category')
    d={}
    for i in data:
        if(i[key] not in d.keys()):
            d[i[key]] = 1
        
        else:
            d[i[key]]+=1

    sor = sorted(d.items(),key=lambda x:x[1])
    j = 5
    for i in range(-1, -len(sor)-1, -1):
        temp = {}
        if(j == 0):
            break
        if(sor[i][0]==''):
            continue
        temp['category']=sor[i][0]
        temp['value']=sor[i][1]
        ans.append(temp)
        j-=1
    return json.dumps(ans)

@app.route("/distinct", methods=["GET"])
def distinct():
    client = pymongo.MongoClient()
    db = client["database_sample"]
    collection = db["collection"]
    ans = {}
    keys = ['title','pestle','insight','country','start_year','end_year','intensity','topic','region','sector','source','impact','relevance','likelihood','url']
    for i in keys:
        subl=[]
        for j in collection.distinct(i):
            subl.append({'value':j,'label':j})
        ans[i]=subl
    return ans

if __name__ == '__main__':
    app.run(port=8888)


