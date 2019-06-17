const { ErrRes, SuccRes } = require('../../utils/interfaces')
const nodeMailer = require('nodemailer')

const email = (req, res) => {
  const {email} = req.body
  const trialPass = Math.random(Math.floor() * 100000)
  const transporter = nodeMailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: '', // email
      pass: ''
    }
  })

  const mailOptions = {
    from: '<Nas E-mail>',
    to: email,
    subject: 'Promena sifre!',
    text: `Vasa trenutna sifra je ${trialPass.toString()}. Molimo promenite je na sajtu!`
  }
  
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(400).send(new ErrRes(err.message))
    } else {
      res.status(200).send(new SuccRes(null, info));
    }
})
}

module.exports = email