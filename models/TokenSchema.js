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
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

TokenSchema.plugin(uniqueValidator)

module.exports = TokenSchema
