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
    mydb.collection("spomenici").updateOne( (err, res) => {
      if (err) throw err
      // eslint-disable-next-line new-cap
      { _id: mongo.ObjectID(req.params.id) },
      { $set: { naslov, kategorija, lokacija: { lat, lon } } }
      res.send("Spomenik je uspesno promenjen!")
    })
    db.close()
  })
}

module.exports = izmeni
