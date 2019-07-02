const { ErrRes, SuccRes } = require('../../utils/interfaces')

const nadji = async(req, res) => {
  const { id } = req.params
  const { Spomenik } = res.locals
  
  Spomenik.findOne({ _id: id })
    .then(spomenik => res.send(new SuccRes(null, spomenik)))
    .catch(err => res.status(400).send(new ErrRes(err.message)))
}

module.exports = nadji
