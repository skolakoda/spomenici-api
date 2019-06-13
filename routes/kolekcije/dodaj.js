const { model } = require('mongoose')

const { SuccRes } = require('../../utils/interfaces')
const SpomenikSchema = require('../../models/SpomenikSchema')

const dodaj = (req, res) => {
  const { kolekcija } = req.params
  const { naslov, kategorija, opis, lat, lon } = req.body

  const Spomenik = model('Spomenik', SpomenikSchema, kolekcija)
  const spomenik = new Spomenik({
    naslov,
    opis,
    kategorija,
    lokacija: { lat, lon }
  })

  spomenik
    .save()
    .then(data =>
      res.json(new SuccRes('Nova lokacija je uspesno dodata.', data))
    )
    .catch(err => res.status(400).send(err.message))
}

module.exports = dodaj
