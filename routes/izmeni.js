const mongo = require("mongodb")
const { URI, DB_NAME } = require("../config/setup")
const { nevalidnaLokacija } = require("../utils/helpers")

const izmeni = (req, res) => {
  const { naslov, kategorija } = req.body
  const lat = parseFloat(req.body.lat), lon = parseFloat(req.body.lon)

  if (!naslov || !kategorija || !lat || !lon) {
    res.status(400).send("Niste uneli sva potrebna polja")
    return
  }

  if (nevalidnaLokacija(lat, lon)) {
    res.status(400).send("Koordinate su izvan dozvoljenog geografskog opsega.")
    return
  }

  mongo.MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    const mydb = db.db(DB_NAME)
    mydb
      .collection("spomenici")
      .updateOne(
        // eslint-disable-next-line new-cap
        { _id: mongo.ObjectID(req.params.id) },
        { $set: { naslov, kategorija, lokacija: { lat, lon } } }
      )
      .then(console.log(`Spomenik sa ${req.params.id} je uspesno promenjen`))
      .catch(err => {
        console.log(`Greska : ${err}`)
      })
    db.close()
  })
}

module.exports = izmeni
