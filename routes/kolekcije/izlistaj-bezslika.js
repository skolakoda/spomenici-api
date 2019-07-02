const { SuccRes } = require('../../utils/interfaces')

module.exports = async function(req, res) {
  const { Spomenik } = res.locals
  const spomenici = await Spomenik.find()
    .select('-slika')
  res.send(new SuccRes(null, spomenici))
}
