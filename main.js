const MongoClient = require("mongodb").MongoClient;
const express = require('express');

const spomenici = require('./routes/spomenici');

const URI = "mongodb://skolakoda:skolakoda523@ds111078.mlab.com:11078/heroku_tvw5zpg7";

const app = express();

MongoClient.connect(URI, (err, db) => {
    if (err) throw err;
    console.log("BAZA KREIRANA", db);
    let mydb = db.db("heroku_tvw5zpg7");
    let model = {
        "naslov": "",
        "podnaslov": "",
        "kategorija": "",
        "slika": "",
        "glavni_tekst": "",
        "lokacija": {
            "lat": 0,
            "lon": 0
        },
        "galerija": []
    }
    mydb.collection("spomenici").insertOne(model, (err, res) => {
        if (err) throw err;
        console.log("Ubaceno", res);
        db.close()
    })
    db.close()
})
app.get('/spomenici', spomenici);