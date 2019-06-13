const { model } = require('mongoose')

const { ErrRes, SuccRes } = require('../../utils/interfaces')
const SpomenikSchema = require('../../models/SpomenikSchema')

const nadji = async(req, res) => {
  const { kolekcija, id } = req.params

  const Spomenik = model('Spomenik', SpomenikSchema, kolekcija)
  Spomenik.findOne({ _id: id })
    .then(spomenik => res.send(new SuccRes(null, spomenik)))
    .catch(err => res.status(400).send(new ErrRes(err.message)))
}

module.exports = nadji
