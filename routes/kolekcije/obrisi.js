const { MongoClient, ObjectID } = require("mongodb")
const jwt = require("jsonwebtoken")

const { URI, DB_NAME, tokenKey } = require("../../config/setup")
const { ErrRes, SuccRes } = require("../../utils/interfaces")

const obrisi = (req, res) => {
  jwt.verify(req.token, tokenKey, err => {
    if (err) {
      return res.status(403).send(new ErrRes("Pogresan token"))
    }
    const { kolekcija, id } = req.params

    if (!ObjectID.isValid(id)) {
      return res.status(400).send(new ErrRes("Nije validan id."))
    }

    MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err
      db.db(DB_NAME)
        .collection(kolekcija)
        .deleteOne({ _id: ObjectID(id) })
        .then(result =>
          res.send(new SuccRes(`Obrisano ${result.deletedCount} lokacija.`))
        )
        .catch(err => res.status(500).send(new ErrRes(`Greska: ${err}`)))
    })
  })
}

module.exports = obrisi
