const mongo = require("mongodb")
const { URI, DB_NAME } = require("../config/setup")

const dodaj = (req, res) => {
  const { naslov, kategorija, lat, lon } = req.body

  if (!naslov || !kategorija || !lat || !lon) {
    res.send("Niste uneli sva potrebna polja")
  }

  mongo.MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    const mydb = db.db(DB_NAME)
    const model = {
      naslov,
      kategorija,
      lokacija: {
        lat,
        lon
      }
    }

    mydb.collection("spomenici").insertOne(model)
    res.send(`Dodat Spomenik ${naslov}`)
    db.close()
  })
}

module.exports = dodaj
