const md5 = require('md5')

const { ErrRes, SuccRes } = require('../../utils/interfaces')
const { sendEmail } = require('../../utils/helpers')
const User = require('../../models/User')

module.exports = (req, res) => {
  const { email } = req.body

  User.findOne({ email }).then(user => {
    if (!user) return res.send(new ErrRes('Email se ne nalazi u bazi.'))

    const tempPass = Math.floor(Math.random() * 10000000)
    sendEmail(user.email, 'reset', tempPass)
    user.password = md5(tempPass)

    user.save()
      .then(data =>
        res.json(new SuccRes(`Proverite email ${data.email} za novu lozinku.`))
      )
      .catch(err =>
        res.status(400).send(`Greska : ${new ErrRes(err.message)}`)
      )
  })
}
