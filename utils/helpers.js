const nevalidnaLokacija = (lat, lon) =>
  lat > 47.2 || lat < 42 || lon > 23 || lon < 19

const emailCheck = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

class Response {
  constructor(message, data = null) {
    this.message = message
    this.data = data
  }
}

class ErrRes extends Response {
  constructor(message, data) {
    super(message, data)
    this.status = "error"
  }
}

class SuccRes extends Response {
  constructor(message, data) {
    super(message, data)
    this.status = "success"
  }
}

module.exports = {
  nevalidnaLokacija,
  emailCheck,
  ErrRes,
  SuccRes
}
