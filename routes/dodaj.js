const mongo = require('mongodb');
const { URI, DB_NAME } = require('../config/setup');

const dodaj = (req, res) => {
  const { naslov, kategorija, lat, lon } = req.body;

  if (!naslov || !kategorija) {
    res.send('Niste uneli sva potrebna polja');
  }

  mongo.MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    const mydb = db.db(DB_NAME);
    const model = {
      naslov,
      kategorija,
      lokacija: {
        lat,
        lon
      }
    };

    console.log('RES', res);

    mydb.collection('spomenici').insertOne(model, (err, res) => {
      if (err) throw err;
      db.close();
      res.send(`Dodat Spomenik ${naslov}`);
    });
    db.close();
  });
};

module.exports = dodaj;
