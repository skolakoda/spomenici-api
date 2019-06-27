const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')
const sharp = require('sharp')

const { tokenKey, emailPass } = require('./config')
const { SuccRes, ErrRes } = require('./interfaces')

const tokenCheck = (req, res, next) => {
  const auth = req.headers.auth
  if (!auth) return res.status(403).send(new ErrRes('Nema tokena'))

  const token = auth.split(' ')[1]
  if (jwt.verify(token, tokenKey))
    next()
  else
    res.status(403).send(new ErrRes('Nevalidan token'))
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
    if (err) return res.status(400).send(new ErrRes(err.message))
    res.status(200).send(new SuccRes(`Email je poslat! ${info.response}`))
  })
  return trialPass
}

const konvertujSliku = async files => {
  if (!files || !files.slika) return ''
  const data = await sharp(files.slika.data).resize(280).toBuffer()
  return data.toString('base64')
}

module.exports = {
  tokenCheck,
  sendEmail,
  konvertujSliku
}
