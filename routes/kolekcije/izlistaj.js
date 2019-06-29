const { SuccRes } = require('../../utils/interfaces')

async function izlistaj(req, res) {
  const { Spomenik } = res.locals
  const spomenici = await Spomenik.find()
  res.send(new SuccRes(null, spomenici))
}

module.exports = izlistaj
