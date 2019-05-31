const { MongoClient, ObjectID } = require("mongodb");

const { URI, DB_NAME } = require("../../config/setup");

const about = (req, res) => {
  const { id } = req.params;

  MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    if (!ObjectID.isValid(id)) return res.status(400).send("Nije validan id.");

    db.db(DB_NAME)
      .collection("korisnici")
      .findOne({ _id: ObjectID(id) }, (err, user) => {
        if (err) throw err;
        res.send(`Pozdrav ${user.email}!. Tvoj password => ${user.pass}`); // trenutno samo
      });
    db.close();
  });
};

module.exports = about;
