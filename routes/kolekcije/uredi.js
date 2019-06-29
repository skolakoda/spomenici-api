const { ErrRes, SuccRes } = require('../../utils/interfaces')
const { konvertujSliku } = require('../../utils/helpers')

const uredi = async(req, res) => {
  const { id } = req.params
  const { lat, lon, od } = req.body
  const slika = await konvertujSliku(req.files)
  const { Spomenik } = res.locals

  const spomenik = await Spomenik.findOne({ _id: id })

  for (const prop in req.body) // dodaje sva prosta polja koja prodju shemu
    if (req.body[prop]) spomenik[prop] = req.body[prop]

  if (slika) spomenik.slika = slika
  if (lat && lon) spomenik.lokacija = { lat, lon }
  if (od && req.body.do) spomenik.radnoVreme = { od, do: req.body.do }

  spomenik.save()
    .then(data => res.json(new SuccRes('Lokacija je uspesno azurirana.', data)))
    .catch(err => res.status(400).send(new ErrRes(err.message)))
}

module.exports = uredi
