const md5 = require('md5')

const { ErrRes, SuccRes } = require('../../utils/interfaces')
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
    .then(data =>
      res.json(new SuccRes('Uspesno ste registrovani ->', data.email))
    )
    .catch(err => res.status(400).send(err.message))
}
