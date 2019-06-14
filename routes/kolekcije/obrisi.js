const { model } = require('mongoose')

const SpomenikSchema = require('../../models/SpomenikSchema')
const { SuccRes } = require('../../utils/interfaces')

const obrisi = async(req, res) => {
  const { kolekcija, id } = req.params

  const Spomenik = model('Spomenik', SpomenikSchema, kolekcija)
  const obrisano = await Spomenik.deleteOne({ _id: id })
  res.send(new SuccRes(`Obrisano ${obrisano.deletedCount} lokacija.`))
}

module.exports = obrisi
