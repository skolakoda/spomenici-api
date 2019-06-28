const nodeMailer = require('nodemailer')
const sharp = require('sharp')

const { emailPass } = require('./config')

const createMailOptions = (email, type, info) => {
  const mailOptions = {
    from: 'spomeniciskolakoda@gmail.com',
    to: email,
  }
  switch (type) {
    case 'register':
      return {
        ...mailOptions,
        subject: 'Uspesno ste registrovani',
        text: 'Dobrodošli! Prijavom na aplikaciju mozete dodavati/menjati znamenitosti na mapi. Uživajte!'
      }
    case 'reset':
      return {
        ...mailOptions,
        subject: 'Promena šifre!',
        text: `Vaša trenutna šifra je ${info}. Molimo da je promenite u aplikaciji`
      }
    // TODO: confirm password, mozda u register
    default:
      return null
  }
}

const sendEmail = (email, type, info) => {
  const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'spomeniciskolakoda@gmail.com',
      pass: `${emailPass}`
    }
  })
  const mailOptions = createMailOptions(email, type, info)
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.error(err.message)
    console.log(`Email je poslat! ${info.response}`)
  })
}

const konvertujSliku = async files => {
  if (!files || !files.slika) return ''
  const data = await sharp(files.slika.data)
    .resize(280)
    .toBuffer()
  return data.toString('base64')
}

module.exports = {
  sendEmail,
  konvertujSliku
}
