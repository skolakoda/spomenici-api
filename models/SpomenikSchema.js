const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const SpomenikSchema = new mongoose.Schema({
  naslov:	{
    type: String,
    trim: true,
    unique : true,
    required: true
  },
  opis:	{
    type: String,
    trim: true,
  },
  kategorija:	{
    type: String,
    trim: true,
    required: true
  },
  lokacija: {
    lat: {
      type: Number,
      min: -90,
      max: 90,
      required: true
    },
    lon: {
      type: Number,
      min: -180,
      max: 180,
      required: true
    }
  }
})

SpomenikSchema.plugin(uniqueValidator) // mora da bi radilo unique

module.exports = SpomenikSchema
