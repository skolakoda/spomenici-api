const { model } = require('mongoose')
const UserSchema = require('./UserSchema')

const User = model('Korisnik', UserSchema, 'korisnici')

module.exports = User
