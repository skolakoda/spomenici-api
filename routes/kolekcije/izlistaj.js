const { MongoClient } = require('mongodb')

const { URI, DB_NAME } = require('../../utils/config')
const { SuccRes } = require('../../utils/interfaces')

const izlistaj = (req, res) => {
  const { kolekcija } = req.params
  MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    db.db(DB_NAME)
      .collection(kolekcija)
      .find()
      .toArray((err, podaci) => res.send(new SuccRes(null, podaci)))
  })
}

module.exports = izlistaj
