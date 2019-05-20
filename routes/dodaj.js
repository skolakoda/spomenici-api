const mongo = require("mongodb");
const { URI, DB_NAME } = require('../config/setup');



const dodaj = (req, res) => {
    const { naslov, kategorija, lat, lon } = req.body;

    if (!naslov || !kategorija) {
        res.send("Niste uneli sva potrebna polja")
    }

    mongo.MongoClient.connect(URI, (err, db) => {
        if (err) throw err;
        let mydb = db.db(DB_NAME);
        let model = {
            naslov, kategorija, "lokacija": {
                lat, lon
            }
        };


        console.log("RES", res);


        mydb.collection('spomenici').insertOne(model, (err, res) => {
            if (err) throw err;
            db.close();
        })
        db.close()
        res.send(`Dodat Spomenik ${naslov}`)
    })
}

module.exports = dodaj
