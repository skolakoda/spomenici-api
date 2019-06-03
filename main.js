require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const colectionRouter = require("./routes/kolekcije/index")
const { port, domain } = require("./config/setup")
const registracija = require("./routes/users/registracija")

// Config
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  console.log(req.url)
  next()
})

// Routes
app.use("/kolekcija", colectionRouter)
app.get("/", (req, res) => res.send("Dobrodosli na Spomenici-API!"))
app.post("/registracija", registracija)

// Server
app.listen(port, () => {
  console.log(`Server at ${domain}!`)
})
