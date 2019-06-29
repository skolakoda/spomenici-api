const { model } = require('mongoose')

const { SuccRes } = require('../../utils/interfaces')
const SpomenikSchema = require('../../models/SpomenikSchema')

module.exports = async(req, res) => {
  const { kolekcija, brojStrane, poStrani } = req.params
  const Spomenik = model('Spomenik', SpomenikSchema, kolekcija)
  const predmetaPoStrani = Number(poStrani) || 20

  const spomenici = await Spomenik.find()
    .skip((brojStrane - 1) * predmetaPoStrani)
    .limit(predmetaPoStrani)
  res.send(new SuccRes(null, spomenici))
}