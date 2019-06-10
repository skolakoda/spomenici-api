const nevalidnaLokacija = (lat, lon) =>
  lat > 47.2 || lat < 42 || lon > 23 || lon < 19

const emailCheck = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

const tokenCheck = (req, res, next) => {
  const bearerHeader = req.headers["auth"]
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ")
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(403)
  }
}

module.exports = {
  nevalidnaLokacija,
  emailCheck,
  tokenCheck
}
