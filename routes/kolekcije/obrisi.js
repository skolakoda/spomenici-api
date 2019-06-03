const { MongoClient, ObjectID } = require("mongodb")

const { URI, DB_NAME } = require("../../config/setup")

const obrisi = (req, res) => {
  const { kolekcija, id } = req.params

  if (!ObjectID.isValid(id)) {
    return res.status(400).send({
      status: "error",
      message: "Nije validan id.",
      data: null
    })
  }

  MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    db.db(DB_NAME)
      .collection(kolekcija)
      .deleteOne({ _id: ObjectID(id) })
      .then(result => res.send({
        status: "success",
        message: `Obrisano ${result.deletedCount} lokacija.`,
        data: null
      }))
      .catch(err => res.status(500).send({
        status: "error",
        message: `Greska: ${err}`,
        data: null
      }))
  })
}

module.exports = obrisi
