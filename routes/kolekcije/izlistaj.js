const { SuccRes } = require('../../utils/interfaces')

module.exports = async function(req, res) {
  const { Spomenik } = res.locals
  const spomenici = await Spomenik.find()
  res.send(new SuccRes(null, spomenici))
}
