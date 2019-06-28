const md5 = require('md5')

const { SuccRes, ErrRes } = require('../../utils/interfaces')
const User = require('../../models/User')

module.exports = (req, res) => {
  const { email, pass } = req.body

  User.findOne({ email, password: md5(pass) }).then(user => {
    if (!user)
      return res.status(400).send(new ErrRes('Pogresan email ili lozinka'))

    const token = user.napraviToken()
    res.header('x-auth-token', token).json(new SuccRes('Dobili ste pristupni token.', token))
  })
}
