const port = process.env.PORT || 8080
const URI = process.env.DB_URI
const DB_NAME = process.env.DB_NAME

const domain =
  process.env.NODE_ENV === "development"
    ? `http://localhost:${port}`
    : "https://spomenici-api.herokuapp.com/"

module.exports = {
  port,
  URI,
  DB_NAME,
  domain
}
