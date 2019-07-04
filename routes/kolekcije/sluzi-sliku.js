const { model } = require('mongoose')
const SpomenikSchema = require('../../models/SpomenikSchema')

const nadji = async(req, res) => {
  const { kolekcija, id } = req.params

  const Spomenik = model('Spomenik', SpomenikSchema, kolekcija)
  Spomenik.findOne({ _id: id })
    .then(spomenik => {
      const slika = spomenik.slikaFajl
      res.contentType(slika.contentType).send(slika.data)
    })
}

module.exports = nadji
