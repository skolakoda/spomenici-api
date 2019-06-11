const mongoose = require('mongoose')

const { SuccRes } = require('../../utils/interfaces')
const SpomenikSchema = require('../../models/SpomenikSchema')

async function izlistaj(req, res) {
  const { kolekcija } = req.params
  const Spomenik = mongoose.model('Spomenik', SpomenikSchema, kolekcija)
  const spomenici = await Spomenik.find()
  res.send(new SuccRes(null, spomenici))
}

module.exports = izlistaj
