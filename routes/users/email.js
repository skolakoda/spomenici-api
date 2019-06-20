const { ErrRes, SuccRes } = require('../../utils/interfaces')
const nodeMailer = require('nodemailer')

const email = (req, res) => {
  const {email} = req.body
  const trialPass = Math.random(Math.floor() * 100000)
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'spomeniciskolakoda@gmail.com', // email
      pass: 'Skolakoda1!'
    }
  })

  const mailOptions = {
    from: 'spomeniciskolakoda@gmail.com',
    to: email,
    subject: 'Promena sifre!',
    text: `Vasa trenutna sifra je ${trialPass.toString()}. Molimo promenite je na sajtu!`
  }
  
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(400).send(new ErrRes(err.message))
    } else {
      res.status(200).send(new SuccRes(`Email je poslat! ${info.response}`));
    }
})
}

module.exports = email
