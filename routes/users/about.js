const { MongoClient, ObjectID } = require("mongodb");

const { URI, DB_NAME } = require("../config/setup");

const about = (req, res) => {
  const { id } = req.params;

  MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;

    if (!ObjectID.isValid(id)) return res.status(400).send("Nije validan id.");

    db.db(DB_NAME)
      .collection("korisnici")
      .findOne({ _id: ObjectID(id) }, (err, user) => {
        if (err) console.log(err);
        res.send(user);
      });

    db.close();
  });
};

module.exports = about;
