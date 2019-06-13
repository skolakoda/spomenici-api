const { model } = require('mongoose')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

const { tokenKey } = require('../../utils/config')
const { SuccRes } = require('../../utils/interfaces')
const UserSchema = require('../../models/UserSchema')
const TokenSchema = require('../../models/TokenSchema')

const login = (req, res) => {
  const { email, password } = req.body
  const pw = md5(password)
  const User = model('Korisnik', UserSchema, 'korisnici')
  User.findOne({ email, password: pw }).then(user => {
    const token = jwt.sign({ user }, tokenKey, { expiresIn: '30d' })
    res.json(new SuccRes('Success! Token sent', token))
    const date = Date()
    const Token = model('Token', TokenSchema, 'tokens')
    const tokenModel = new Token({
      userId: user._id,
      token,
      dodat: date.toString()
    })

    tokenModel
      .save()
      .then(data =>
        res.json(new SuccRes('Token je ubacen u kolekciju u:', data.dodat))
      )
      .catch(err => res.status(400).send(err.message))
  })
}

module.exports = login
