const { model } = require('mongoose')
const SpomenikSchema = require('../../models/SpomenikSchema')
const { ErrRes, SuccRes } = require('../../utils/interfaces')
const { konvertujSliku } = require('../../utils/helpers')

const dodaj = async(req, res) => {
  const { kolekcija } = req.params
  const { lat, lon, od } = req.body // do je rezervisana rec
  const slika = await konvertujSliku(req.files)
  const Spomenik = model('Spomenik', SpomenikSchema, kolekcija)

  const spomenik = new Spomenik({
    ...req.body,  // otpakuje sva polja
    slika,
    lokacija: { lat, lon },
    radnoVreme: { od, do: req.body.do }
  })

  spomenik.save()
    .then(data => res.json(new SuccRes('Nova lokacija je uspesno dodata.', data)))
    .catch(err => res.status(400).send(new ErrRes(err.message)))
}

module.exports = dodaj
