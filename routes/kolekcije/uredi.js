const { model } = require('mongoose')
const { ObjectID } = require('mongodb')
const jwt = require('jsonwebtoken')

const { tokenKey } = require('../../utils/config')
const { ErrRes, SuccRes } = require('../../utils/interfaces')
const SpomenikSchema = require('../../models/SpomenikSchema')

const uredi = async(req, res) => {
  jwt.verify(req.token, tokenKey, async err => {
    if (err) return res.status(403).send(new ErrRes('Nevalidan token'))

    const { kolekcija, id } = req.params
    const { naslov, kategorija, opis, lat, lon } = req.body

    if (!ObjectID.isValid(id))
      return res.status(400).send(new ErrRes('Nije validan id.'))

    const Spomenik = model('Spomenik', SpomenikSchema, kolekcija)
    const spomenik = await Spomenik.findOne({ _id: ObjectID(id) })

    if (naslov) spomenik.naslov = naslov
    if (kategorija) spomenik.kategorija = kategorija
    if (opis) spomenik.opis = opis
    if (lat && lon) spomenik.lokacija = { lat, lon }

    spomenik.save()
      .then(data => res.json(new SuccRes('Lokacija je uspesno azurirana.', data)))
      .catch(err => res.status(400).send(`Greska : ${err.message}`))

  })
}

module.exports = uredi
