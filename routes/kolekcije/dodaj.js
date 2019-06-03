const { MongoClient } = require("mongodb")

const { URI, DB_NAME } = require("../../config/setup")
const { nevalidnaLokacija } = require("../../utils/helpers")

const dodaj = (req, res) => {
  const { kolekcija } = req.params
  const { naslov, kategorija, opis } = req.body
  const lat = parseFloat(req.body.lat),
    lon = parseFloat(req.body.lon)

  if (!naslov || !kategorija || !lat || !lon) {
    return res.status(400).send({
      status: "error",
      message: "Niste uneli sva potrebna polja",
      data: null
    })
  }

  if (nevalidnaLokacija(lat, lon)) {
    return res
      .status(400)
      .send({
        status: "error",
        message: "Koordinate su izvan dozvoljenog geografskog opsega.",
        data: null
      })
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
        res.json({
          status: "success",
          message: "Nova lokacija je uspesno dodata.",
          data: inserted.ops[0]
        })
      })
    db.close()
  })
}

module.exports = dodaj
