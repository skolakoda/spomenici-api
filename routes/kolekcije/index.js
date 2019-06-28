const express = require('express')
const router = express.Router()
const { tokenCheck } = require('../../utils/middleware')

router.get('/:kolekcija', require('./izlistaj'))
router.get('/:kolekcija/kategorije', require('./kategorije'))
router.get('/:kolekcija/nadji/:id', require('./nadji'))
router.use(tokenCheck)
router.post('/:kolekcija/dodaj', require('./dodaj'))
router.put('/:kolekcija/uredi/:id', require('./uredi'))
router.delete('/:kolekcija/obrisi/:id', require('./obrisi'))

module.exports = router
