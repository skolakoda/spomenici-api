require('dotenv').config();
const mongo = require("mongodb");

const { URI } = require('../config/setup');

const spomenik = (req, res) => {
    mongo.MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        let mydb = db.db("heroku_tvw5zpg7");
        mydb.collection('spomenici')
        .findOne({'_id': mongo.ObjectID(req.params.id)}, (err, spomenik) => {
            if (err) console.log(err)
            res.send(spomenik)
          })        
})} 

module.exports = spomenik;
