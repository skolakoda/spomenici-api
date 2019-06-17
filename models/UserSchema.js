const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  password: {
    type: String,
    minlength: 6,
    match: /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/
  },
  ime: {
    type: String,
    trim: true
  },
  datumRodjenja: {
    type: Number,
    default: Date.now() // why ??
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  }
})

UserSchema.plugin(uniqueValidator)

module.exports = UserSchema
