const jwt = require('jsonwebtoken')
const { model } = require('mongoose')

const SpomenikSchema = require('../../models/SpomenikSchema')
const { tokenKey } = require('../../utils/config')
const { ErrRes, SuccRes } = require('../../utils/interfaces')

const obrisi = async(req, res) => {
  jwt.verify(req.token, tokenKey, async err => {
    if (err) return res.status(403).send(new ErrRes('Pogresan token'))
    const { kolekcija, id } = req.params

    const Spomenik = model('Spomenik', SpomenikSchema, kolekcija)
    const obrisano = await Spomenik.deleteOne({ _id: id })
    res.send(new SuccRes(`Obrisano ${obrisano.deletedCount} lokacija.`))
  })
}

module.exports = obrisi
