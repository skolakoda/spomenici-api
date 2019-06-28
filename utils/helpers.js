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

const sendEmail = (req, res, email, type) => {
  const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'spomeniciskolakoda@gmail.com',
      pass: `${emailPass}`
    }
  })
  let mailOptions
  let trialPass

  switch (type) {
    case type === 'register':
      mailOptions = {
        from: 'spomeniciskolakoda@gmail.com',
        to: email,
        subject: `Pozdrav ${email}!`,
        text:
          'Dobrodošli! Prijavom na aplikaciju mozete dodavati/menjati znamenitosti na mapi. Uživajte!'
      }
      break
    case type === 'reset':
      trialPass = `${Math.floor(Math.random() * 10000000)}`
      mailOptions = {
        from: 'spomeniciskolakoda@gmail.com',
        to: email,
        subject: 'Promena šifre!',
        text: `Vaša trenutna šifra je ${trialPass}. Molimo da je promenite u aplikaciji`
      }
    default:
      break
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return res.status(400).send(new ErrRes(err.message))
    res.status(200).send(new SuccRes(`Email je poslat! ${info.response}`))
  })
  if (trialPass.length !== 0) return trialPass
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
