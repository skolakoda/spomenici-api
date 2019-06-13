const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  dodat: {
    type: Number,
    required: true
  },
  userid: {
    type: String,
    required: true
  }
})

TokenSchema.plugin(uniqueValidator)

module.exports = TokenSchema
