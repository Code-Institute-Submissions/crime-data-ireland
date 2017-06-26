from pymongo import MongoClient

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
LOCAL_DBS_NAME = 'Crime_Data'
LOCAL_COLLECTION_NAME = 'new_data'


MONGODB_URI = 'mongodb://heroku_69fn47cd:i9lqct7bi6jv94mbk4dfi4j20@ds137550.mlab.com:37550/heroku_69fn47cd'
REMOTE_DBS_NAME = 'heroku_69fn47cd'
REMOTE_COLLECTION_NAME = 'new_data'

with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
    with MongoClient(MONGODB_URI) as remote_conn:

        collection = conn[LOCAL_DBS_NAME][LOCAL_COLLECTION_NAME]
        items = collection.find()

        remote_collection = remote_conn[REMOTE_DBS_NAME][REMOTE_COLLECTION_NAME]
        # items = remote_collection.find()

        # for item in items:
        #     print item['Station']

        for item in items:
            try:
                remote_collection.insert(item)
            except Exception as e:
                print e

print "Done"