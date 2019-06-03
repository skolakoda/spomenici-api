const { MongoClient } = require("mongodb")
const md5 = require("md5")

const { URI, DB_NAME } = require("../../config/setup")
const { emailCheck } = require("../../utils/helpers")

const registracija = (req, res) => {
  const { email, password, repeatPassword } = req.body

  if (!emailCheck(email)) {
    return res.status(400).send("Email nije validnog formata")
  }

  if (password !== repeatPassword) {
    return res.status(400).send("Lozinke nisu identicne")
  }
  const pass = md5(password)

  MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    const user = {
      email,
      pass
    }

    db.db(DB_NAME)
      .collection("korisnici")
      .insertOne(user, err => {
        if (err) throw err
        res.send(`Hej ${email}! Uspesno ste kreirali nalog!`)
      })
    db.close()
  })
}

module.exports = registracija
