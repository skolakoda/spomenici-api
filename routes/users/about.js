const { MongoClient, ObjectID } = require("mongodb")
const jwt = require("jsonwebtoken")

const { URI, DB_NAME, tokenKey } = require("../../config/setup")
const { ErrRes, SuccRes } = require("../../utils/interfaces")

const about = (req, res) => {
  jwt.verify(req.token, tokenKey, err => {
    if (err) {
      return res.status(403).send(new ErrRes("Pogresan token"))
    }
  })

  const { id } = req.params

  MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    if (!ObjectID.isValid(id))
      return res.status(400).send(new ErrRes("Nije validan id."))

    db.db(DB_NAME)
      .collection("korisnici")
      .findOne({ _id: ObjectID(id) }, (err, user) => {
        if (err) throw err
        res.send(new SuccRes(`Pozdrav ${user.email}!. Tvoj ID => ${user._id}`))
      })
    db.close()
  })
}

module.exports = about
