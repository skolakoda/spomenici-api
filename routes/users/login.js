const md5 = require('md5')
const jwt = require('jsonwebtoken')

const { tokenKey } = require('../../utils/config')
const { SuccRes, ErrRes } = require('../../utils/interfaces')
const User = require('../../models/User')

module.exports = (req, res) => {
  const { email, pass } = req.body

  User.findOne({ email, password: md5(pass) }).then(user => {
    if (!user)
      return res.status(400).send(new ErrRes('Pogresan email ili lozinka'))

    jwt.sign({ _id: user._id }, tokenKey, { expiresIn: '30d' }, (err, token) => {
      if (err) return res.status(400).send(new ErrRes(err.message))
      res.json(new SuccRes('Dobili ste pristupni token.', token))
    })
  })
}
