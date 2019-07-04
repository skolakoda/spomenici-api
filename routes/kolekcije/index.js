const express = require('express')
const router = express.Router()
const { tokenCheck, adminCheck } = require('../../utils/middleware')

router.get('/:kolekcija', require('./izlistaj'))
router.get('/:kolekcija/kategorije', require('./kategorije'))
router.get('/:kolekcija/nadji/:id', require('./nadji'))
router.get('/:kolekcija/slika/:id', require('./sluzi-sliku'))
router.use(tokenCheck)
router.post('/:kolekcija/dodaj', require('./dodaj'))
router.put('/:kolekcija/uredi/:id', require('./uredi'))
router.use(adminCheck)
router.delete('/:kolekcija/obrisi/:id', require('./obrisi'))

module.exports = router
