const { model } = require('mongoose')

const { ErrRes, SuccRes } = require('../../utils/interfaces')
const UserSchema = require('../../models/UserSchema')

const about = (req, res) => {
  const { id } = req.params

  const User = model('Korisnik', UserSchema, 'korisnici')
  User.findOne({ _id: id })
    .then(user => res.send(new SuccRes(null, user)))
    .catch(err => res.status(400).send(new ErrRes(err.message)))
}

module.exports = about
