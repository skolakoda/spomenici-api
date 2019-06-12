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
router.post('/:kolekcija/dodaj', tokenCheck, dodaj)
router.put('/:kolekcija/uredi/:id', tokenCheck, uredi)
router.delete('/:kolekcija/obrisi/:id', tokenCheck, obrisi)

module.exports = router
