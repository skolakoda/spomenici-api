const mongo = require("mongodb");

const { URI, DB_NAME } = require('../config/setup');

const spomenici = (req, res) => {
    mongo.MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        let mydb = db.db(DB_NAME);
        mydb.collection('spomenici')
        .find()
        .toArray((err, podaci) => res.send(podaci))
})}

module.exports = spomenici;
