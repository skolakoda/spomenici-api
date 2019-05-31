const { MongoClient, ObjectID } = require("mongodb");

const { URI, DB_NAME } = require("../config/setup");

const nadji = (req, res) => {
  const { kolekcija, id } = req.params;

  MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    if (!ObjectID.isValid(id)) return res.status(400).send("Nije validan id.");

    db.db(DB_NAME)
      .collection(kolekcija)
      .findOne({ _id: ObjectID(id) }, (err, lokacija) => {
        if (err) throw err;
        res.send(lokacija);
      });
    db.close();
  });
};

module.exports = nadji;
