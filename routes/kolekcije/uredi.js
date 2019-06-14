const { model } = require('mongoose')
const sharp = require('sharp')

const { ErrRes, SuccRes } = require('../../utils/interfaces')
const SpomenikSchema = require('../../models/SpomenikSchema')

const uredi = async(req, res) => {

  const { kolekcija, id } = req.params
  const { naslov, kategorija, opis, lat, lon } = req.body
  const { slika } = req.files

  let slikaString = ''
  if (slika) {
    const data = await sharp(slika.data)
      .resize(280)
      .toBuffer()
    slikaString = data.toString('base64')
  }

  const Spomenik = model('Spomenik', SpomenikSchema, kolekcija)
  const spomenik = await Spomenik.findOne({ _id: id })

  if (naslov) spomenik.naslov = naslov
  if (kategorija) spomenik.kategorija = kategorija
  if (opis) spomenik.opis = opis
  if (lat && lon) spomenik.lokacija = { lat, lon }
  if (slikaString) spomenik.slika = slikaString

  spomenik.save()
    .then(data => res.json(new SuccRes('Lokacija je uspesno azurirana.', data)))
    .catch(err => res.status(400).send(`Greska : ${new ErrRes(err.message)}`))
}

module.exports = uredi
