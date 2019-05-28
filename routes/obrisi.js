const { MongoClient, ObjectID } = require("mongodb")

const { URI, DB_NAME } = require("../config/setup")

const obrisi = (req, res) => {
  const { id } = req.body

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("Nije validan id.")
  }

  MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    db.db(DB_NAME)
      .collection("spomenici")
      .deleteOne({ _id: ObjectID(id) })
    res.send(`Unos sa ID ${id} je obrisan.`)
  })
}

module.exports = obrisi
