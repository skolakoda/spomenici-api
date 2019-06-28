const md5 = require('md5')

const { ErrRes, SuccRes } = require('../../utils/interfaces')
const { sendEmail } = require('../../utils/helpers')
const User = require('../../models/User')

module.exports = (req, res) => {
  const { email, pass, repeatPass } = req.body
  if (pass !== repeatPass)
    return res.status(400).send(new ErrRes('Lozinke nisu identicne'))

  const user = new User({
    email,
    password: md5(pass)
  })

  user
    .save()
    .then(data => {
      sendEmail(res, data.email, 'register')
      res.json(new SuccRes('Uspesno ste registrovani.', { _id: data._id}))
    })
    .catch(err => res.status(400).send(err.message))
}
