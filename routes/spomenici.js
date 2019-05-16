require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;

const { URI } = require('../config/setup');

const spomenici = (req, res) => {
    MongoClient.connect(URI, (err, db) => {
        if (err) throw err;
        let mydb = db.db("heroku_tvw5zpg7");
        mydb.collection('spomenici').find()
        .toArray((err, podaci) => res.send(podaci))
})}

module.exports = spomenici
