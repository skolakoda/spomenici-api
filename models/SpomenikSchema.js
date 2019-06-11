const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const SpomenikSchema = new mongoose.Schema({
  naslov:	{
    type: String,
    unique : true,
    required: true
  },
  opis:	String,
  kategorija:	{
    type: String,
    required: true
  },
  lokacija: {
    lat: {
      type: Number,
      required: true
    },
    lon: {
      type: Number,
      required: true
    }
  }
})

SpomenikSchema.plugin(uniqueValidator) // mora da bi radilo unique

module.exports = SpomenikSchema
