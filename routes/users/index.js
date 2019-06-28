const express = require('express')
const router = express.Router()

const { tokenCheck } = require('../../utils/helpers')

router.post('/login', require('./login'))
router.post('/registracija', require('./registracija'))
router.get('/email', require('./email'))
router.use(tokenCheck)
router.get('/pokazi/:id', require('./about'))
router.put('/uredi/:id', require('./uredi'))
router.delete('/logout', require('./logout'))

module.exports = router
