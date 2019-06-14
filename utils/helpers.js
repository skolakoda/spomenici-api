const jwt = require('jsonwebtoken')

const { tokenKey } = require('./config')
const { ErrRes } = require('./interfaces')

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

module.exports = {
  nevalidnaLokacija,
  emailCheck,
  tokenCheck
}
