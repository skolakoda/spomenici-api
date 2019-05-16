require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { port, URI, domain } = require('./config/setup'); 
const spomenici = require('./routes/spomenici');
const dodaj = require('./routes/dodaj');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

MongoClient.connect(URI, (err, db) => {
    if (err) throw err;
    let mydb = db.db("heroku_tvw5zpg7");
    let model1 = {
        "naslov": "Terazijska Cesma",
        "podnaslov": "Cesma",
        "kategorija": "",
        "slika": "",
        "glavni_tekst": "Nalazi se ispred hotela Moskva",
        "lokacija": {
            "lat": 0,
            "lon": 0
        },
        "galerija": []
    }
    let model2 = {
        "naslov": "Pizza trg",
        "podnaslov": "pizzaa",
        "kategorija": "",
        "slika": "",
        "glavni_tekst": "Solidna pizza",
        "lokacija": {
            "lat": 0,
            "lon": 0
        },
        "galerija": []
    }
    let model3 = {
        "naslov": "Bucko",
        "podnaslov": "govedja ftw",
        "kategorija": "",
        "slika": "",
        "glavni_tekst": "Blasfemija od pice",
        "lokacija": {
            "lat": 0,
            "lon": 0
        },
        "galerija": []
    }
   
    mydb.collection('spomenici').insertMany([model1, model2, model3], (err, res) => {
        if (err) throw err;
        db.close();
    })
    db.close()
})

//Routes
app.get('/', (req, res) => res.send('Dobrodosli na Spomenici-API!'));

app.get('/spomenici', spomenici);

app.post('/dodaj-spomenik', dodaj);

//Server
app.listen(port, () => {
    console.log(`Server at ${domain}!`);
  })

