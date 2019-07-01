const md5 = require('md5')

const { SuccRes, ErrRes } = require('../../utils/interfaces')
const User = require('../../models/User')

module.exports = async(req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email, password: md5(password) })
  if (!user) return res.status(400).send(new ErrRes('Pogresan email ili lozinka'))

  const token = user.napraviToken()
  res.header('x-auth-token', token).json(new SuccRes('Dobili ste pristupni token', token))
}
