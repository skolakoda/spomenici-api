const User = require('../../models/User')
const { ErrRes, SuccRes } = require('../../utils/interfaces')

const about = (req, res) => {
  const { id } = req.params

  User.findOne({ _id: id })
    .then(user => res.send(new SuccRes(null, user)))
    .catch(err => res.status(400).send(new ErrRes(err.message)))
}

module.exports = about
