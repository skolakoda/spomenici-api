const express = require('express')
const router = express.Router()

const { userCheck } = require('../../utils/middleware')

router.post('/login', require('./login'))
router.post('/registracija', require('./registracija'))
router.get('/reset-password', require('./reset-password'))
router.use(userCheck)
router.get('/pokazi/:id', require('./about'))
router.put('/uredi/:id', require('./uredi'))

module.exports = router
