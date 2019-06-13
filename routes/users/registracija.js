const { model } = require('mongoose')
const md5 = require('md5')

const { ErrRes, SuccRes } = require('../../utils/interfaces')
const UserSchema = require('../../models/UserSchema')

const registracija = (req, res) => {
  const { email, password, repeatPassword } = req.body

  if (password !== repeatPassword) {
    return res.status(400).send(new ErrRes('Lozinke nisu identicne'))
  }
  const pass = md5(password)
  const User = model('Korisnik', UserSchema, 'korisnici')
  const user = new User({
    email,
    pass
  })

  user
    .save()
    .then(data =>
      res.json(new SuccRes('Uspesno ste registrovani ->', data.email))
    )
    .catch(err => res.status(400).send(err.message))
}

module.exports = registracija
