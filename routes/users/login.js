const md5 = require('md5')
const jwt = require('jsonwebtoken')

const { tokenKey } = require('../../utils/config')
const { SuccRes, ErrRes } = require('../../utils/interfaces')
const User = require('../../models/User')
const Token = require('../../models/Token')

const login = (req, res) => {
  const { email, pass } = req.body

  User.findOne({ email, password: md5(pass) }).then(user => {
    if (!user) 
      return res.send(new ErrRes('Pogresan email ili lozinka'))
    
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
        console.log(new SuccRes('Token je ubacen u kolekciju u:', data.dodat))
      )
      .catch(err => res.status(400).send(err.message))
  })
}

module.exports = login
