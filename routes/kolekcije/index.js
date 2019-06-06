const express = require("express")
const router = express.Router()


const izlistaj = require("./izlistaj")
const nadji = require("./nadji")
const dodaj = require("./dodaj")
const uredi = require("./uredi")
const obrisi = require("./obrisi")
const kategorije = require("./kategorije")


router.get("/:naziv/kategorije", kategorije)

router.get("/:kolekcija", izlistaj)

router.get("/:kolekcija/:id", nadji)

router.post("/:kolekcija/dodaj", dodaj)

router.put("/:kolekcija/uredi/:id", uredi)

router.delete("/:kolekcija/obrisi/:id", obrisi)


module.exports = router;