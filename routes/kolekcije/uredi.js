const { ErrRes, SuccRes } = require('../../utils/interfaces')
const { konvertujSliku } = require('../../utils/helpers')

const uredi = async(req, res) => {
  const { id } = req.params
  const { lat, lon, od } = req.body
  const { Spomenik } = res.locals

  const slikaFajl = await konvertujSliku(req.files)
  const spomenik = await Spomenik.findOne({ _id: id })

  // dodaje prosta polja
  for (const polje in req.body)
    if (req.body[polje]) spomenik[polje] = req.body[polje]

  // dodaje slozena polja
  if (slikaFajl) spomenik.slikaFajl = slikaFajl
  if (lat && lon) spomenik.lokacija = { lat, lon }
  if (od && req.body.do) spomenik.radnoVreme = { od, do: req.body.do }

  spomenik.save()
    .then(data => res.json(new SuccRes('Lokacija je uspesno azurirana.', data)))
    .catch(err => res.status(400).send(new ErrRes(err.message)))
}

module.exports = uredi
