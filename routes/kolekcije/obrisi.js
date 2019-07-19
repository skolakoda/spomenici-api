const { SuccRes } = require('../../utils/interfaces')

const obrisi = async(req, res) => {
  const { id } = req.params
  const { Spomenik } = res.locals

  const obrisano = await Spomenik.deleteOne({ _id: id })
  res.send(new SuccRes(`Obrisano ${obrisano.deletedCount} lokacija.`))
}

module.exports = obrisi
