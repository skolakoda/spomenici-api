const mongo = require("mongodb")

const { URI, DB_NAME } = require("../config/setup")

const izmeni = (req, res) => {
  const { naslov, kategorija, lat, lon } = req.body

  if (!naslov || !kategorija || !lat || !lon) {
    res.send("Niste uneli sva potrebna polja")
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
