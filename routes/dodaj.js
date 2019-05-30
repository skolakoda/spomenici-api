const { MongoClient } = require("mongodb")

const { URI, DB_NAME } = require("../config/setup")
const { nevalidnaLokacija } = require("../utils/helpers")

const dodaj = (req, res) => {
  const { kolekcija } = req.params
  const { naslov, kategorija, opis } = req.body
  const lat = parseFloat(req.body.lat),
    lon = parseFloat(req.body.lon)

  if (!naslov || !kategorija || !lat || !lon) {
    return res.status(400).send("Niste uneli sva potrebna polja")
  }

  if (nevalidnaLokacija(lat, lon)) {
    return res
      .status(400)
      .send("Koordinate su izvan dozvoljenog geografskog opsega.")
  }

  MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err

    const model = {
      naslov,
      kategorija,
      lokacija: { lat, lon },
      opis
    }

    db.db(DB_NAME)
      .collection(kolekcija)
      .insertOne(model, (err, inserted) => {
        if (err) throw err
        res.json(inserted.ops[0], null, 2)
      })
    db.close()
  })
}

module.exports = dodaj
