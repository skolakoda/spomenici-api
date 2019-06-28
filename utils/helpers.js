const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')
const sharp = require('sharp')

const { tokenKey, emailPass } = require('./config')
const { SuccRes, ErrRes } = require('./interfaces')

const tokenCheck = (req, res, next) => {
  const { auth } = req.headers
  if (!auth) return res.status(403).send(new ErrRes('Nema tokena'))

  const token = auth.split(' ')[1]
  if (jwt.verify(token, tokenKey)) next()
  else res.status(403).send(new ErrRes('Nevalidan token'))
}

const createMailOptions = (email, type, trialPass) => {
  const mailOptions = {
    from: 'spomeniciskolakoda@gmail.com',
    to: email,
  }
  switch (type) {
    case 'register':
      return {
        ...mailOptions,
        subject: `Pozdrav ${email}!`,
        text: 'Dobrodošli! Prijavom na aplikaciju mozete dodavati/menjati znamenitosti na mapi. Uživajte!'
      }
    case 'reset':
      return {
        ...mailOptions,
        subject: 'Promena šifre!',
        text: `Vaša trenutna šifra je ${trialPass}. Molimo da je promenite u aplikaciji`
      }
    default:
      return null
  }
}

const sendEmail = (res, email, type) => {
  const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'spomeniciskolakoda@gmail.com',
      pass: `${emailPass}`
    }
  })
  const trialPass = type === 'reset' ? Math.floor(Math.random() * 10000000) : null
  const mailOptions = createMailOptions(email, type, trialPass)
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return res.status(400).send(new ErrRes(err.message))
    res.status(200).send(new SuccRes(`Email je poslat! ${info.response}`))
  })
  return trialPass
}

const konvertujSliku = async files => {
  if (!files || !files.slika) return ''
  const data = await sharp(files.slika.data)
    .resize(280)
    .toBuffer()
  return data.toString('base64')
}

module.exports = {
  tokenCheck,
  sendEmail,
  konvertujSliku
}
