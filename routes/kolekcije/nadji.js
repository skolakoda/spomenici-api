const { MongoClient, ObjectID } = require("mongodb")

const { URI, DB_NAME } = require("../../config/setup")

const nadji = (req, res) => {
  const { kolekcija, id } = req.params

  MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err

    if (!ObjectID.isValid(id))
      return res.status(400).json({
        status: "error",
        message: "Nije validan id.",
        data: null
      })

    db.db(DB_NAME)
      .collection(kolekcija)
      .findOne({ _id: ObjectID(id) }, (err, spomenik) => {
        if (err) console.log(err)
        res.send({
          status: "success",
          message: null,
          data: spomenik
        })
      })

    db.close()
  })
}

module.exports = nadji
