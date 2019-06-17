const express = require('express')
const router = express.Router()

const { tokenCheck } = require('../../utils/helpers')

router.post('/login', require('./login'))
router.post('/registracija', require('./registracija'))
router.get('/pokazi/:id', tokenCheck, require('./about'))

module.exports = router
