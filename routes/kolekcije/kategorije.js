const { MongoClient } = require("mongodb")

const { URI, DB_NAME } = require("../../config/setup")

const kategorije = (req, res) => {
	const {naziv} = req.params

	MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err

    /*db.db(DB_NAME)
      .collection(naziv)
      .find({naziv}, {'fields':{"kategorija": 1, '_id':0}})
      .toArray((err, data) => {
        if (err) console.log(err)
        res.send(data)
      })*/
      const resArr = db.db(DB_NAME)
      .collection(naziv)
      .distinct("kategorija")
      .then(data => res.send(data))

  })

}

module.exports = kategorije