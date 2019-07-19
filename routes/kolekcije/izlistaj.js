const { SuccRes } = require('../../utils/interfaces')

module.exports = async function(req, res) {
  const { Spomenik } = res.locals
  const spomenici = await Spomenik.find()
  const bezSlika = spomenici.map(s => {
    s.slika = undefined
    return s
  })
  res.send(new SuccRes(null, bezSlika))
}
