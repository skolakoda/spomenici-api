module.exports = async(req, res) => {
  const { id } = req.params
  const { Spomenik } = res.locals
  const spomenik = await Spomenik.findOne({ _id: id }).select('slika')
  if (!spomenik) return res.sendStatus(400)
  const {slika} = spomenik
  if (!slika) return res.sendStatus(404)

  const data = Buffer.from(slika, 'base64')
  res.contentType('image/png').send(data)
}
