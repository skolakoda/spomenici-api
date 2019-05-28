const mongo = require("mongodb")

const { URI, DB_NAME } = require("../config/setup")

const spomenik = (req, res) => {
  mongo.MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err

    if (!mongo.ObjectID.isValid(req.params.id)) {
      res.status(400).send("Nije validan id.")
      return
    }

    db.db(DB_NAME)
      .collection("spomenici")
      .findOne({ _id: mongo.ObjectID(req.params.id) }, (err, spomenik) => {
        if (err) console.log(err)
        res.send(spomenik)
      })
  })
}

module.exports = spomenik
