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
        const token = jwt.sign({ user }, tokenKey, { expiresIn: "30d" })
        res.send(new SuccRes("Token sent!", token))
        const date = Date()
        const tokenModel = {
          userId: user._id,
          token,
          dodat: date.toString()
        }

        db.db(DB_NAME)
          .collection("tokens")
          .insertOne(tokenModel, err => {
            if (err) throw err
            console.log(`Dodato u ${tokenModel.dodat}`)
          })
      })
  })
}

module.exports = login
