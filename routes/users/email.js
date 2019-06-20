const nodeMailer = require('nodemailer')
const md5 = require('md5')

const { ErrRes, SuccRes } = require('../../utils/interfaces')
const { emailPass } = require('../../utils/config')
const User = require('../../models/User')

const email = (req, res) => {
  const {email} = req.body
  const trialPass = `${Math.floor(Math.random() * 10000000)}`
  const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'spomeniciskolakoda@gmail.com', // email
      pass: `${emailPass}`
    }
  })

  const mailOptions = {
    from: 'spomeniciskolakoda@gmail.com',
    to: email,
    subject: 'Promena sifre!',
    text: `Vasa trenutna sifra je ${trialPass} . Molimo da je promenite na sajtu!`
  }

  User.findOne({ email }).then(user =>{
    if (!user) {
      return res.send(new ErrRes('Email se ne nalazi u bazi korisnika'))
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(400).send(new ErrRes(err.message + ' Ne radi'))
      } else {
        res.status(200).send(new SuccRes(`Email je poslat! ${info.response}`));
      }
    })

    const password = md5(trialPass)
    user.password = password

    user.save()
      .then(data => res.json(new SuccRes('Trenutna sifra upisana u bazu za korisnika: ' + data.email)))
      .catch(err => res.status(400).send(`Greska : ${new ErrRes(err.message)}`))
  })

}

module.exports = email