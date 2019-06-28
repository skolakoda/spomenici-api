require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')

const { port, domain, URI } = require('./utils/config')
const colectionRouter = require('./routes/kolekcije/index')
const userRouter = require('./routes/users/index')

// Config
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload())
mongoose.set('useCreateIndex', true) // https://mongoosejs.com/docs/deprecations.html#ensureindex

// Routes (odvojiti u zaseban fajl)
app.use('/korisnici', userRouter)
app.use('/kolekcija', colectionRouter)
app.get('/', (req, res) => res.send('Dobrodosli na Spomenici-API!')) // eslint-disable-line no-unused-vars

// Start
mongoose.connect(URI, { useNewUrlParser: true })
app.listen(port, () => console.log(`Server at ${domain}`))
