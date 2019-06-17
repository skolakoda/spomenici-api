const { model } = require('mongoose')
const TokenSchema = require('./TokenSchema')

const Token = model('Token', TokenSchema)

module.exports = Token
