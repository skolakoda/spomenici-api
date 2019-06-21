const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const SpomenikSchema = new mongoose.Schema({
  naslov: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 64,
    unique: true,
    required: true
  },
  opis: {
    type: String,
    maxlength: 256,
    trim: true,
  },
  kategorija: {
    type: String,
    trim: true,
    lowercase: true,
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
  },
  slika: String,
  website: {
    type: String,
    match: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
  },
  radnoVreme: {
    od: {
      type: Number,
      min: 0,
      max: 24
    },
    do: {
      type: Number,
      min: 0,
      max: 24
    }
  }
})

SpomenikSchema.plugin(uniqueValidator) // mora da bi radilo unique

module.exports = SpomenikSchema
