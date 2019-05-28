const { MongoClient } = require("mongodb")

const { URI, DB_NAME } = require("../config/setup")
const { nevalidnaLokacija } = require("../utils/helpers")

const dodaj = (req, res) => {
  const { naslov, kategorija, opis } = req.body
  const lat = parseFloat(req.body.lat), lon = parseFloat(req.body.lon)

  if (!naslov || !kategorija || !lat || !lon) {
    res.status(400).send("Niste uneli sva potrebna polja")
    return
  }

  if (nevalidnaLokacija(lat, lon)) {
    res.status(400).send("Koordinate su izvan dozvoljenog geografskog opsega.")
    return
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
      .collection("spomenici")
      .insertOne(model, (err, inserted) => {
        res.send(JSON.stringify(inserted.ops[0], null, 2))
      })
    db.close()
  })
}

module.exports = dodaj
