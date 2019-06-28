const { model } = require('mongoose')

const TokenSchema = require('../../models/TokenSchema')
const { SuccRes } = require('../../utils/interfaces')

const logout = async(req, res) => {
  const { id } = req.params

  const Token = model('Token', TokenSchema, 'tokens')
  await Token.deleteOne({ userId: id })
  res.send(new SuccRes(`Izlogovani ste! id=>${id}`))
}

module.exports = logout
