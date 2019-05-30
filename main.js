require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const { port, domain } = require("./config/setup")
const izlistaj = require("./routes/izlistaj")
const nadji = require("./routes/nadji")
const dodaj = require("./routes/dodaj")
const uredi = require("./routes/uredi")
const obrisi = require("./routes/obrisi")
const registracija = require("./routes/users/registracija")

// Config
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.get("/", (req, res) => res.send("Dobrodosli na Spomenici-API!"))

app.get("/:kolekcija", izlistaj)

app.get("/:kolekcija/:id", nadji)

app.post("/:kolekcija/dodaj", dodaj)

app.post("/registracija", registracija)

app.put("/:kolekcija/uredi/:id", uredi)

app.delete("/:kolekcija/obrisi/:id", obrisi)

// Server
app.listen(port, () => {
  console.log(`Server at ${domain}!`)
})
