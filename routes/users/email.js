const md5 = require('md5')

const { ErrRes, SuccRes } = require('../../utils/interfaces')
const { sendEmail } = require('../../utils/helpers')
const User = require('../../models/User')

const email = (req, res) => {
  const { email } = req.body

  User.findOne({ email }).then(user => {
    if (!user)
      return res.send(new ErrRes('Email se ne nalazi u bazi korisnika'))

    const trialPass = sendEmail(req, res, user.email, 'reset')

    const password = md5(trialPass)
    user.password = password

    user
      .save()
      .then(data =>
        res.json(
          new SuccRes(
            `Trenutna sifra upisana u bazu za korisnika: ${data.email}`
          )
        )
      )
      .catch(err =>
        res.status(400).send(`Greska : ${new ErrRes(err.message)}`)
      )
  })
}

module.exports = email
