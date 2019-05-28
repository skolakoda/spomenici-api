const mongo = require("mongodb")
const { URI, DB_NAME } = require("../config/setup")

const dodaj = (req, res) => {
  const { naslov, kategorija, lat, lon } = req.body

  if (!naslov || !kategorija || !lat || !lon) {
    res.send("Niste uneli sva potrebna polja")
  } else if (lat > 47.2 || lat < 42 || lon > 23 || lon < 19) {
    res.send(
      "Uneli ste pogresne koordinate: Latituda treba biti izmedju 42 i 47.2 a Longituda treba biti izmedju 19 i 23"
    )
  } else {
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
}

module.exports = dodaj
