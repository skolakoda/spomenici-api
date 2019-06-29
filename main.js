require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')

const { port, domain, URI } = require('./utils/config')
const router = require('./routes/router')

// Config
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload())
app.use('/', router)

mongoose.set('useCreateIndex', true) // https://mongoosejs.com/docs/deprecations.html#ensureindex
mongoose.connect(URI, { useNewUrlParser: true })

// Start
app.listen(port, () => console.log(`Server at ${domain}`))
