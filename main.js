require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const { port, domain, URI } = require('./utils/config')
// TODO: odvojiti ruter u zaseban fajl
const colectionRouter = require('./routes/kolekcije/index')
const userRouter = require('./routes/users/index')

// Config
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// TODO: odvojiti logger u helpers i dodati ga samo kad je development
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})
mongoose.set('useCreateIndex', true) // https://mongoosejs.com/docs/deprecations.html#ensureindex

// Routes
app.use('/korisnici', userRouter)
app.use('/kolekcija', colectionRouter)
app.get('/', (req, res) => res.send('Dobrodosli na Spomenici-API!'))

// Start
mongoose.connect(URI, { useNewUrlParser: true })
app.listen(port, () => console.log(`Server at ${domain}!`))
