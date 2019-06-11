const mongoose = require('mongoose')

const SpomenikSchema = new mongoose.Schema({
  naslov:	String,
  opis:	String,
  kategorija:	String,
  lokacija: {
    lat: Number,
    lon: Number
  }
})

module.exports = SpomenikSchema
