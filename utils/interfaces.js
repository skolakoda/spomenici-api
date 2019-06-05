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
  ErrRes,
  SuccRes
}
