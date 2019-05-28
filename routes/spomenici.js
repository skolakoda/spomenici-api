const { MongoClient } = require("mongodb")

const { URI, DB_NAME } = require("../config/setup")

const spomenici = (req, res) => {
  MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    db.db(DB_NAME)
      .collection("spomenici")
      .find()
      .toArray((err, podaci) => res.send(podaci))
  })
}

module.exports = spomenici
