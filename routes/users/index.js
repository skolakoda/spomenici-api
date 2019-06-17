const express = require('express')
const router = express.Router()

const { tokenCheck } = require('../../utils/helpers')

router.post('/login', require('./login'))
router.post('/registracija', require('./registracija'))
router.use(tokenCheck)
router.get('/email', require('./email'))
router.get('/pokazi/:id', require('./about'))
router.put('/uredi/:id', require('./uredi'))

module.exports = router
