const express = require('express')
const router = express.Router()
const { userCheck, adminCheck } = require('../../utils/middleware')

router.get('/', require('./izlistaj'))
router.get('/strana/:brojStrane/:poStrani?', require('./paginacija'))
router.get('/slika/:id', require('./slika'))
router.get('/nadji/:id', require('./nadji'))
router.get('/kategorije', require('./kategorije'))
router.use(userCheck)
router.post('/dodaj', require('./dodaj'))
router.put('/uredi/:id', require('./uredi'))
router.use(adminCheck)
router.delete('/obrisi/:id', require('./obrisi'))

module.exports = router
