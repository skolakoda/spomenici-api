const { model } = require('mongoose')
const SpomenikSchema = require('../../models/SpomenikSchema')

const kategorije = async(req, res) => {
  const { kolekcija } = req.params
  const Spomenik = model('Spomenik', SpomenikSchema, kolekcija)

  Spomenik.distinct('kategorija')
    .then(data => res.send(data))
}

module.exports = kategorije
