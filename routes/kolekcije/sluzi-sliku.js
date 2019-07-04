module.exports = async(req, res) => {
  const { id } = req.params
  const { Spomenik } = res.locals

  const spomenik = await Spomenik.findOne({ _id: id })
  const slika = spomenik.slikaFajl
  res.contentType(slika.contentType).send(slika.data)
}
