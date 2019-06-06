const { MongoClient, ObjectID } = require("mongodb")

const { URI, DB_NAME } = require("../../config/setup")
const { nevalidnaLokacija } = require("../../utils/helpers")
const { ErrRes, SuccRes } = require("../../utils/interfaces")


const uredi = (req, res) => {
  const { kolekcija, id } = req.params
  const { naslov, kategorija, opis } = req.body
  const lat = parseFloat(req.body.lat), lon = parseFloat(req.body.lon)

  if (!naslov || !kategorija || !lat || !lon) {
    return res.status(400).send(new ErrRes("Niste uneli sva potrebna polja"))
  }

  if (nevalidnaLokacija(lat, lon)) {
    return res.status(400).send(new ErrRes("Koordinate su izvan dozvoljenog geografskog opsega."))
  }

  if (!ObjectID.isValid(id)) {
    return res.status(400).send(new ErrRes("Nije validan id."))
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
        res.send(new SuccRes(`Lokacija ${naslov} je uspesno azurirana.`))
      })
      .catch(err => {
        res.status(500).send(new ErrRes(`Greska : ${err}`))
      })
    db.close()
  })
}

module.exports = uredi
