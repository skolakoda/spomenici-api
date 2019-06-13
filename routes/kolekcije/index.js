const express = require('express')
const router = express.Router()

const { tokenCheck } = require('../../utils/helpers')
const izlistaj = require('./izlistaj')
const nadji = require('./nadji')
const dodaj = require('./dodaj')
const uredi = require('./uredi')
const obrisi = require('./obrisi')
const kategorije = require('./kategorije')

router.get('/:kolekcija', izlistaj)
router.get('/:kolekcija/kategorije', kategorije)
router.get('/:kolekcija/nadji/:id', nadji)
router.use(tokenCheck)
router.post('/:kolekcija/dodaj', dodaj)
router.post('/:kolekcija/uredi/:id', uredi)
router.delete('/:kolekcija/obrisi/:id', obrisi)

module.exports = router
