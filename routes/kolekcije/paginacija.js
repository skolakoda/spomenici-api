const { SuccRes } = require('../../utils/interfaces')

module.exports = async(req, res) => {
  const { brojStrane, poStrani } = req.params
  const { Spomenik } = res.locals
  const predmetaPoStrani = Number(poStrani) || 20

  const spomenici = await Spomenik.find()
    .skip((brojStrane - 1) * predmetaPoStrani)
    .limit(predmetaPoStrani)
  res.send(new SuccRes(null, spomenici))
}