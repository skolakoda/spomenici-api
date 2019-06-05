const { MongoClient } = require("mongodb")
const md5 = require("md5")
const jwt = require("jsonwebtoken")

const { URI, DB_NAME, tokenKey } = require("../../config/setup")
const { ErrRes, SuccRes } = require("../../utils/interfaces")

const login = (req, res) => {
  const { email, password } = req.body
  const pw = md5(password)
  MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err

    db.db(DB_NAME)
      .collection("korisnici")
      .findOne({ email, pass: pw }, (err, user) => {
        if (!user) {
          return res.status(400).send(new ErrRes("Pogresan email ili password"))
        }
        const token = jwt.sign({ user }, tokenKey)
        res.send(new SuccRes("Token", token))
      })
  })
}

module.exports = login
