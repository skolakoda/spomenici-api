const { MongoClient, ObjectID } = require("mongodb")

const { URI, DB_NAME } = require("../../config/setup")
const { nevalidnaLokacija } = require("../../utils/helpers")

const uredi = (req, res) => {
  const { kolekcija, id } = req.params
  const { naslov, kategorija, opis } = req.body
  const lat = parseFloat(req.body.lat), lon = parseFloat(req.body.lon)

  if (!naslov || !kategorija || !lat || !lon) {
    return res.status(400).send({
      status: "error",
      message: "Niste uneli sva potrebna polja",
      data: null
    })
  }

  if (nevalidnaLokacija(lat, lon)) {
    return res.status(400).send({
      status: "error",
      message: "Koordinate su izvan dozvoljenog geografskog opsega.",
      data: null
    })
  }

  if (!ObjectID.isValid(id)) {
    return res.status(400).send({
      status: "error",
      message: "Nije validan id.",
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
      .updateOne(
        { _id: ObjectID(id) },
        { $set: model }
      )
      .then(() => {
        res.send({
          status: "success",
          message: `Lokacija ${naslov} je uspesno azurirana.`,
          data: null
        })
      })
      .catch(err => {
        res.status(500).send({
          status: "error",
          message: `Greska : ${err}`,
          data: null
        })
      })
    db.close()
  })
}

module.exports = uredi
