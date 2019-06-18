const md5 = require('md5')
const jwt = require('jsonwebtoken')

const { tokenKey } = require('../../utils/config')
const { SuccRes } = require('../../utils/interfaces')
const User = require('../../models/User')
const Token = require('../../models/Token')

const login = (req, res) => {
  const { email, password } = req.body

  User.findOne({ email, password: md5(password) }).then(user => {
    const token = jwt.sign({ user }, tokenKey, { expiresIn: '30d' })
    res.json(new SuccRes('Success! Token sent', token))
    const tokenModel = new Token({
      userId: user._id,
      token,
      dodat: Date.now()
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
