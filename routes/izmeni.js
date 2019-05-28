const { MongoClient, ObjectID } = require("mongodb")

const { URI, DB_NAME } = require("../config/setup")
const { nevalidnaLokacija } = require("../utils/helpers")

const izmeni = (req, res) => {
  const { id } = req.params
  const { naslov, kategorija, opis } = req.body
  const lat = parseFloat(req.body.lat), lon = parseFloat(req.body.lon)

  if (!naslov || !kategorija || !lat || !lon) {
    return res.status(400).send("Niste uneli sva potrebna polja")
  }

  if (nevalidnaLokacija(lat, lon)) {
    return res.status(400).send("Koordinate su izvan dozvoljenog geografskog opsega.")
  }

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("Nije validan id.")
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
      .updateOne(
        { _id: ObjectID(id) },
        { $set: model }
      )
      .then(() => {
        res.send(`Lokacija ${naslov} je uspesno azurirana.`)
      })
      .catch(err => {
        res.status(500).send(`Greska : ${err}`)
      })
    db.close()
  })
}

module.exports = izmeni
