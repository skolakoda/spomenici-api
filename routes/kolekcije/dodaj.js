const { model } = require('mongoose')
const sharp = require('sharp')

const { ErrRes, SuccRes } = require('../../utils/interfaces')
const SpomenikSchema = require('../../models/SpomenikSchema')

const dodaj = async (req, res) => {

  const { kolekcija } = req.params
  const { naslov, kategorija, opis, lat, lon } = req.body
  const { slika } = req.files

  const data = await sharp(slika.data)
    .resize(280)
    .toBuffer()
  const slikaString = data.toString('base64')



  const Spomenik = model('Spomenik', SpomenikSchema, kolekcija)
  const spomenik = new Spomenik({
    naslov,
    opis,
    kategorija,
    lokacija: { lat, lon },
    slikaString
  })

  spomenik.save()
    .then(data => res.json(new SuccRes('Nova lokacija je uspesno dodata.', data)))
    .catch(err => res.status(400).send(new ErrRes(err.message)))
}

module.exports = dodaj
