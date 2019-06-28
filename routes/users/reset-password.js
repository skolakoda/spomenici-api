const md5 = require('md5')

const { ErrRes, SuccRes } = require('../../utils/interfaces')
const { sendEmail } = require('../../utils/helpers')
const User = require('../../models/User')

module.exports = async(req, res) => {
  const user = User.findOne({ email: req.body.email })
  if (!user) return res.send(new ErrRes('Email se ne nalazi u bazi.'))

  const newPass = Math.floor(Math.random() * 10000000)
  sendEmail(user.email, 'reset', newPass)
  user.password = md5(newPass)

  user.save()
    .then(data =>
      res.json(new SuccRes(`Proverite email ${data.email} za novu lozinku.`))
    )
    .catch(err =>
      res.status(400).send(`Greska : ${new ErrRes(err.message)}`)
    )
}
