const mongo = require("mongodb");

const { URI } = require('../config/setup');

const spomenici = (req, res) => {
    mongo.MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        let mydb = db.db("heroku_tvw5zpg7");
        mydb.collection('spomenici')
        .find()
        .toArray((err, podaci) => res.send(podaci))
})}

module.exports = spomenici;
