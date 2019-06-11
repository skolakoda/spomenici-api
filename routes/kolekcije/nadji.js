const { ObjectID } = require('mongodb')
const { model } = require('mongoose')

const { ErrRes, SuccRes } = require('../../utils/interfaces')
const SpomenikSchema = require('../../models/SpomenikSchema')

const nadji = async(req, res) => {
  const { kolekcija, id } = req.params
  if (!ObjectID.isValid(id))
    return res.status(400).json(new ErrRes('Nije validan id.'))

  const Spomenik = model('Spomenik', SpomenikSchema, kolekcija)
  const spomenik = await Spomenik.findOne({ _id: ObjectID(id) })
  res.send(new SuccRes(null, spomenik))
}

module.exports = nadji
