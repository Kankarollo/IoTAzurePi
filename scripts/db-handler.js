const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

class DBHandler {
    constructor(mongoDBConnectionString) {
        this.mongoDBConnectionString = mongoDBConnectionString;
    }

    async insert(dataBody) {
        MongoClient.connect(this.mongoDBConnectionString, function (err, db) {
            if (err) throw err;
            var dbo = db.db(config.mongo.db_name);
            dbo.collection(config.mongo.db_collection).insertOne(dataBody, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    }

}
module.exports = DBHandler;
