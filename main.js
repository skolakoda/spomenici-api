require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const { port, domain } = require("./config/setup")
const pokazi = require("./routes/pokazi")
const spomenik = require("./routes/spomenik")
const dodaj = require("./routes/dodaj")
const izmeni = require("./routes/izmeni")
const obrisi = require("./routes/obrisi")

// Config
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.get("/", (req, res) => res.send("Dobrodosli na Spomenici-API!"))

app.get("/:kolekcija", pokazi)

app.get("/spomenik/:id", spomenik)

app.post("/dodaj-spomenik", dodaj)

app.put("/izmeni-spomenik/:id", izmeni)

app.delete("/obrisi-spomenik/:id", obrisi)

// Server
app.listen(port, () => {
  console.log(`Server at ${domain}!`)
})
