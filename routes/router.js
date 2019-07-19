const express = require('express')
const router = express.Router()
const { addModel } = require('../utils/middleware')

router.use('/kolekcija/:nazivKolekcije', addModel, require('./kolekcije/'))
router.use('/korisnici', require('./users/'))
router.get('/', (req, res) => res.send('Dobrodosli na Spomenici-API!'))

module.exports = router