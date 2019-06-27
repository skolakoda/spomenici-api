const md5 = require('md5')

const { ErrRes, SuccRes } = require('../../utils/interfaces')
const User = require('../../models/User')

const registracija = (req, res) => {
  const { email, pass, repeatPass } = req.body
  if (pass !== repeatPass || pass.length < 6 || repeatPass.length < 6) 
    return res.status(400).send(new ErrRes('Lozinke nisu identicne ili su krace od 6 karaktera'))
  
  const password = md5(pass)
  
  const user = new User({
    email,
    password
  })

  user
    .save()
    .then(data =>
      res.json(new SuccRes('Uspesno ste registrovani ->', data.password))
    )
    .catch(err => res.status(400).send(err.message))
}

module.exports = registracija
