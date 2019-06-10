const { MongoClient } = require("mongodb")
const md5 = require("md5")

const { URI, DB_NAME } = require("../../config/setup")
const { emailCheck } = require("../../utils/helpers")
const { ErrRes, SuccRes } = require("../../utils/interfaces")

const registracija = (req, res) => {
  const { email, password, repeatPassword } = req.body

  if (!emailCheck(email)) {
    return res.status(400).send(new ErrRes("Email nije validnog formata"))
  }

  if (password !== repeatPassword) {
    return res.status(400).send(new ErrRes("Lozinke nisu identicne"))
  }
  const pass = md5(password)

  MongoClient.connect(URI, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    const user = {
      email,
      pass,
      role: "user"
    }

    db.db(DB_NAME)
      .collection("korisnici")
      .insertOne(user, err => {
        if (err) throw err
        res.send(
          new SuccRes(
            `Hej ${email}! Uspesno ste kreirali nalog! Sada se mozete ulogovati`
          )
        )
      })
    db.close()
  })
}

module.exports = registracija
