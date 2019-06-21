const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')

const { tokenKey, emailPass } = require('./config')
const { SuccRes, ErrRes } = require('./interfaces')

const nevalidnaLokacija = (lat, lon) =>
  lat > 47.2 || lat < 42 || lon > 23 || lon < 19

const emailCheck = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

const tokenCheck = (req, res, next) => {
  const auth = req.headers['auth']
  if (typeof auth !== 'undefined') {
    const token = auth.split(' ')[1]
    if (jwt.verify(token, tokenKey)) {
      next()
    }
  } else {
    return res.status(403).send(new ErrRes('Pogresan token'))
  }
}

const sendEmail = (req, res, email) => {
      const transporter = nodeMailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'spomeniciskolakoda@gmail.com',
        pass: `${emailPass}`
      }
    })
    const trialPass = `${Math.floor(Math.random() * 10000000)}`
    
    const mailOptions = {
      from: 'spomeniciskolakoda@gmail.com',
      to: email,
      subject: 'Promena sifre!',
      text: `Vasa trenutna sifra je ${trialPass} . Molimo da je promenite na sajtu!`
    }
  
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(400).send(new ErrRes(err.message))
      } else {
        res.status(200).send(new SuccRes(`Email je poslat! ${info.response}`))
      }
    })
    return trialPass
}

module.exports = {
  nevalidnaLokacija,
  emailCheck,
  tokenCheck,
  sendEmail
}
