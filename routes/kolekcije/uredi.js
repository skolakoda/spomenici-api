const { model } = require('mongoose')

const SpomenikSchema = require('../../models/SpomenikSchema')
const { ErrRes, SuccRes } = require('../../utils/interfaces')
const { konvertujSliku } = require('../../utils/helpers')

const uredi = async(req, res) => {
  const { kolekcija, id } = req.params
  const { naslov, kategorija, opis, lat, lon, website, od } = req.body
  const slika = await konvertujSliku(req.files)
  const Spomenik = model('Spomenik', SpomenikSchema, kolekcija)

  const spomenik = await Spomenik.findOne({ _id: id })

  if (naslov) spomenik.naslov = naslov
  if (kategorija) spomenik.kategorija = kategorija
  if (opis) spomenik.opis = opis
  if (lat && lon) spomenik.lokacija = { lat, lon }
  if (slika) {
    spomenik.slikaFajl.data = slika
    spomenik.slikaFajl.contentType = 'image/png'
  }
  if (website) spomenik.website = website
  if (od && req.body.do) spomenik.radnoVreme = { od, do: req.body.do }

  spomenik.save()
    .then(data => res.json(new SuccRes('Lokacija je uspesno azurirana.', data)))
    .catch(err => res.status(400).send(new ErrRes(err.message)))
}

module.exports = uredi
