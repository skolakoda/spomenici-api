const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const jwt = require('jsonwebtoken')

const { tokenKey } = require('../utils/config')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 6
  },
  ime: {
    type: String,
    trim: true
  },
  datumRodjenja: {
    type: Date
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  }
})

UserSchema.methods.napraviToken = function() {
  return jwt.sign({ _id: this._id, role: this.role }, tokenKey, { expiresIn: '30d' })
}

UserSchema.plugin(uniqueValidator)

module.exports = UserSchema
