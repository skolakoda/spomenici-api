module.exports = async(req, res) => {
  const { id } = req.params
  const { Spomenik } = res.locals

  const spomenik = await Spomenik.findOne({ _id: id }).select('slikaFajl')
  const slika = spomenik.slikaFajl
  if (!slika) return res.sendStatus(404)
  res.contentType(slika.contentType).send(slika.data)
}
