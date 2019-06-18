const { ErrRes, SuccRes } = require('../../utils/interfaces')
const User = require('../../models/User')

const uredi = async(req, res) => {
  const { id } = req.params
  const {email, password, repeatPass, ime, datumRodjenja} = req.body

  const user = await User.findOne({ _id: id })

  if(email) user.email = email
  if(password === repeatPass) user.password = password
  if(ime) user.ime = ime
  if(datumRodjenja) user.datumRodjenja = datumRodjenja

  user.save()
    .then(data => res.json(new SuccRes(`Detalji korisnika ${data.email} su promenjeni!`)))
    .catch(err => res.status(400).send(`Greska : ${new ErrRes(err.message)}`))
}


module.exports = uredi