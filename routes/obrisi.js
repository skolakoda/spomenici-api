const mongodb = require("mongodb")

const { URI, DB_NAME } = require("../config/setup")

const obrisi = (req, res) => {
  mongodb.MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    db.db(DB_NAME)
      .collection("spomenici")
      .deleteOne({ _id: mongodb.ObjectID(req.body.id) })
    res.send(`Unos sa ID ${req.body.id} je obrisan.`)
  })
}

module.exports = obrisi
