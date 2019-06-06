const { MongoClient } = require("mongodb")

const { URI, DB_NAME } = require("../../config/setup")

const kategorije = (req, res) => {
	const {kolekcija} = req.params

	MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err

    const resArr = db.db(DB_NAME)
    .collection(kolekcija)
    .distinct("kategorija")
    .then(data => res.send(data))

  })

}

module.exports = kategorije