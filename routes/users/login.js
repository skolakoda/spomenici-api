const { MongoClient } = require("mongodb")
const md5 = require("md5")

const { URI, DB_NAME } = require("../../config/setup")

const login = (req, res) => {
  const { email, password } = req.body
  const pw = md5(password)
  MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err

    db.db(DB_NAME)
      .collection("korisnici")
      .findOne({ email, pass: pw }, (err, user) => {
        if (!user) {
          return res.status(400).send("Pogresan email ili password")
        }
      })
  })
}

module.exports = login
