const mongodb = require("mongodb")
const { URI, DB_NAME } = require("../config/setup")

const obrisi = (req, res) => {
  mongodb.MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    const mydb = db.db(DB_NAME)
    mydb
      .collection("spomenici")
      // eslint-disable-next-line new-cap
      .deleteOne({ _id: mongodb.ObjectID(req.body.id) })
    res.send(`Unos sa ID ${req.body.id} je obrisan.`)
  })
}

module.exports = obrisi
